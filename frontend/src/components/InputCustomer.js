import React,{useState} from 'react';import axios from 'axios';
export default function InputCustomer(){
  const [f,setF]=useState({username:'',password:'',name:'',address:'',phone:'',package_id:'',status:'active'});const [m,setM]=useState('');
  const ch=e=>setF({...f,[e.target.name]:e.target.value});
  const sb=async e=>{e.preventDefault();try{const r=await axios.post('/api/customers',f);setM('Added '+r.data.name);}catch(e){setM('Error');}};
  return(<form onSubmit={sb} style={{padding:10}}>
    <h2>Input Customer</h2>{Object.keys(f).map(k=><div key={k}><label>{k}</label><input name={k} value={f[k]} onChange={ch} required/></div>)}
    <button type="submit">Submit</button>{m&&<p>{m}</p>}
  </form>);
}
