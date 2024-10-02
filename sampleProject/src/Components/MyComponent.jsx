import React,{useEffect,useState} from "react";

const MyComponent = () =>{
    const[count,setCount]=useState(0);
    useEffect(() => {
            console.log("MyComponent Is Mount");

            return function(){
                console.log("Unmounting.....");
            }
    },[]);

    useEffect(() =>{
        console.log("Count Got Updated");

        return function()
        {
            console.log("Returning Count",count);
        }
    },[count])
    
    return(
        <div>
           <p>Count id {count}</p>
           <button onClick={()=> setCount(count + 1)}>Update</button>
        </div>
    )
}

export default MyComponent