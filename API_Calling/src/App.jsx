import {useState, useEffect } from 'react'
import './App.css'
import { getPosts,getRandomUser } from './api/getData'
import PostCard from './components/PostCard';
import UserCard from './components/UserCard';


function App() {
  const [data,setData]=useState(null);
  const [userData,setUserdata]=useState(null);


useEffect(()=>{
  getPosts().then(posts => setData(posts));
},[])

useEffect(()=>{
  getRandomUser().then(user => setUserdata(user));
},[])

const refresh = () =>{
  getRandomUser().then(user => setUserdata(user));
}

  return (
   <div>
    {userData && <UserCard data={userData}/>}
    <button onClick={refresh}>Refresh User</button>
     {
      data ? data.map(e => <PostCard title={e.title} body={e.body}/>) : <p>No Data</p>
     }
   </div>
  )
}


export default App
