import React, { useState } from "react";
import "./Sidebar.css"; 
import testsImage from "../../assets/images/tests.svg";
import {useNavigate} from "react-router-dom";
import AddTestForm from "./mainpage/AddTestForm"; 
import { SlBookOpen } from "react-icons/sl";
import { IoHomeOutline } from "react-icons/io5";
import { IoReceiptOutline } from "react-icons/io5";
import { AiOutlineUsergroupAdd } from "react-icons/ai";

const Sidebar = () => {
  const [showForm, setShowForm] = useState(false); 
  const navigate = useNavigate();
  const handleAddUserClick =()=>{
    navigate("/add-user");
  }

  return (
    <div className="sidebar">
     
      <div className="avatar-section">
        <img
          src="https://via.placeholder.com/50"
          alt="avatar"
          className="avatar"
        />
        <div className="name-section">
          <h3>Jacob Salvi</h3>
          <p className="occupation">Admin</p>
        </div>
      </div>
      <div className="nav-options">
        <ul>
          <li>
            <IoHomeOutline />
            Dashboard
          </li>
          <li>
            <IoReceiptOutline />
            Test
          </li>
          <li>
            <SlBookOpen />
            Courses
          </li>
          <li onClick={handleAddUserClick}>
          <AiOutlineUsergroupAdd />
            Add new User
          </li>
        </ul>
      </div>
      <div className="space"></div>
      <div className="image-section">
        <img src={testsImage} alt="tests" className="sidebar-image" />
        
      </div>

      {showForm && <AddTestForm onClose={() => setShowForm(false)} />}
    </div>
  );
};

export default Sidebar;
