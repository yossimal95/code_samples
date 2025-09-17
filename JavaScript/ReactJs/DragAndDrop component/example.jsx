import DragAndDrop from "somewhere";

const App = () => {
  
  const draggableRef = useRef(null);
  
  return <DragAndDrop draggbleElement={draggableRef}>
          <div ref={draggableRef}>
            {/* child elements.. */}
          </div>
    </DragAndDrop>
}
