
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserManagementPage = () => {
    const [users, setUsers] = useState([]);
    const [newUser, setNewUser] = useState({ username: '', password: '', role: 'admin' });

    const fetchUsers = async () => {
        try {
            const token = localStorage.getItem('token');
            const res = await axios.get('/api/users', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setUsers(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const addUser = async () => {
        try {
            const token = localStorage.getItem('token');
            await axios.post('/api/users', newUser, {
                headers: { Authorization: `Bearer ${token}` }
            });
            fetchUsers();
            setNewUser({ username: '', password: '', role: 'admin' });
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <div>
            <h2>User Management</h2>
            <ul>
                {users.map((u) => (
                    <li key={u.id}>{u.username} - {u.role}</li>
                ))}
            </ul>
            <input placeholder="Username" value={newUser.username} onChange={e => setNewUser({...newUser, username: e.target.value})} />
            <input placeholder="Password" type="password" value={newUser.password} onChange={e => setNewUser({...newUser, password: e.target.value})} />
            <select value={newUser.role} onChange={e => setNewUser({...newUser, role: e.target.value})}>
                <option value="admin">admin</option>
                <option value="superadmin">superadmin</option>
                <option value="reseller">reseller</option>
            </select>
            <button onClick={addUser}>Add User</button>
        </div>
    );
};

export default UserManagementPage;
