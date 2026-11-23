import React from "react";
import { Search, Bell, ChevronDown } from "lucide-react";

function Navbar() {

  return (

    <header className="navbar">

      <div className="navbar-search">

        <Search size={19} />

        <input
          type="text"
          placeholder="Search anything..."
        />

      </div>


      <div className="navbar-right">

        <button className="notification-button">
          <Bell size={20} />
          <span className="notification-dot"></span>
        </button>


        <div className="admin-profile">

          <div className="admin-avatar">
            R
          </div>

          <div className="admin-details">

            <h4>Roselle Admin</h4>

            <p>Store Owner</p>

          </div>

          <ChevronDown size={16} />

        </div>

      </div>

    </header>

  );

}

export default Navbar;