import React, { useState } from 'react';
import Header from '../../components/Header/Header';
import { useAuth } from '../../contexts/AuthContext';
import profileAvatar from '../../assets/avatar.png';
import './Profile.css';

const Profile = ({ toggleSidebar }) => {
    const { user, updateProfile } = useAuth();
    const [formData, setFormData] = useState({
        name: user?.name || 'John Doe',
        email: user?.email || 'admin@dashboard.com',
        phone: '+1 234 567 890',
        bio: 'Dashboard Administrator with 5+ years of experience in e-commerce management.'
    });
    const [isEditing, setIsEditing] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        updateProfile({ name: formData.name });
        setIsEditing(false);
        alert('Profile updated successfully!');
    };

    return (
        <div className="page-wrapper">
            <Header title="Profile" toggleSidebar={toggleSidebar} />
            <div className="page-container">
                <div className="profile-layout">
                    <div className="profile-sidebar-card card">
                        <div className="profile-image-container">
                            <img src={profileAvatar} alt="Profile" />
                            <button className="change-photo-btn">Change Photo</button>
                        </div>
                        <h3>{formData.name}</h3>
                        <p className="role">Administrator</p>
                        <div className="profile-stats">
                            <div className="stat-item">
                                <span className="stat-number">48</span>
                                <span className="stat-label">Orders</span>
                            </div>
                            <div className="stat-item">
                                <span className="stat-number">12</span>
                                <span className="stat-label">Projects</span>
                            </div>
                        </div>
                    </div>

                    <div className="profile-details-card card">
                        <div className="card-header">
                            <h3>Account Settings</h3>
                            {!isEditing && (
                                <button className="edit-btn" onClick={() => setIsEditing(true)}>
                                    Edit Profile
                                </button>
                            )}
                        </div>
                        <form className="profile-form" onSubmit={handleSubmit}>
                            <div className="form-grid">
                                <div className="form-group">
                                    <label>Full Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        disabled={!isEditing}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Email Address</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        disabled={!isEditing}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Phone Number</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        disabled={!isEditing}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Role</label>
                                    <input
                                        type="text"
                                        value="Administrator"
                                        disabled
                                    />
                                </div>
                            </div>
                            <div className="form-group full-width">
                                <label>Bio</label>
                                <textarea
                                    name="bio"
                                    rows="4"
                                    value={formData.bio}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                />
                            </div>
                            {isEditing && (
                                <div className="form-actions">
                                    <button
                                        type="button"
                                        className="cancel-btn"
                                        onClick={() => setIsEditing(false)}
                                    >
                                        Cancel
                                    </button>
                                    <button type="submit" className="save-btn">
                                        Save Changes
                                    </button>
                                </div>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
