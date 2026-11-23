import { useState } from "react";

import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";

import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Orders from "./pages/Orders";
import Customers from "./pages/Customers";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";

function App() {

  const [activePage, setActivePage] = useState("Dashboard");

  const renderPage = () => {

    switch (activePage) {

      case "Dashboard":
        return <Dashboard />;

      case "Products":
        return <Products />;

      case "Orders":
        return <Orders />;

      case "Customers":
        return <Customers />;

      case "Analytics":
        return <Analytics />;

      case "Settings":
        return <Settings />;

      default:
        return <Dashboard />;

    }

  };

  return (

    <div className="app-container">

      <Sidebar
        activePage={activePage}
        setActivePage={setActivePage}
      />

      <div className="main-container">

        <Navbar />

        <main className="page-content">

          {renderPage()}

        </main>

      </div>

    </div>

  );

}

export default App;