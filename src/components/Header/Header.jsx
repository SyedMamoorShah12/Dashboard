import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css';

const Header = ({ title, toggleSidebar, onSearch }) => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [showNotifications, setShowNotifications] = useState(false);

    // Mock notifications - you can replace with real data from context
    const [notifications, setNotifications] = useState([
        { id: 1, message: 'New order #1234 received', time: '5 min ago', read: false },
        { id: 2, message: 'Payment confirmed for order #1233', time: '1 hour ago', read: false },
        { id: 3, message: 'Customer John Doe registered', time: '2 hours ago', read: true },
    ]);

    const unreadCount = notifications.filter(n => !n.read).length;

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchQuery(value);
        if (onSearch) {
            onSearch(value);
        }
    };

    const handleProfileClick = () => {
        navigate('/profile');
    };

    const handleSettingsClick = () => {
        navigate('/settings');
    };

    const toggleNotifications = () => {
        setShowNotifications(!showNotifications);
    };

    const markAsRead = (id) => {
        setNotifications(prev =>
            prev.map(n => n.id === id ? { ...n, read: true } : n)
        );
    };

    const clearAllNotifications = () => {
        setNotifications([]);
        setShowNotifications(false);
    };

    return (
        <header className="header">
            <div className="header-left">
                <button className="menu-toggle" onClick={toggleSidebar}>☰</button>
                <h2>{title}</h2>
            </div>
            <div className="header-right">
                <div className="search-bar">
                    <input
                        type="text"
                        placeholder="search"
                        value={searchQuery}
                        onChange={handleSearchChange}
                    />
                    <span className="search-icon">🔍</span>
                </div>
                <div className="header-icons">
                    <div className="icon-item" onClick={handleSettingsClick}>
                        <span className="icon">⚙️</span>
                    </div>
                    <div className="icon-badge" onClick={toggleNotifications}>
                        <span className="icon">🔔</span>
                        {unreadCount > 0 && <span className="badge">{unreadCount}</span>}

                        {/* Notifications Dropdown */}
                        {showNotifications && (
                            <div className="notifications-dropdown">
                                <div className="notifications-header">
                                    <h4>Notifications</h4>
                                    {notifications.length > 0 && (
                                        <button onClick={clearAllNotifications} className="clear-all">Clear All</button>
                                    )}
                                </div>
                                <div className="notifications-list">
                                    {notifications.length === 0 ? (
                                        <div className="no-notifications">
                                            <span className="no-notif-icon">🔕</span>
                                            <p>No new notifications</p>
                                        </div>
                                    ) : (
                                        notifications.map(notif => (
                                            <div
                                                key={notif.id}
                                                className={`notification-item ${notif.read ? 'read' : 'unread'}`}
                                                onClick={() => markAsRead(notif.id)}
                                            >
                                                <p className="notif-message">{notif.message}</p>
                                                <span className="notif-time">{notif.time}</span>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="user-profile" onClick={handleProfileClick}>
                        <img src="/src/assets/avatar.png" alt="User" />
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
