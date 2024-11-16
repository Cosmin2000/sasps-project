import React from 'react';
import Users from './components/Users';
import Products from './components/Products';
import Orders from './components/Orders';

function App() {
    return (
        <div>
            <h1>Online Shop Frontend</h1>
            <Users />
            <Products />
            <Orders />
        </div>
    );
}

export default App;
