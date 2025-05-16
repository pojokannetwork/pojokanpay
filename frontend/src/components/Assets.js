import React,{useState,useEffect} from 'react';import axios from 'axios';
export default function Assets(){const [a,setA]=useState([]);
 useEffect(()=>{axios.get('/api/assets').then(r=>setA(r.data));},[]);
 return(<div style={{padding:10}}><h2>Assets</h2><ul>{a.map(x=><li key={x.id}>{x.name} ({x.status})</li>)}</ul></div>);
}
