import {useState, useEffect } from 'react'
import './App.css'
import { getPosts } from './api/getData'
import PostCard from './components/PostCard';

function App() {
  const [data,setData]=useState(null);
useEffect(()=>{
  getPosts().then(posts => setData(posts));
},[])
  return (
    <>
     {
      data ? data.map(e => <PostCard title={e.title} body={e.body}/>) : <p>No Data</p>
     }
    </>
  )
}


export default App
