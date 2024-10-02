import React, { useEffect,useState } from "react";
import MyComponent from "./MyComponent";

const UseEffect = () => {

    const [isVisible,setIsVisible]=useState(false);
  useEffect(() => {
    console.log("UseState is Mounting");
  }, []);
  return (
    <div>
      <div>UseEffect</div>
      <div>
        { isVisible ? <MyComponent/> : <></>}
        <button onClick={()=>setIsVisible(!isVisible)}>Toggle</button>
      </div>
    </div>
  );
};

export default UseEffect;
