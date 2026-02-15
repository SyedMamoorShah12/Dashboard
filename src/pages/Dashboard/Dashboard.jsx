import React from 'react';
import Header from '../../components/Header/Header';
import { useData } from '../../contexts/DataContext';
import './Dashboard.css';

const Dashboard = ({ toggleSidebar }) => {
    const { products, customers, orders } = useData();

    // Calculate statistics
    const totalOrders = orders.length;
    const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
    const totalCustomers = customers.length;
    const totalProducts = products.length;

    // Calculate pie chart percentages
    const deliveredOrders = orders.filter(o => o.status === 'Delivered').length;
    const totalOrdersPercent = totalOrders > 0 ? Math.round((deliveredOrders / totalOrders) * 100) : 0;
    const customerGrowthPercent = 20; // Mock data
    const revenuePercent = 40; // Mock data

    // Monthly revenue data for area chart
    const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

    return (
        <div className="page-wrapper">
            <Header title="Dashboard" toggleSidebar={toggleSidebar} />
            <div className="page-container">
                {/* Stats Grid */}
                <div className="stats-grid">
                    <div className="stat-card">
                        <span className="stat-title">Total revenue</span>
                        <span className="stat-value">${totalRevenue.toFixed(0)}</span>
                    </div>
                    <div className="stat-card">
                        <span className="stat-title">Order</span>
                        <span className="stat-value">{totalOrders}</span>
                    </div>
                    <div className="stat-card">
                        <span className="stat-title">Products</span>
                        <span className="stat-value">{totalProducts}</span>
                    </div>
                    <div className="stat-card">
                        <span className="stat-title">Customer</span>
                        <span className="stat-value">{totalCustomers}</span>
                    </div>
                </div>

                {/* Charts Row */}
                <div className="charts-row">
                    {/* Pie Charts Card */}
                    <div className="chart-card pie-chart-card">
                        <h3>Pie Chart</h3>
                        <div className="pie-charts-container">
                            <div className="pie-chart-item">
                                <svg viewBox="0 0 100 100" className="pie-chart">
                                    <circle cx="50" cy="50" r="40" fill="none" stroke="#f0f0f0" strokeWidth="20" />
                                    <circle
                                        cx="50"
                                        cy="50"
                                        r="40"
                                        fill="none"
                                        stroke="#ff6b6b"
                                        strokeWidth="20"
                                        strokeDasharray={`${totalOrdersPercent * 2.512} 251.2`}
                                        transform="rotate(-90 50 50)"
                                    />
                                    <text x="50" y="55" textAnchor="middle" className="pie-chart-text">{totalOrdersPercent}%</text>
                                </svg>
                                <p className="pie-chart-label">Total order</p>
                            </div>
                            <div className="pie-chart-item">
                                <svg viewBox="0 0 100 100" className="pie-chart">
                                    <circle cx="50" cy="50" r="40" fill="none" stroke="#f0f0f0" strokeWidth="20" />
                                    <circle
                                        cx="50"
                                        cy="50"
                                        r="40"
                                        fill="none"
                                        stroke="#4ecdc4"
                                        strokeWidth="20"
                                        strokeDasharray={`${customerGrowthPercent * 2.512} 251.2`}
                                        transform="rotate(-90 50 50)"
                                    />
                                    <text x="50" y="55" textAnchor="middle" className="pie-chart-text">{customerGrowthPercent}%</text>
                                </svg>
                                <p className="pie-chart-label">Customer Growth</p>
                            </div>
                            <div className="pie-chart-item">
                                <svg viewBox="0 0 100 100" className="pie-chart">
                                    <circle cx="50" cy="50" r="40" fill="none" stroke="#f0f0f0" strokeWidth="20" />
                                    <circle
                                        cx="50"
                                        cy="50"
                                        r="40"
                                        fill="none"
                                        stroke="#5dade2"
                                        strokeWidth="20"
                                        strokeDasharray={`${revenuePercent * 2.512} 251.2`}
                                        transform="rotate(-90 50 50)"
                                    />
                                    <text x="50" y="55" textAnchor="middle" className="pie-chart-text">{revenuePercent}%</text>
                                </svg>
                                <p className="pie-chart-label">Total Revenue</p>
                            </div>
                        </div>
                    </div>

                    {/* Area Chart Card */}
                    <div className="chart-card area-chart-card">
                        <h3>Total Revenue</h3>
                        <div className="area-chart-container">
                            <svg viewBox="0 0 500 200" preserveAspectRatio="none" className="area-chart">
                                <defs>
                                    <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                        <stop offset="0%" style={{ stopColor: '#5dade2', stopOpacity: 0.6 }} />
                                        <stop offset="100%" style={{ stopColor: '#5dade2', stopOpacity: 0.05 }} />
                                    </linearGradient>
                                </defs>
                                {/* Grid lines */}
                                <line x1="0" y1="33" x2="500" y2="33" stroke="#e0e0e0" strokeWidth="0.5" opacity="0.3" />
                                <line x1="0" y1="66" x2="500" y2="66" stroke="#e0e0e0" strokeWidth="0.5" opacity="0.3" />
                                <line x1="0" y1="100" x2="500" y2="100" stroke="#e0e0e0" strokeWidth="0.5" opacity="0.3" />
                                <line x1="0" y1="133" x2="500" y2="133" stroke="#e0e0e0" strokeWidth="0.5" opacity="0.3" />
                                <line x1="0" y1="166" x2="500" y2="166" stroke="#e0e0e0" strokeWidth="0.5" opacity="0.3" />
                                {/* Area chart path */}
                                <path
                                    d="M0,180 L0,165 C30,160 50,155 80,145 C110,135 130,125 160,110 C190,95 220,85 250,75 C280,68 310,62 340,55 C370,50 400,45 430,40 C460,36 480,33 500,30 L500,180 Z"
                                    fill="url(#areaGradient)"
                                    stroke="#5dade2"
                                    strokeWidth="3"
                                />
                            </svg>
                            <div className="chart-x-axis">
                                {months.map((month, index) => (
                                    <span key={index} className="x-label">{month}</span>
                                ))}
                            </div>
                            <div className="chart-y-axis">
                                <span>60k</span>
                                <span>50k</span>
                                <span>40k</span>
                                <span>30k</span>
                                <span>20k</span>
                                <span>10k</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
