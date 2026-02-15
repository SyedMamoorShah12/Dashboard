import React, { createContext, useContext, useState, useEffect } from 'react';

const DataContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useData = () => {
    const context = useContext(DataContext);
    if (!context) {
        throw new Error('useData must be used within a DataProvider');
    }
    return context;
};

// Initial mock data
const initialProducts = [
    { id: 'P001', name: 'Premium Watch', category: 'Accessories', price: 250.00, stock: 15, status: 'In Stock', description: 'Luxury timepiece with leather strap' },
    { id: 'P002', name: 'Wireless Mouse', category: 'Electronics', price: 45.00, stock: 50, status: 'In Stock', description: 'Ergonomic wireless mouse' },
    { id: 'P003', name: 'Leather Bag', category: 'Fashion', price: 120.00, stock: 0, status: 'Out of Stock', description: 'Handcrafted leather crossbody bag' },
    { id: 'P004', name: 'Bluetooth Speaker', category: 'Electronics', price: 85.00, stock: 25, status: 'In Stock', description: 'Portable bluetooth speaker' },
    { id: 'P005', name: 'Running Shoes', category: 'Fashion', price: 95.00, stock: 30, status: 'In Stock', description: 'Comfortable running shoes' },
    { id: 'P006', name: 'Coffee Maker', category: 'Home & Living', price: 150.00, stock: 12, status: 'In Stock', description: 'Automatic coffee maker' },
];

const initialCustomers = [
    { id: 'C001', name: 'John Doe', email: 'john@example.com', phone: '+1 234 567 890', status: 'Active', orders: 12, totalSpent: 2450 },
    { id: 'C002', name: 'Jane Smith', email: 'jane@example.com', phone: '+1 234 567 891', status: 'Inactive', orders: 5, totalSpent: 890 },
    { id: 'C003', name: 'Mike Ross', email: 'mike@example.com', phone: '+1 234 567 892', status: 'Active', orders: 8, totalSpent: 1670 },
    { id: 'C004', name: 'Harvey Specter', email: 'harvey@example.com', phone: '+1 234 567 893', status: 'Active', orders: 15, totalSpent: 4200 },
    { id: 'C005', name: 'Rachel Zane', email: 'rachel@example.com', phone: '+1 234 567 894', status: 'Active', orders: 6, totalSpent: 980 },
];

const initialOrders = [
    { id: '#12345', customer: 'John Doe', customerId: 'C001', date: '2023-10-01', total: 250.00, status: 'Delivered', items: [{ product: 'Premium Watch', quantity: 1, price: 250 }] },
    { id: '#12346', customer: 'Jane Smith', customerId: 'C002', date: '2023-10-02', total: 45.00, status: 'Pending', items: [{ product: 'Wireless Mouse', quantity: 1, price: 45 }] },
    { id: '#12347', customer: 'Mike Ross', customerId: 'C003', date: '2023-10-02', total: 120.00, status: 'Processing', items: [{ product: 'Leather Bag', quantity: 1, price: 120 }] },
    { id: '#12348', customer: 'Harvey Specter', customerId: 'C004', date: '2023-10-03', total: 500.00, status: 'Delivered', items: [{ product: 'Bluetooth Speaker', quantity: 2, price: 85 }, { product: 'Coffee Maker', quantity: 2, price: 150 }] },
    { id: '#12349', customer: 'Rachel Zane', customerId: 'C005', date: '2023-10-04', total: 190.00, status: 'Processing', items: [{ product: 'Running Shoes', quantity: 2, price: 95 }] },
];

const initialPayments = [
    { id: '#TRX2341', customer: 'John Doe', orderId: '#12345', amount: 250.00, status: 'Completed', date: '2023-10-01', method: 'Credit Card' },
    { id: '#TRX2342', customer: 'Jane Smith', orderId: '#12346', amount: 45.00, status: 'Pending', date: '2023-10-02', method: 'PayPal' },
    { id: '#TRX2343', customer: 'Mike Ross', orderId: '#12347', amount: 120.00, status: 'Completed', date: '2023-10-02', method: 'Debit Card' },
    { id: '#TRX2344', customer: 'Harvey Specter', orderId: '#12348', amount: 500.00, status: 'Refunded', date: '2023-10-03', method: 'Credit Card' },
    { id: '#TRX2345', customer: 'Rachel Zane', orderId: '#12349', amount: 190.00, status: 'Completed', date: '2023-10-04', method: 'Credit Card' },
];

const initialCategories = [
    { id: '1', name: 'Electronics', slug: 'electronics', count: 2, status: 'Active' },
    { id: '2', name: 'Fashion', slug: 'fashion', count: 2, status: 'Active' },
    { id: '3', name: 'Accessories', slug: 'accessories', count: 1, status: 'Active' },
    { id: '4', name: 'Home & Living', slug: 'home-living', count: 1, status: 'Active' },
];

export const DataProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [orders, setOrders] = useState([]);
    const [payments, setPayments] = useState([]);
    const [categories, setCategories] = useState([]);

    // Load data from localStorage on mount
    useEffect(() => {
        const loadedProducts = JSON.parse(localStorage.getItem('products')) || initialProducts;
        const loadedCustomers = JSON.parse(localStorage.getItem('customers')) || initialCustomers;
        const loadedOrders = JSON.parse(localStorage.getItem('orders')) || initialOrders;
        const loadedPayments = JSON.parse(localStorage.getItem('payments')) || initialPayments;
        const loadedCategories = JSON.parse(localStorage.getItem('categories')) || initialCategories;

        // eslint-disable-next-line react-hooks/set-state-in-effect
        setProducts(loadedProducts);
        setCustomers(loadedCustomers);
        setOrders(loadedOrders);
        setPayments(loadedPayments);
        setCategories(loadedCategories);

        // Initialize localStorage if empty
        if (!localStorage.getItem('products')) {
            localStorage.setItem('products', JSON.stringify(initialProducts));
            localStorage.setItem('customers', JSON.stringify(initialCustomers));
            localStorage.setItem('orders', JSON.stringify(initialOrders));
            localStorage.setItem('payments', JSON.stringify(initialPayments));
            localStorage.setItem('categories', JSON.stringify(initialCategories));
        }
    }, []);

    // Products CRUD
    const addProduct = (product) => {
        const newProduct = {
            ...product,
            id: 'P' + String(products.length + 1).padStart(3, '0'),
            status: product.stock > 0 ? 'In Stock' : 'Out of Stock'
        };
        const updated = [...products, newProduct];
        setProducts(updated);
        localStorage.setItem('products', JSON.stringify(updated));
        return newProduct;
    };

    const updateProduct = (id, updates) => {
        const updated = products.map(p =>
            p.id === id ? { ...p, ...updates, status: updates.stock > 0 ? 'In Stock' : 'Out of Stock' } : p
        );
        setProducts(updated);
        localStorage.setItem('products', JSON.stringify(updated));
    };

    const deleteProduct = (id) => {
        const updated = products.filter(p => p.id !== id);
        setProducts(updated);
        localStorage.setItem('products', JSON.stringify(updated));
    };

    // Customers CRUD
    const addCustomer = (customer) => {
        const newCustomer = {
            ...customer,
            id: 'C' + String(customers.length + 1).padStart(3, '0'),
            orders: 0,
            totalSpent: 0
        };
        const updated = [...customers, newCustomer];
        setCustomers(updated);
        localStorage.setItem('customers', JSON.stringify(updated));
        return newCustomer;
    };

    const updateCustomer = (id, updates) => {
        const updated = customers.map(c => c.id === id ? { ...c, ...updates } : c);
        setCustomers(updated);
        localStorage.setItem('customers', JSON.stringify(updated));
    };

    const deleteCustomer = (id) => {
        const updated = customers.filter(c => c.id !== id);
        setCustomers(updated);
        localStorage.setItem('customers', JSON.stringify(updated));
    };

    // Orders CRUD
    const addOrder = (order) => {
        const newOrder = {
            ...order,
            id: '#' + String(orders.length + 12345 + 1),
            date: new Date().toISOString().split('T')[0]
        };
        const updated = [...orders, newOrder];
        setOrders(updated);
        localStorage.setItem('orders', JSON.stringify(updated));
        return newOrder;
    };

    const updateOrder = (id, updates) => {
        const updated = orders.map(o => o.id === id ? { ...o, ...updates } : o);
        setOrders(updated);
        localStorage.setItem('orders', JSON.stringify(updated));
    };

    const deleteOrder = (id) => {
        const updated = orders.filter(o => o.id !== id);
        setOrders(updated);
        localStorage.setItem('orders', JSON.stringify(updated));
    };

    // Categories CRUD
    const addCategory = (category) => {
        const newCategory = {
            ...category,
            id: String(categories.length + 1),
            count: 0
        };
        const updated = [...categories, newCategory];
        setCategories(updated);
        localStorage.setItem('categories', JSON.stringify(updated));
        return newCategory;
    };

    const updateCategory = (id, updates) => {
        const updated = categories.map(c => c.id === id ? { ...c, ...updates } : c);
        setCategories(updated);
        localStorage.setItem('categories', JSON.stringify(updated));
    };

    const deleteCategory = (id) => {
        const updated = categories.filter(c => c.id !== id);
        setCategories(updated);
        localStorage.setItem('categories', JSON.stringify(updated));
    };

    // Payments (Read-only for now)
    const addPayment = (payment) => {
        const newPayment = {
            ...payment,
            id: '#TRX' + String(payments.length + 2341 + 1),
            date: new Date().toISOString().split('T')[0]
        };
        const updated = [...payments, newPayment];
        setPayments(updated);
        localStorage.setItem('payments', JSON.stringify(updated));
        return newPayment;
    };

    const value = {
        products,
        customers,
        orders,
        payments,
        categories,
        addProduct,
        updateProduct,
        deleteProduct,
        addCustomer,
        updateCustomer,
        deleteCustomer,
        addOrder,
        updateOrder,
        deleteOrder,
        addCategory,
        updateCategory,
        deleteCategory,
        addPayment
    };

    return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export default DataContext;
