import React,{useState} from 'react';import axios from 'axios';
const models=[{label:'Customers',value:'customers'}];
export default function ImportExport(){
  const [mod]=useState('customers');const [file,setFile]=useState(null);const [msg,setMsg]=useState('');
  const exp=()=>window.open(`/api/export/${mod}`,'_blank');
  const imp=async()=>{if(!file)return;const f=new FormData();f.append('file',file);try{const r=await axios.post(`/api/import/${mod}`,f);setMsg(r.data.message);}catch(e){setMsg('Error');}};
  return(<div style={{padding:10}}>
    <h2>Import/Export</h2>
    <button onClick={exp}>Export {mod}</button><br/><br/>
    <input type="file" onChange={e=>setFile(e.target.files[0])}/>
    <button onClick={imp}>Import</button>
    {msg&&<p>{msg}</p>}
  </div>);
}
