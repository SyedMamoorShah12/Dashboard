import React from 'react';
import Header from '../../components/Header/Header';
import { useData } from '../../contexts/DataContext';
import { useCurrency } from '../../contexts/CurrencyContext';
import './Payments.css';

const Payments = ({ toggleSidebar }) => {
    const { payments } = useData();
    const { formatCurrency } = useCurrency();

    return (
        <div className="page-wrapper">
            <Header title="Payments" toggleSidebar={toggleSidebar} />
            <div className="page-container">
                <div className="card">
                    <h3>Payment History ({payments.length})</h3>
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>Transaction ID</th>
                                <th>Customer</th>
                                <th>Order ID</th>
                                <th>Amount</th>
                                <th>Method</th>
                                <th>Status</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {payments.map((payment) => (
                                <tr key={payment.id}>
                                    <td>{payment.id}</td>
                                    <td>{payment.customer}</td>
                                    <td>{payment.orderId}</td>
                                    <td>{formatCurrency(payment.amount)}</td>
                                    <td>{payment.method}</td>
                                    <td>
                                        <span className={`status ${payment.status.toLowerCase()}`}>
                                            {payment.status}
                                        </span>
                                    </td>
                                    <td>{payment.date}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Payments;
