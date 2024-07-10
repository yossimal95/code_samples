
import React, { useEffect, useRef, useState } from "react";

const App = () => {
  return (
    <Father />
  );
}

export default App;

const Father = () => {

  const [childRef, setChildRef] = useState(null);

  const scrollToChild = () => {
    if (childRef != null) {
      const rect = childRef.getBoundingClientRect();
      const scrollTop = document.getElementById('root').scrollTop; // window.scrollTop 
      const top = rect.top + scrollTop;

      document.getElementById('root').scrollTo({
        top: top,
        behavior: 'smooth'
      });
    }
  }


  return <>
    <button onClick={() => { scrollToChild(); }}>Scroll to Child..</button>
    <Child handleRef={(ref) => { setChildRef(ref); }} />
  </>;
}


const Child = ({ handleRef }) => {
  let childRef = useRef(null);

  useEffect(() => {
    if (childRef != null) {
      handleRef(childRef.current);
    }
  }, [childRef]);

  return <div style={{ paddingTop: '2000px' }}>
    <div ref={childRef}>
      Hello from Child..!
    </div>
  </div>
}
