import React,{useState,useEffect} from 'react';import axios from 'axios';
export default function EmployeesDashboard(){const [e,setE]=useState([]);useEffect(()=>{axios.get('/api/employees').then(r=>setE(r.data));},[]);return(<div style={{padding:10}}><h2>Employees</h2><p>Total: {e.length}</p><ul>{e.map(x=><li key={x.id}>{x.name}</li>)}</ul></div>);}
