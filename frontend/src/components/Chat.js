import React, { useState } from 'react';
import axios from 'axios';
export default function Chat(){
  const [input,setInput]=useState('');
  const [msgs,setMsgs]=useState([{role:'system',content:'Connected to PojokanPay Chat'}]);
  const send=async()=>{
    if(!input)return;
    const user={role:'user',content:input};
    const arr=[...msgs,user];
    setMsgs(arr); setInput('');
    try{
      const {data}=await axios.post('/api/chat',{messages:arr});
      const ai=data.choices[0].message;
      setMsgs([...arr,ai]);
    }catch(e){console.error(e);}
  };
  return(<div style={{padding:10}}>
    <div style={{border:'1px solid #ccc',padding:10,minHeight:200}}>{msgs.map((m,i)=><p key={i}><b>{m.role}:</b> {m.content}</p>)}</div>
    <input style={{width:'80%'}} value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==='Enter'&&send()} placeholder="Type..."/>
    <button onClick={send}>Send</button>
  </div>);
}
