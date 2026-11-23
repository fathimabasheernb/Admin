import React, { useState, useEffect, useRef } from "react";

import {
  Search,
  Bell,
  ChevronDown,
  User,
  Settings,
  ShieldCheck,
  LogOut,
  X,
  Flower2
} from "lucide-react";

function Navbar({ onLogout, setActivePage }) {

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const dropdownRef = useRef(null);

  useEffect(() => {

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };

  }, []);

  const handleNavigation = (page) => {
    setActivePage(page);
    setDropdownOpen(false);
  };

  return (

    <header className="navbar">

      {/* SEARCH */}

      <div className="navbar-search">

        <Search size={19} />

        <input
          type="text"
          placeholder="Search anything..."
        />

      </div>


      <div className="navbar-right">

        {/* NOTIFICATION */}

        <button className="notification-button">
          <Bell size={20} />
          <span className="notification-dot"></span>
        </button>


        {/* ADMIN PROFILE */}

        <div className="admin-profile-wrapper" ref={dropdownRef}>

          <button
            className="admin-profile"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >

            <div className="admin-avatar">
              F
            </div>

            <div className="admin-details">

              <h4>Fathima Basheer</h4>

              <p>Store Owner</p>

            </div>

            <ChevronDown
              size={17}
              className={dropdownOpen ? "rotate-chevron" : ""}
            />

          </button>


          {/* DROPDOWN */}

          {dropdownOpen && (

            <div className="admin-dropdown">

              <div className="dropdown-profile">

                <div className="dropdown-avatar">
                  F
                </div>

                <div>
                  <h4>Fathima Basheer</h4>

                  <p>admin@roselle.com</p>

                  <span className="admin-badge">
                    Super Administrator
                  </span>
                </div>

              </div>


              <div className="dropdown-divider"></div>


              {/* MY PROFILE */}

              <button
                className="dropdown-item"
                onClick={() => {
                  setShowProfile(true);
                  setDropdownOpen(false);
                }}
              >
                <User size={18} />
                <span>My Profile</span>
              </button>


              {/* ACCOUNT SETTINGS */}

              <button
                className="dropdown-item"
                onClick={() => handleNavigation("Settings")}
              >
                <Settings size={18} />
                <span>Account Settings</span>
              </button>


              {/* ROLES & PERMISSIONS */}

              <button
                className="dropdown-item"
                onClick={() => handleNavigation("Staff")}
              >
                <ShieldCheck size={18} />
                <span>Roles & Permissions</span>
              </button>


              <div className="dropdown-divider"></div>


              {/* LOGOUT */}

              <button
                className="dropdown-item logout-item"
                onClick={onLogout}
              >
                <LogOut size={18} />
                <span>Logout</span>
              </button>


              {/* FOOTER */}

              <div className="dropdown-footer">
                <Flower2 size={15} />
                <span>Made with love by Roselle</span>
              </div>

            </div>

          )}

        </div>

      </div>


      {/* PROFILE MODAL */}

      {showProfile && (

        <div
          className="profile-modal-overlay"
          onClick={() => setShowProfile(false)}
        >

          <div
            className="profile-modal"
            onClick={(e) => e.stopPropagation()}
          >

            <button
              className="profile-close"
              onClick={() => setShowProfile(false)}
            >
              <X size={20} />
            </button>


            {/* PROFILE AVATAR */}

            <div className="profile-modal-avatar">
              F
            </div>


            <h2>Fathima Basheer</h2>

            <p className="profile-role">
              Super Administrator
            </p>


            {/* PROFILE INFORMATION */}

            <div className="profile-info">

              <div>
                <span>Full Name</span>
                <strong>Fathima Basheer</strong>
              </div>

              <div>
                <span>Email Address</span>
                <strong>admin@roselle.com</strong>
              </div>

              <div>
                <span>Account Type</span>
                <strong>Store Owner</strong>
              </div>

              <div>
                <span>Access Level</span>
                <strong>Full Access</strong>
              </div>

            </div>


            {/* MANAGE ACCOUNT */}

            <button
              className="profile-edit-button"
              onClick={() => {
                setShowProfile(false);
                handleNavigation("Settings");
              }}
            >
              Manage Account
            </button>

          </div>

        </div>

      )}

    </header>

  );

}

export default Navbar;
