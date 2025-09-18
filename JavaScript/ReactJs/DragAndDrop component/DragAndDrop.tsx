import React, { NewLifecycle, ReactNode, RefObject, useCallback, useEffect, useRef, useState } from "react";

interface DragState {
  startX: number; // clientX
  startY: number; // clientY
  top: number;
  left: number;
  width: number;
  height: number;
}

const useDrag = ({ ref, calculateFor = "topLeft" }) => {
  const [dragInfo, setDragInfo] = useState<DragState | null>();
  const [finalPosition, setFinalPosition] = useState({});
  const [isDragging, setIsDragging] = useState(false);

  const updateFinalPosition = useCallback(
    (width, height, x, y) => {
      if (calculateFor === "bottomRight") {
        setFinalPosition({
          x: Math.max(Math.min(window.innerWidth - width, window.innerWidth - (x + width)), 0),
          y: Math.max(Math.min(window.innerHeight - height, window.innerHeight - (y + height)), 0),
        });

        return;
      }

      setFinalPosition({
        x: Math.min(Math.max(0, x), window.innerWidth - width),
        y: Math.min(Math.max(0, y), window.innerHeight - height),
      });
    },
    [calculateFor]
  );

  const handleMouseUp = (evt) => {
    evt.preventDefault();

    setIsDragging(false);
  };

  const handleMouseDown = (evt) => {
    evt.preventDefault();

    const { clientX, clientY } = evt;
    const { current: draggableElement } = ref;

    if (!draggableElement) {
      return;
    }

    const { top, left, width, height } = draggableElement.getBoundingClientRect();

    setIsDragging(true);
    setDragInfo({
      startX: clientX,
      startY: clientY,
      top,
      left,
      width,
      height,
    });
  };

  const handleMouseMove = useCallback(
    (evt) => {
      const { current: draggableElement } = ref;

      if (!isDragging || !draggableElement) return;

      evt.preventDefault();

      const { clientX, clientY } = evt;

      const position = {
        x: dragInfo!.startX - clientX,
        y: dragInfo!.startY - clientY,
      };

      if (dragInfo) {
        const { top, left, width, height } = dragInfo;
        updateFinalPosition(width, height, left - position.x, top - position.y);
      }
    },
    [isDragging, dragInfo, ref, updateFinalPosition]
  );

  const recalculate = (width, height) => {
    const { current: draggableElement } = ref;
    const { top, left, width: boundingWidth, height: boundingHeight } = draggableElement.getBoundingClientRect();

    updateFinalPosition(width ?? boundingWidth, height ?? boundingHeight, left, top);
  };

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [handleMouseMove]);

  return {
    position: finalPosition,
    handleMouseDown,
    recalculate,
  };
};

interface DragAndDropProps {
  children: ReactNode;
  draggbleElement?: RefObject<HTMLElement>;
  containerStyle?: React.CSSProperties;
}

const DragAndDrop: React.FC<DragAndDropProps> = ({ children, draggbleElement, containerStyle }) => {
  const draggableRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (draggbleElement && draggbleElement.current) {
      draggbleElement.current.onmousedown = (e) => {
        handleMouseDown(e);
      };
    }
  }, [draggbleElement]);

  const { position, handleMouseDown } = useDrag({
    ref: draggableRef,
  });

  let style: React.CSSProperties = { position: "fixed", top: position["y"], left: position["x"], ...containerStyle };

  if (position["x"] == undefined) {
    style.transform = "translate(-50%, -50%)";
    style.top = "50%";
    style.left = "50%";
  } else {
    style.transform = "none";
  }

  return (
    <div ref={draggableRef} style={style}>
      {children}
    </div>
  );
};

export default DragAndDrop;
