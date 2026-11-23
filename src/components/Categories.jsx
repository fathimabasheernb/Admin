import React, { useState } from "react";
import {
  Plus,
  Search,
  Pencil,
  Trash2,
  X
} from "lucide-react";

import { useStore } from "../context/StoreContext";

function Categories() {

  const {
    categories,
    products,
    updateCategories,
    updateProducts
  } = useStore();

  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [name, setName] = useState("");
  const [image, setImage] = useState("");

  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);

  const [categoryImages, setCategoryImages] = useState(() => {
    try {
      return JSON.parse(
        localStorage.getItem("roselleCategoryImages") || "{}"
      );
    } catch {
      return {};
    }
  });

  // Convert shared category names into display objects
  const categoryList = categories.map((category, index) => ({
    id: index + 1,
    name: typeof category === "string" ? category : category.name,
    image:
      categoryImages[
        typeof category === "string" ? category : category.name
      ] || ""
  }));

  // Save category images
  const saveCategoryImages = (updatedImages) => {
    setCategoryImages(updatedImages);

    localStorage.setItem(
      "roselleCategoryImages",
      JSON.stringify(updatedImages)
    );
  };

  // Open Add / Edit Modal
  const openModal = (category = null) => {
    setEditId(category?.name || null);
    setName(category?.name || "");
    setImage(category?.image || "");
    setShowModal(true);
  };

  // Save Category
  const handleSave = () => {
    const value = name.trim();

    if (!value) {
      alert("Enter category name");
      return;
    }

    if (
      categories.some(category => {
        const categoryName =
          typeof category === "string"
            ? category
            : category.name;

        return (
          categoryName.toLowerCase() === value.toLowerCase() &&
          categoryName !== editId
        );
      })
    ) {
      alert("Category already exists");
      return;
    }

    let updatedCategories;

    if (editId) {
      updatedCategories = categories.map(category => {
        const categoryName =
          typeof category === "string"
            ? category
            : category.name;

        return categoryName === editId ? value : categoryName;
      });

      // Update products using the renamed category
      if (editId !== value) {
        const updatedProducts = products.map(product =>
          product.category === editId
            ? { ...product, category: value }
            : product
        );

        updateProducts(updatedProducts);
      }

      // Move saved category image to the new name
      const updatedImages = { ...categoryImages };

      if (updatedImages[editId]) {
        updatedImages[value] = image || updatedImages[editId];
        delete updatedImages[editId];
      } else if (image) {
        updatedImages[value] = image;
      }

      saveCategoryImages(updatedImages);

    } else {
      updatedCategories = [
        ...categories,
        value
      ];

      if (image) {
        saveCategoryImages({
          ...categoryImages,
          [value]: image
        });
      }
    }

    updateCategories(updatedCategories);

    setShowModal(false);
    setName("");
    setImage("");
    setEditId(null);
  };

  // Open Delete Confirmation
  const deleteCategory = (category) => {
    setCategoryToDelete(category);
    setShowDeleteAlert(true);
  };

  // Confirm Delete
  const confirmDeleteCategory = () => {
    if (!categoryToDelete) return;

    const categoryName = categoryToDelete.name;

    // Move products to Uncategorized
    const updatedProducts = products.map(product =>
      product.category === categoryName
        ? { ...product, category: "Uncategorized" }
        : product
    );

    updateProducts(updatedProducts);

    // Remove category from shared categories
    const updatedCategories = categories.filter(category => {
      const currentName =
        typeof category === "string"
          ? category
          : category.name;

      return currentName !== categoryName;
    });

    updateCategories(updatedCategories);

    // Remove its saved image
    const updatedImages = { ...categoryImages };
    delete updatedImages[categoryName];
    saveCategoryImages(updatedImages);

    setShowDeleteAlert(false);
    setCategoryToDelete(null);
  };

  // Cancel Delete
  const cancelDeleteCategory = () => {
    setShowDeleteAlert(false);
    setCategoryToDelete(null);
  };

  // Handle Category Image
  const handleImage = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      alert("Please select an image smaller than 2 MB.");
      return;
    }

    const reader = new FileReader();

    reader.onloadend = () => {
      setImage(reader.result);
    };

    reader.readAsDataURL(file);
  };

  // Search Categories
  const filtered = categoryList.filter(category =>
    category.name.toLowerCase().includes(search.toLowerCase())
  );

  return (

    <div className="categories-page">

      {/* Page Heading */}

      <div className="page-heading">

        <div>
          <h1>Categories</h1>
          <p>Organize your floral collections.</p>
        </div>

        <button
          className="add-button"
          onClick={() => openModal()}
        >
          <Plus size={18} />
          Add Category
        </button>

      </div>


      {/* Category Statistics */}

      <div className="product-summary">

        <div className="summary-box">
          <span>Total Categories</span>
          <h2>{categories.length}</h2>
        </div>

      </div>


      {/* Search */}

      <div className="product-toolbar">

        <div className="product-search">

          <Search size={19} />

          <input
            placeholder="Search categories..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />

        </div>

      </div>


      {/* Category Cards */}

      <div className="category-grid">

        {filtered.map(category => (

          <div
            className="category-card"
            key={category.name}
          >

            <img
              src={category.image || "/images/bo.jpg"}
              alt={category.name}
              className="category-image"
            />

            <h3>{category.name}</h3>

            <p>
              {
                products.filter(
                  product => product.category === category.name
                ).length
              } Products
            </p>

            <div className="category-actions">

              <button
                onClick={() => openModal(category)}
                title="Edit"
              >
                <Pencil size={17} />
              </button>

              <button
                onClick={() => deleteCategory(category)}
                title="Delete"
              >
                <Trash2 size={17} />
              </button>

            </div>

          </div>

        ))}

        {!filtered.length && (
          <p>No categories found.</p>
        )}

      </div>


      {/* Add / Edit Category Modal */}

      {showModal && (

        <div className="modal-overlay">

          <div className="product-modal">

            <div className="modal-header">

              <div>
                <h2>
                  {editId ? "Edit Category" : "Add Category"}
                </h2>

                <p>Manage category details.</p>
              </div>

              <button
                className="close-modal"
                onClick={() => setShowModal(false)}
              >
                <X />
              </button>

            </div>


            <label>Category Name</label>

            <input
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Enter category name"
            />


            <label>Category Image</label>

            <input
              type="file"
              accept="image/*"
              onChange={handleImage}
            />


            {image && (

              <img
                src={image}
                alt="Category preview"
                style={{
                  width: "100%",
                  height: "150px",
                  objectFit: "cover",
                  borderRadius: "10px",
                  marginTop: "12px"
                }}
              />

            )}


            <button
              className="save-button"
              onClick={handleSave}
            >
              {editId ? "Update Category" : "Save Category"}
            </button>

          </div>

        </div>

      )}


      {/* Custom Delete Alert */}

      {showDeleteAlert && (

        <div className="modal-overlay">

          <div className="category-alert-box">

            <div className="delete-icon">
              <Trash2 size={27} />
            </div>

            <h2>Delete Category?</h2>

            <p>
              Are you sure you want to delete

              <strong>
                {" "}{categoryToDelete?.name}{" "}
              </strong>

              from your Roselle collections?

              <br />

              Products in this category will be moved to
              Uncategorized.
            </p>


            <div className="category-alert-actions">

              <button
                className="cancel-delete-btn"
                onClick={cancelDeleteCategory}
              >
                Cancel
              </button>

              <button
                className="confirm-delete-btn"
                onClick={confirmDeleteCategory}
              >
                <Trash2 size={15} />
                Delete Category
              </button>

            </div>

          </div>

        </div>

      )}

    </div>

  );

}

export default Categories;