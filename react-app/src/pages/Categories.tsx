import React, { useState } from "react";
import { useCategories } from "../hooks/useCategories";
import "../styles/Categories.css";

const Categories: React.FC = () => {
  const { categories, addCategory, updateCategory, deleteCategory } = useCategories();
  const [name, setName] = useState("");
  const [color, setColor] = useState("#3b82f6");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!name.trim()) {
      newErrors.name = "Category name is required";
    }
    if (!color) {
      newErrors.color = "Please select a color";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      if (editingId) {
        await updateCategory(editingId, { name: name.trim(), color });
        setEditingId(null);
      } else {
        await addCategory({ name: name.trim(), color });
      }
      setName("");
      setColor("#3b82f6");
      setErrors({});
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleEdit = (categoryId: string) => {
    const category = categories.find((c) => c.id === categoryId);
    if (category) {
      setName(category.name);
      setColor(category.color);
      setEditingId(categoryId);
    }
  };

  const handleCancel = () => {
    setName("");
    setColor("#3b82f6");
    setEditingId(null);
    setErrors({});
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this category?")) {
      await deleteCategory(id);
    }
  };

  return (
    <div className="categories">
      <h1>Categories</h1>

      <div className="categories-container">
        <div className="category-form">
          <h2>{editingId ? "Edit Category" : "Add New Category"}</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Category Name *</label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter category name"
              />
              {errors.name && <span className="error">{errors.name}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="color">Color *</label>
              <div className="color-picker">
                <input
                  id="color"
                  type="color"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                />
                <span className="color-value">{color}</span>
              </div>
              {errors.color && <span className="error">{errors.color}</span>}
            </div>

            <div className="form-actions">
              <button type="submit" className="btn-submit">
                {editingId ? "Update Category" : "Add Category"}
              </button>
              {editingId && (
                <button type="button" className="btn-cancel" onClick={handleCancel}>
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        <div className="categories-list">
          <h2>All Categories</h2>
          {categories.length > 0 ? (
            <div className="category-cards">
              {categories.map((category) => (
                <div key={category.id} className="category-card">
                  <div className="category-info">
                    <div
                      className="category-color"
                      style={{ backgroundColor: category.color }}
                    ></div>
                    <div className="category-details">
                      <h3>{category.name}</h3>
                      <p>{category.color}</p>
                    </div>
                  </div>
                  <div className="category-actions">
                    <button
                      className="btn-edit"
                      onClick={() => handleEdit(category.id)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn-delete"
                      onClick={() => handleDelete(category.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="no-data">No categories yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Categories;
