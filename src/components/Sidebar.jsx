import React from "react";
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Users,
  ChartNoAxesCombined,
  Settings,
  Flower2
} from "lucide-react";

function Sidebar({ activePage, setActivePage }) {

  const menuItems = [
    {
      name: "Dashboard",
      icon: LayoutDashboard
    },
    {
      name: "Products",
      icon: Package
    },
    {
      name: "Orders",
      icon: ShoppingBag
    },
    {
      name: "Customers",
      icon: Users
    },
    {
      name: "Analytics",
      icon: ChartNoAxesCombined
    }
  ];

  return (
    <aside className="sidebar">

      {/* Logo */}

      <div className="sidebar-logo">

        <div className="logo-icon">
          <Flower2 size={25} />
        </div>

        <div>
          <h2>Roselle</h2>
          <span>FLORAL BOUTIQUE</span>
        </div>

      </div>


      {/* Main Navigation */}

      <div className="sidebar-section">

        <p className="sidebar-heading">MAIN MENU</p>

        <nav>

          {menuItems.map((item) => {

            const Icon = item.icon;

            return (

              <button
                key={item.name}
                className={`sidebar-link ${
                  activePage === item.name ? "active" : ""
                }`}
                onClick={() => setActivePage(item.name)}
              >

                <Icon size={19} />

                <span>{item.name}</span>

              </button>

            );

          })}

        </nav>

      </div>


      {/* Settings */}

      <div className="sidebar-bottom">

        <button
          className={`sidebar-link ${
            activePage === "Settings" ? "active" : ""
          }`}
          onClick={() => setActivePage("Settings")}
        >

          <Settings size={19} />

          <span>Settings</span>

        </button>

        <div className="sidebar-footer">

          <div className="footer-flower">
            🌷
          </div>

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