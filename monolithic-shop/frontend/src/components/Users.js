import React, { useState, useEffect } from 'react';
import { fetchUsers, addUser } from '../api';

const Users = () => {
    const [users, setUsers] = useState([]);
    const [newUser, setNewUser] = useState({ name: '', email: '', password: '' });

    useEffect(() => {
        fetchUsers().then(setUsers);
    }, []);

    const handleAddUser = async () => {
        const user = await addUser(newUser);
        setUsers([...users, user]);
        setNewUser({ name: '', email: '', password: '' });
    };

    return (
        <div>
            <h2>Users</h2>
            <ul>
                {users.map((user) => (
                    <li key={user.id}>{user.name} ({user.email})</li>
                ))}
            </ul>
            <h3>Add User</h3>
            <input
                type="text"
                placeholder="Name"
                value={newUser.name}
                onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
            />
            <input
                type="email"
                placeholder="Email"
                value={newUser.email}
                onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            />
            <input
                type="password"
                placeholder="Password"
                value={newUser.password}
                onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
            />
            <button onClick={handleAddUser}>Add User</button>
        </div>
    );
};

export default Users;
