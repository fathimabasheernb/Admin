import React, { useState } from "react";
import {
  Plus,
  Search,
  Pencil,
  Trash2,
  X
} from "lucide-react";

import initialProducts from "../data/products";

function Categories() {

  const [categories, setCategories] = useState(() => {
    const saved = JSON.parse(
      localStorage.getItem("roselleCategories") || "[]"
    );

    const products =
      JSON.parse(localStorage.getItem("roselleProducts") || "null")
      || initialProducts;

    const data = saved.length
      ? saved
      : [...new Set(products.map(p => p.category).filter(Boolean))];

    return data.map((c, i) =>
      typeof c === "string"
        ? { id: i + 1, name: c, image: "" }
        : c
    );
  });

  const [search, setSearch] = useState("");

  const [showModal, setShowModal] = useState(false);

  const [editId, setEditId] = useState(null);

  const [name, setName] = useState("");

  const [image, setImage] = useState("");

  const [showDeleteAlert, setShowDeleteAlert] = useState(false);

  const [categoryToDelete, setCategoryToDelete] = useState(null);


  const save = (data) => {

    setCategories(data);

    localStorage.setItem(
      "roselleCategories",
      JSON.stringify(data)
    );

    window.dispatchEvent(new Event("dashboardUpdate"));

  };

  const openModal = (category = null) => {

    setEditId(category?.id || null);

    setName(category?.name || "");

    setImage(category?.image || "");

    setShowModal(true);

  };

  const handleSave = () => {

    const value = name.trim();

    if (!value) {
      alert("Enter category name");
      return;
    }

    if (categories.some(c =>
      c.name.toLowerCase() === value.toLowerCase() &&
      c.id !== editId
    )) {
      alert("Category already exists");
      return;
    }

    const oldCategory = categories.find(
      c => c.id === editId
    );

    const updated = editId

      ? categories.map(c =>
          c.id === editId
            ? { ...c, name: value, image }
            : c
        )

      : [
          ...categories,
          {
            id: Date.now(),
            name: value,
            image
          }
        ];

    if (oldCategory && oldCategory.name !== value) {

      const products =
        JSON.parse(localStorage.getItem("roselleProducts") || "null")
        || initialProducts;

      const updatedProducts = products.map(p =>
        p.category === oldCategory.name
          ? { ...p, category: value }
          : p
      );

      localStorage.setItem(
        "roselleProducts",
        JSON.stringify(updatedProducts)
      );

    }

    save(updated);

    setShowModal(false);

    setName("");

    setImage("");

    setEditId(null);

  };

  const deleteCategory = (category) => {

    setCategoryToDelete(category);

    setShowDeleteAlert(true);

  };


  const confirmDeleteCategory = () => {

    if (!categoryToDelete) return;

    const products =
      JSON.parse(localStorage.getItem("roselleProducts") || "null")
      || initialProducts;


    const updatedProducts = products.map(p =>
      p.category === categoryToDelete.name
        ? { ...p, category: "Uncategorized" }
        : p
    );

    localStorage.setItem(
      "roselleProducts",
      JSON.stringify(updatedProducts)
    );


    const updatedCategories = categories.filter(
      c => c.id !== categoryToDelete.id
    );

    save(updatedCategories);

    window.dispatchEvent(new Event("dashboardUpdate"));

    setShowDeleteAlert(false);

    setCategoryToDelete(null);

  };


  const cancelDeleteCategory = () => {

    setShowDeleteAlert(false);

    setCategoryToDelete(null);

  };

  const products =
    JSON.parse(localStorage.getItem("roselleProducts") || "null")
    || initialProducts;


  const filtered = categories.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase())
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
            key={category.id}
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
                  p => p.category === category.name
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
              onChange={e => {

                const file = e.target.files[0];

                if (file) {

                  if (file.size > 2 * 1024 * 1024) {

                    alert(
                      "Please select an image smaller than 2 MB."
                    );

                    return;

                  }

                  const reader = new FileReader();

                  reader.onloadend = () => {
                    setImage(reader.result);
                  };

                  reader.readAsDataURL(file);

                }

              }}
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


      {/* CUSTOM DELETE ALERT */}

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
