import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import './Sidebar.css';

const Sidebar = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const menuItems = [
        { name: 'Dashboard', path: '/', icon: '▦' },
        { name: 'Products', path: '/products', icon: '■' },
        { name: 'Add Product', path: '/add-product', icon: '＋' },
        { name: 'Customers', path: '/customers', icon: '◉' },
        { name: 'Orders', path: '/orders', icon: '◐' },
        { name: 'Categories', path: '/categories', icon: '⊞' },
        { name: 'Payments', path: '/payments', icon: '◈' },
        { name: 'Profile', path: '/profile', icon: '⚙' },
        { name: 'Settings', path: '/settings', icon: '◆' },
    ];

    return (
        <div className="sidebar">
            <div className="logo-box">
                <h2>ADMIN</h2>
            </div>
            <nav className="sidebar-nav">
                <ul>
                    {menuItems.map((item) => (
                        <li key={item.name}>
                            <NavLink
                                to={item.path}
                                className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}
                            >
                                <span className="nav-icon">{item.icon}</span>
                                <span className="nav-text">{item.name}</span>
                            </NavLink>
                        </li>
                    ))}
                    <li className="logout-item">
                        <button onClick={handleLogout} className="nav-item logout-btn">
                            <span className="nav-icon">⏻</span>
                            <span className="nav-text">Logout</span>
                        </button>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Sidebar;
