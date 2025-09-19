import { useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import DragAndDrop from './DragAndDrop'

function App() {
  const dragHandleElementRef = useRef(null);

  return (
    <DragAndDrop dragHandleElement={dragHandleElementRef}>
      <div style={{ width: "300px", height: "300px", backgroundColor: "red" }}>
        <button ref={dragHandleElementRef} style={{margin: '10px', cursor: 'move', userSelect: 'none'}}>
          DRAG ME
        </button>
      </div>
    </DragAndDrop >
  );
}

export default App
