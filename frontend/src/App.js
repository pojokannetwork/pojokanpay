import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Chat from './components/Chat';
import ImportExport from './components/ImportExport';
import InputCustomer from './components/InputCustomer';
import CustomersDashboard from './components/CustomersDashboard';
import EmployeesDashboard from './components/EmployeesDashboard';
import Positions from './components/Positions';
import AccessRights from './components/AccessRights';
import Assets from './components/Assets';
import Footer from './components/Footer';
function App(){
  return(
    <Router>
      <nav style={{padding:10,background:'#eef'}}>
        <Link to="/">Chat</Link> | <Link to="/customers">Customers</Link> | <Link to="/input-customer">Input</Link> | <Link to="/employees">Employees</Link> | <Link to="/positions">Positions</Link> | <Link to="/access-rights">Access Rights</Link> | <Link to="/assets">Assets</Link> | <Link to="/import-export">Import/Export</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Chat/>}/>
        <Route path="/customers" element={<CustomersDashboard/>}/>
        <Route path="/input-customer" element={<InputCustomer/>}/>
        <Route path="/employees" element={<EmployeesDashboard/>}/>
        <Route path="/positions" element={<Positions/>}/>
        <Route path="/access-rights" element={<AccessRights/>}/>
        <Route path="/assets" element={<Assets/>}/>
        <Route path="/import-export" element={<ImportExport/>}/>
      </Routes>
      <Footer/>
    </Router>
  );
}
export default App;
