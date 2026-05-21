import React, { useState } from 'react';
import Header from '../../components/Header/Header';
import { useData } from '../../contexts/DataContext';
import { useCurrency } from '../../contexts/CurrencyContext';
import './Products.css';

const Products = ({ toggleSidebar }) => {
    const { products, deleteProduct, updateProduct } = useData();
    const { formatCurrency } = useCurrency();
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [productToDelete, setProductToDelete] = useState(null);
    const [editingProduct, setEditingProduct] = useState(null);
    const [editFormData, setEditFormData] = useState({});
    const [editPreviews, setEditPreviews] = useState({
        image: null,
        hoverImg: null,
        image2: null,
        image3: null,
        image4: null
    });
    const [searchQuery, setSearchQuery] = useState('');

    // Filter products based on search query
    const filteredProducts = products.filter(product => {
        if (!searchQuery) return true;
        const query = searchQuery.toLowerCase();
        return (
            product.name.toLowerCase().includes(query) ||
            product.category.toLowerCase().includes(query) ||
            product.id.toString().includes(query)
        );
    });

    const handleDelete = (product) => {
        setProductToDelete(product);
        setShowDeleteModal(true);
    };

    const confirmDelete = () => {
        if (productToDelete) {
            deleteProduct(productToDelete.id);
            setShowDeleteModal(false);
            setProductToDelete(null);
        }
    };

    const handleEdit = (product) => {
        setEditingProduct(product);
        setEditFormData({
            name: product.name,
            category: product.category,
            price: product.price,
            stock: product.stock,
            description: product.description || ''
        });
        setEditPreviews({
            image: product.image || null,
            hoverImg: product.hoverImg || null,
            image2: product.image2 || null,
            image3: product.image3 || null,
            image4: product.image4 || null
        });
        setShowEditModal(true);
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleEditImageChange = (e, fieldName) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setEditPreviews(prev => ({
                    ...prev,
                    [fieldName]: reader.result
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleEditSubmit = (e) => {
        e.preventDefault();
        updateProduct(editingProduct.id, {
            ...editFormData,
            price: parseFloat(editFormData.price),
            stock: parseInt(editFormData.stock),
            image: editPreviews.image,
            hoverImg: editPreviews.hoverImg,
            image2: editPreviews.image2,
            image3: editPreviews.image3,
            image4: editPreviews.image4
        });
        setShowEditModal(false);
        setEditingProduct(null);
    };

    return (
        <div className="page-wrapper">
            <Header title="Products" toggleSidebar={toggleSidebar} onSearch={setSearchQuery} />
            <div className="page-container">
                <div className="card">
                    <div className="section-header">
                        <h3>Product List ({filteredProducts.length})</h3>
                    </div>
                    <div className="table-responsive">
                        <table className="data-table">
                            <thead>
                                <tr>
                                    <th>Product ID</th>
                                    <th>Image</th>
                                    <th>Name</th>
                                    <th className="hide-on-mobile">Category</th>
                                    <th>Price</th>
                                    <th className="hide-on-mobile">Stock</th>
                                    <th className="hide-on-mobile">Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredProducts.map((product) => (
                                    <tr key={product.id}>
                                        <td>{product.id}</td>
                                        <td>
                                            <div className="product-img-container">
                                                <img 
                                                    src={product.image || 'https://via.placeholder.com/40'} 
                                                    alt={product.name} 
                                                    className="product-img-thumbnail"
                                                    onError={(e) => { e.target.src = 'https://via.placeholder.com/40'; }}
                                                    style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '4px' }}
                                                />
                                            </div>
                                        </td>
                                        <td>{product.name}</td>
                                        <td className="hide-on-mobile">{product.category}</td>
                                        <td>{formatCurrency(product.price)}</td>
                                        <td className="hide-on-mobile">{product.stock}</td>
                                        <td className="hide-on-mobile">
                                            <span className={`status ${product.status === 'In Stock' ? 'in-stock' : 'out-of-stock'}`}>
                                                {product.status}
                                            </span>
                                        </td>
                                        <td>
                                            <div className="actions">
                                                <button className="edit-btn" onClick={() => handleEdit(product)}>
                                                    Edit
                                                </button>
                                                <button className="delete-btn" onClick={() => handleDelete(product)}>
                                                    Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>

            {/* Edit Product Modal */}
            {showEditModal && (
                <div className="modal-overlay" onClick={() => setShowEditModal(false)}>
                    <div className="modal-content edit-modal" onClick={(e) => e.stopPropagation()}>
                        <h3>Edit Product</h3>
                        <form onSubmit={handleEditSubmit}>
                            <div className="form-group">
                                <label>Product Name *</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={editFormData.name}
                                    onChange={handleEditChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Category *</label>
                                <input
                                    type="text"
                                    name="category"
                                    value={editFormData.category}
                                    onChange={handleEditChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Price ($) *</label>
                                <input
                                    type="number"
                                    name="price"
                                    value={editFormData.price}
                                    onChange={handleEditChange}
                                    step="0.01"
                                    min="0"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Stock *</label>
                                <input
                                    type="number"
                                    name="stock"
                                    value={editFormData.stock}
                                    onChange={handleEditChange}
                                    min="0"
                                    required
                                />
                            </div>
                             <div className="form-group">
                                 <label>Main Image</label>
                                 <input type="file" accept="image/*" onChange={(e) => handleEditImageChange(e, 'image')} className="file-input" />
                                 {editPreviews.image && (
                                     <div style={{ marginTop: '10px' }}>
                                         <img src={editPreviews.image} alt="preview" style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '4px' }} />
                                     </div>
                                 )}
                             </div>
                             <div className="form-group">
                                 <label>Hover / Flip Image</label>
                                 <input type="file" accept="image/*" onChange={(e) => handleEditImageChange(e, 'hoverImg')} className="file-input" />
                                 {editPreviews.hoverImg && (
                                     <div style={{ marginTop: '10px' }}>
                                         <img src={editPreviews.hoverImg} alt="preview" style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '4px' }} />
                                     </div>
                                 )}
                             </div>
                             <div className="form-group">
                                 <label>Additional Image 1</label>
                                 <input type="file" accept="image/*" onChange={(e) => handleEditImageChange(e, 'image2')} className="file-input" />
                                 {editPreviews.image2 && (
                                     <div style={{ marginTop: '10px' }}>
                                         <img src={editPreviews.image2} alt="preview" style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '4px' }} />
                                     </div>
                                 )}
                             </div>
                             <div className="form-group">
                                 <label>Additional Image 2</label>
                                 <input type="file" accept="image/*" onChange={(e) => handleEditImageChange(e, 'image3')} className="file-input" />
                                 {editPreviews.image3 && (
                                     <div style={{ marginTop: '10px' }}>
                                         <img src={editPreviews.image3} alt="preview" style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '4px' }} />
                                     </div>
                                 )}
                             </div>
                             <div className="form-group">
                                 <label>Additional Image 3</label>
                                 <input type="file" accept="image/*" onChange={(e) => handleEditImageChange(e, 'image4')} className="file-input" />
                                 {editPreviews.image4 && (
                                     <div style={{ marginTop: '10px' }}>
                                         <img src={editPreviews.image4} alt="preview" style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '4px' }} />
                                     </div>
                                 )}
                             </div>
                             <div className="form-group">
                                 <label>Description</label>
                                 <textarea
                                     name="description"
                                     value={editFormData.description}
                                     onChange={handleEditChange}
                                     rows="3"
                                 />
                             </div>
                            <div className="modal-actions">
                                <button type="button" className="cancel-btn" onClick={() => setShowEditModal(false)}>
                                    Cancel
                                </button>
                                <button type="submit" className="confirm-btn">Save Changes</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {showDeleteModal && (
                <div className="modal-overlay" onClick={() => setShowDeleteModal(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <h3>Confirm Delete</h3>
                        <p>Are you sure you want to delete "{productToDelete?.name}"?</p>
                        <div className="modal-actions">
                            <button className="cancel-btn" onClick={() => setShowDeleteModal(false)}>Cancel</button>
                            <button className="confirm-btn delete" onClick={confirmDelete}>Delete</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Products;
