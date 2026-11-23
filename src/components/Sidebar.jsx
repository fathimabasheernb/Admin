import React from "react";

import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Users,
  ChartNoAxesCombined,
  Settings,
  Flower2,
  Tags,
  ShieldCheck,
  LogOut
} from "lucide-react";

function Sidebar({ activePage, setActivePage, onLogout }) {

  const menuItems = [
    { name: "Dashboard", icon: LayoutDashboard },
    { name: "Products", icon: Package },
    { name: "Categories", icon: Tags },
    { name: "Orders", icon: ShoppingBag },
    { name: "Customers", icon: Users },
    { name: "Analytics", icon: ChartNoAxesCombined },
    { name: "Staff", icon: ShieldCheck }
  ];

  return (
    <aside className="sidebar">

      <div className="sidebar-logo">
        <div className="logo-icon">
          <Flower2 size={25} />
        </div>

        <div>
          <h2>Roselle</h2>
          <span>FLORAL BOUTIQUE</span>
        </div>
      </div>

      <div className="sidebar-section">

        <p className="sidebar-heading">MAIN MENU</p>

        <nav>

          {menuItems.map(({ name, icon: Icon }) => (

            <button
              key={name}
              className={`sidebar-link ${activePage === name ? "active" : ""}`}
              onClick={() => setActivePage(name)}
            >
              <Icon size={19} />
              <span>{name === "Staff" ? "Staff Management" : name}</span>
            </button>

          ))}

        </nav>

      </div>

      <div className="sidebar-bottom">

        <button
          className={`sidebar-link ${activePage === "Settings" ? "active" : ""}`}
          onClick={() => setActivePage("Settings")}
        >
          <Settings size={19} />
          <span>Settings</span>
        </button>

        <button
          className="sidebar-link sidebar-logout"
          onClick={onLogout}
        >
          <LogOut size={19} />
          <span>Logout</span>
        </button>

        <div className="sidebar-footer">

          <div className="footer-flower">🌷</div>

          <div>
            <h4>Made with love</h4>
            <p>For every beautiful moment.</p>
          </div>

        </div>

      </div>

    </aside>
  );
}

export default Sidebar;