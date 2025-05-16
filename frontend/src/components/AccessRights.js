import React,{useState,useEffect} from 'react';import axios from 'axios';
export default function AccessRights(){const [r,setR]=useState([]);const [n,setN]=useState('');
 useEffect(()=>{axios.get('/api/roles').then(r=>setR(r.data));},[]);
 const add=async()=>{await axios.post('/api/roles',{name:n});setR([...r,{name:n}]);setN('');};
 return(<div style={{padding:10}}><h2>Roles</h2><input value={n} onChange={e=>setN(e.target.value)}/> <button onClick={add}>Add</button>
 <ul>{r.map((x,i)=><li key={i}>{x.name}</li>)}</ul></div>);
}
