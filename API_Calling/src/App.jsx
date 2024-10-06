import {useState, useEffect } from 'react'
import './App.css'
import { getPosts } from './api/getData'

function App() {
  const [data,setData]=useState(null);
useEffect(()=>{
  getPosts().then(posts => setData(posts));
},[])
  return (
    <>
     {
      data ? data.map(e => <li>{e.body}</li>) : <p>No Data</p>
     }
    </>
  )
}


export default App
