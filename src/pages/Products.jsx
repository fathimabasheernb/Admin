import React, { useState } from "react";
import { useStore } from "../context/StoreContext";

import {
  Plus,
  Search,
  Pencil,
  Trash2,
  X
} from "lucide-react";

// Convert category objects into strings
const normalizeCategory = (category) => {
  if (typeof category === "string") return category;

  if (category && typeof category === "object") {
    return category.name || "";
  }

  return "";
};

function Products() {

  // Get shared Products and Categories
  const {
    products,
    categories,
    updateProducts,
    updateCategories
  } = useStore();

  // Other states
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [showNewCategory, setShowNewCategory] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");

  // Empty product form
  const emptyForm = {
    name: "",
    category: "Rose Bouquets",
    price: "",
    stock: "",
    status: "Published",
    description: "",
    image: ""
  };

  const [form, setForm] = useState(emptyForm);

  // Save products globally
  const saveProducts = (updatedProducts) => {
    updateProducts(updatedProducts);
  };

  // Save categories globally
  const saveCategories = (updatedCategories) => {
    updateCategories(updatedCategories);
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle image upload
  const handleImage = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setForm((prev) => ({
          ...prev,
          image: reader.result
        }));
      };

      reader.readAsDataURL(file);
    }
  };

  // Add new category
  const handleAddCategory = () => {
    const newCategory = newCategoryName.trim();

    if (!newCategory) {
      alert("Please enter a category name.");
      return;
    }

    const alreadyExists = categories.some(
      (cat) => cat.toLowerCase() === newCategory.toLowerCase()
    );

    if (alreadyExists) {
      alert("This category already exists!");
      return;
    }

    const updatedCategories = [
      ...categories,
      newCategory
    ];

    saveCategories(updatedCategories);

    setForm((prev) => ({
      ...prev,
      category: newCategory
    }));

    setNewCategoryName("");
    setShowNewCategory(false);
  };

  // Handle product submission
  const handleSubmit = (e) => {
    e.preventDefault();

    const productData = {
      ...form,
      category: normalizeCategory(form.category),
      price: Number(form.price),
      stock: Number(form.stock)
    };

    let updatedProducts;

    if (editingId !== null) {
      updatedProducts = products.map((product) =>
        product.id === editingId
          ? { ...product, ...productData }
          : product
      );
    } else {
      const newProduct = {
        id: Date.now(),
        ...productData
      };

      updatedProducts = [...products, newProduct];
    }

    saveProducts(updatedProducts);

    setForm(emptyForm);
    setEditingId(null);
    setShowForm(false);
    setShowNewCategory(false);
  };

  // Edit product
  const handleEdit = (product) => {
    setForm({
      ...product,
      category: normalizeCategory(product.category),
      price: String(product.price),
      stock: String(product.stock)
    });

    setEditingId(product.id);
    setShowNewCategory(false);
    setShowForm(true);
  };

  // Delete product
  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (confirmDelete) {
      const updatedProducts = products.filter(
        (product) => product.id !== id
      );

      saveProducts(updatedProducts);
    }
  };

  // Search and category filtering
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === "All" ||
      normalizeCategory(product.category) === category;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="products-page">

      {/* Page Heading */}
      <div className="page-heading">
        <div>
          <h1>Products</h1>
          <p>Manage your floral collection and inventory.</p>
        </div>

        <button
          className="add-product-button"
          onClick={() => {
            setForm(emptyForm);
            setEditingId(null);
            setShowNewCategory(false);
            setNewCategoryName("");
            setShowForm(true);
          }}
        >
          <Plus size={19} />
          Add Product
        </button>
      </div>

      {/* Product Summary */}
      <div className="product-summary">

        <div className="summary-box">
          <span>Total Products</span>
          <h2>{products.length}</h2>
        </div>

        <div className="summary-box">
          <span>Published</span>
          <h2>
            {products.filter(p => p.status === "Published").length}
          </h2>
        </div>

        <div className="summary-box">
          <span>Out of Stock</span>
          <h2>
            {products.filter(p => p.stock === 0).length}
          </h2>
        </div>

        <div className="summary-box">
          <span>Total Categories</span>
          <h2>{categories.length}</h2>
        </div>

      </div>

      {/* Search and Category Filter */}
      <div className="product-toolbar">

        <div className="product-search">
          <Search size={19} />

          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="All">All Categories</option>

          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

      </div>

      {/* Products Table */}
      <div className="products-table-card">

        <div className="table-container">

          <table>

            <thead>
              <tr>
                <th>PRODUCT</th>
                <th>CATEGORY</th>
                <th>PRICE</th>
                <th>STOCK</th>
                <th>STATUS</th>
                <th>ACTIONS</th>
              </tr>
            </thead>

            <tbody>

              {filteredProducts.map((product) => (

                <tr key={product.id}>

                  <td>
                    <div className="product-info">

                      {product.image ? (
                        <img
                          src={product.image}
                          alt={product.name}
                        />
                      ) : (
                        <div className="product-placeholder">
                          🌷
                        </div>
                      )}

                      <div>
                        <strong>{product.name}</strong>
                      </div>

                    </div>
                  </td>

                  <td>{normalizeCategory(product.category)}</td>

                  <td>
                    ₹{Number(product.price).toLocaleString("en-IN")}
                  </td>

                  <td>{product.stock}</td>

                  <td>
                    <span className={`status-badge ${
                      product.status.toLowerCase().replaceAll(" ", "-")
                    }`}>
                      {product.status}
                    </span>
                  </td>

                  <td>
                    <div className="product-actions">

                      <button
                        onClick={() => handleEdit(product)}
                        title="Edit product"
                      >
                        <Pencil size={17} />
                      </button>

                      <button
                        onClick={() => handleDelete(product.id)}
                        title="Delete product"
                      >
                        <Trash2 size={17} />
                      </button>

                    </div>
                  </td>

                </tr>

              ))}

              {filteredProducts.length === 0 && (
                <tr>
                  <td colSpan="6" className="empty-message">
                    No products found.
                  </td>
                </tr>
              )}

            </tbody>

          </table>

        </div>
      </div>

      {/* Add / Edit Product Modal */}
      {showForm && (

        <div className="modal-overlay">

          <div className="product-modal">

            <div className="modal-header">

              <div>
                <h2>
                  {editingId !== null ? "Edit Product" : "Add New Product"}
                </h2>

                <p>Enter your floral product details.</p>
              </div>

              <button
                className="close-modal"
                onClick={() => {
                  setShowForm(false);
                  setShowNewCategory(false);
                }}
              >
                <X size={21} />
              </button>

            </div>

            <form onSubmit={handleSubmit}>

              <label>Product Name</label>

              <input
                type="text"
                name="name"
                placeholder="Enter product name"
                value={form.name}
                onChange={handleChange}
                required
              />

              <label>Product Category</label>

              <select
                name="category"
                value={showNewCategory ? "__add_new__" : form.category}
                onChange={(e) => {
                  if (e.target.value === "__add_new__") {
                    setShowNewCategory(true);
                  } else {
                    setShowNewCategory(false);
                    handleChange(e);
                  }
                }}
                required
              >

                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}

                <option value="__add_new__">
                  + Add New Category
                </option>

              </select>

              {showNewCategory && (

                <div className="new-category-box">

                  <label>New Category Name</label>

                  <input
                    type="text"
                    placeholder="Example: Daisy Flowers"
                    value={newCategoryName}
                    onChange={(e) => setNewCategoryName(e.target.value)}
                    autoFocus
                  />

                  <button
                    type="button"
                    className="save-button"
                    onClick={handleAddCategory}
                  >
                    Add Category
                  </button>

                </div>

              )}

              <div className="form-row">

                <div>
                  <label>Price (₹)</label>

                  <input
                    type="number"
                    name="price"
                    min="0"
                    value={form.price}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div>
                  <label>Stock Quantity</label>

                  <input
                    type="number"
                    name="stock"
                    min="0"
                    value={form.stock}
                    onChange={handleChange}
                    required
                  />
                </div>

              </div>

              <label>Product Status</label>

              <select
                name="status"
                value={form.status}
                onChange={handleChange}
              >
                <option>Published</option>
                <option>Draft</option>
                <option>Out of Stock</option>
              </select>

              <label>Product Description</label>

              <textarea
                name="description"
                placeholder="Describe your flower arrangement..."
                value={form.description}
                onChange={handleChange}
                rows="3"
              />

              <label>Upload Product Image</label>

              <input
                type="file"
                accept="image/*"
                onChange={handleImage}
              />

              {form.image && (
                <img
                  src={form.image}
                  alt="Product preview"
                  className="product-preview"
                />
              )}

              <div className="modal-actions">

                <button
                  type="button"
                  className="cancel-button"
                  onClick={() => {
                    setShowForm(false);
                    setShowNewCategory(false);
                  }}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="save-button"
                >
                  {editingId !== null ? "Update Product" : "Save Product"}
                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </div>
  );
}

export default Products;