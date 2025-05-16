
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import SettingsPage from './components/SettingsPage';
import UserManagementPage from './components/UserManagementPage';

const App = () => {
    return (
        <Router>
            <div>
                <nav>
                    <ul>
                        <li><Link to="/settings">Settings</Link></li>
                        <li><Link to="/users">User Management</Link></li>
                    </ul>
                </nav>
                <Routes>
                    <Route path="/settings" element={<SettingsPage />} />
                    <Route path="/users" element={<UserManagementPage />} />
                    <Route path="/" element={<h1>Welcome to PojokanPay Admin Dashboard</h1>} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
