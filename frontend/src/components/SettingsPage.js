
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SettingsPage = () => {
    const [settings, setSettings] = useState([]);
    const [newSetting, setNewSetting] = useState({ key: '', value: '' });

    const fetchSettings = async () => {
        try {
            const token = localStorage.getItem('token');
            const res = await axios.get('/api/settings', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setSettings(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const updateSetting = async () => {
        try {
            const token = localStorage.getItem('token');
            await axios.post('/api/settings', newSetting, {
                headers: { Authorization: `Bearer ${token}` }
            });
            fetchSettings();
            setNewSetting({ key: '', value: '' });
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchSettings();
    }, []);

    return (
        <div>
            <h2>Settings Management</h2>
            <ul>
                {settings.map((s) => (
                    <li key={s.id}>{s.key}: {s.value}</li>
                ))}
            </ul>
            <input placeholder="Key" value={newSetting.key} onChange={e => setNewSetting({...newSetting, key: e.target.value})} />
            <input placeholder="Value" value={newSetting.value} onChange={e => setNewSetting({...newSetting, value: e.target.value})} />
            <button onClick={updateSetting}>Add/Update Setting</button>
        </div>
    );
};

export default SettingsPage;
