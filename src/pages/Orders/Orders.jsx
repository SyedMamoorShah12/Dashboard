import React, { useState } from 'react';
import Header from '../../components/Header/Header';
import { useData } from '../../contexts/DataContext';
import './Orders.css';

const Orders = ({ toggleSidebar }) => {
    const { orders, updateOrder } = useData();
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [showDetails, setShowDetails] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    // Filter orders based on search
    const filteredOrders = orders.filter(order => {
        if (!searchQuery) return true;
        const query = searchQuery.toLowerCase();
        return (
            order.id.toString().includes(query) ||
            order.customer.toLowerCase().includes(query) ||
            order.status.toLowerCase().includes(query)
        );
    });

    const handleStatusChange = (orderId, newStatus) => {
        updateOrder(orderId, { status: newStatus });
    };

    return (
        <div className="page-wrapper">
            <Header title="Orders" toggleSidebar={toggleSidebar} onSearch={setSearchQuery} />
            <div className="page-container">
                <div className="orders-section">
                    <div className="card">
                        <h3>Recent Orders ({filteredOrders.length})</h3>
                        <table className="data-table">
                            <thead>
                                <tr>
                                    <th>Order ID</th>
                                    <th>Customer</th>
                                    <th>Date</th>
                                    <th>Total</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredOrders.map((order) => (
                                    <tr key={order.id}>
                                        <td>{order.id}</td>
                                        <td>{order.customer}</td>
                                        <td>{order.date}</td>
                                        <td>{order.total.toFixed(2)}</td>
                                        <td>
                                            <select
                                                className={`status-select ${order.status.toLowerCase()}`}
                                                value={order.status}
                                                onChange={(e) => handleStatusChange(order.id, e.target.value)}
                                            >
                                                <option value="Pending">Pending</option>
                                                <option value="Processing">Processing</option>
                                                <option value="Delivered">Delivered</option>
                                            </select>
                                        </td>
                                        <td>
                                            <button className="view-btn" onClick={() => setSelectedOrder(order)}>
                                                View Details
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {selectedOrder && (
                        <div className="card">
                            <div className="order-header">
                                <h3>Order Details - {selectedOrder.id}</h3>
                                <button className="close-btn" onClick={() => setSelectedOrder(null)}>✕</button>
                            </div>

                            <div className="details-grid">
                                <div className="detail-item">
                                    <span className="label">Customer Name</span>
                                    <span className="value">{selectedOrder.customer}</span>
                                </div>
                                <div className="detail-item">
                                    <span className="label">Order ID</span>
                                    <span className="value">{selectedOrder.id}</span>
                                </div>
                                <div className="detail-item">
                                    <span className="label">Order Date</span>
                                    <span className="value">{selectedOrder.date}</span>
                                </div>
                                <div className="detail-item">
                                    <span className="label">Status</span>
                                    <span className="value">{selectedOrder.status}</span>
                                </div>
                            </div>

                            <h4 style={{ marginTop: '24px', marginBottom: '16px' }}>Order Items</h4>
                            <table className="details-table">
                                <thead>
                                    <tr>
                                        <th>Product</th>
                                        <th>Quantity</th>
                                        <th>Price</th>
                                        <th>Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {selectedOrder.items.map((item, index) => (
                                        <tr key={index}>
                                            <td>{item.product}</td>
                                            <td>{item.quantity}</td>
                                            <td>{item.price.toFixed(2)}</td>
                                            <td>{(item.quantity * item.price).toFixed(2)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            <div className="order-summary">
                                <div className="summary-row">
                                    <span>Subtotal:</span>
                                    <span>${selectedOrder.total.toFixed(2)}</span>
                                </div>
                                <div className="summary-row total">
                                    <span>Total:</span>
                                    <span>${selectedOrder.total.toFixed(2)}</span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Orders;
