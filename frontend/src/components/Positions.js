import React,{useState,useEffect} from 'react';import axios from 'axios';
export default function Positions(){const [p,setP]=useState([]);useEffect(()=>{axios.get('/api/positions').then(r=>setP(r.data));},[]);return(<div style={{padding:10}}><h2>Positions</h2><ul>{p.map(x=><li key={x.id}>{x.title}</li>)}</ul></div>);}
