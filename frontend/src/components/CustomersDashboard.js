import React,{useState,useEffect} from 'react';import axios from 'axios';
export default function CustomersDashboard(){const [c,setC]=useState([]);useEffect(()=>{axios.get('/api/customers').then(r=>setC(r.data));},[]);return(<div style={{padding:10}}><h2>Customers</h2><p>Total: {c.length}</p><ul>{c.map(x=><li key={x.id}>{x.name} ({x.status})</li>)}</ul></div>);}
