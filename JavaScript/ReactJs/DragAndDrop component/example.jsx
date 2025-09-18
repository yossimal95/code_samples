import DragAndDrop from "somewhere";

const App = () => {
  const draggbleElement = useRef(null);
  return (
    <DragAndDrop draggbleElement={draggbleElement}>
      <div ref={draggbleElement} style={{ width: "100px", height: "100px", backgroundColor: "red" }}></div>
    </DragAndDrop>
  );
}
