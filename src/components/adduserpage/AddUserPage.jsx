import React, { useState } from "react";
import axios from "axios";
import './AddUserPage.css';

const AddUserPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    role: "user", // default role
    phone: "",
    email: "",
    imageUrl: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3000/api/v1/create-new-user", formData,{
        withCredentials: true,
      }); 
      // API endpoint to create a new user
      if (response.status === 201) {
        alert("User added successfully!");
        setFormData({
          username: "",
          role: "user",
          phone: "",
          email: "",
          imageUrl: "",
          password: "",
        }); // Clear the form after successful submission
      }
    } catch (error) {
      console.error("Error adding user", error);
      alert("Failed to add user.");
    }
  };

  return (
    <div className="add-user-page">
      <h1>Add New User</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Enter username"
            required
          />
        </div>
        <div>
          <label>Role</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <div>
          <label>Phone</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Enter phone number"
            required
          />
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter email address"
            required
          />
        </div>
        <div>
          <label>Image URL</label>
          <input
            type="url"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            placeholder="Enter image URL"
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter password"
            required
          />
        </div>
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default AddUserPage;
