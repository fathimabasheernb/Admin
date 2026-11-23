import { useState } from "react";

import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Categories from "./components/Categories";

import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Orders from "./pages/Orders";
import Customers from "./pages/Customers";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";
import Staff from "./pages/Staff";
import Login from "./pages/Login";

import { StoreProvider } from "./context/StoreContext";

function App() {

  const [loggedIn, setLoggedIn] = useState(
    localStorage.getItem("roselleAdminLoggedIn") === "true"
  );

  const [activePage, setActivePage] = useState("Dashboard");

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("roselleAdminLoggedIn");
    setLoggedIn(false);
    setActivePage("Dashboard");
  };

  // Page Navigation
  const renderPage = () => {

    switch (activePage) {

      case "Dashboard":
        return <Dashboard />;

      case "Products":
        return <Products />;

      case "Categories":
        return <Categories />;

      case "Orders":
        return <Orders />;

      case "Customers":
        return <Customers />;

      case "Analytics":
        return <Analytics />;

      case "Settings":
        return <Settings />;

      case "Staff":
        return <Staff />;

      default:
        return <Dashboard />;

    }

  };

  return (

    <StoreProvider>

      {!loggedIn ? (

        <Login
          onLogin={() => {
            localStorage.setItem("roselleAdminLoggedIn", "true");
            setLoggedIn(true);
          }}
        />

      ) : (

        <div className="app-container">

          <Sidebar
            activePage={activePage}
            setActivePage={setActivePage}
            onLogout={handleLogout}
          />

          <div className="main-container">

            <Navbar
              onLogout={handleLogout}
              setActivePage={setActivePage}
            />

            <main className="page-content">

              {renderPage()}

            </main>

          </div>

        </div>

      )}

    </StoreProvider>

  );

}

export default App;