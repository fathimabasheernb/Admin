import React, { useState, useEffect } from "react";

import StatCard from "../components/StatCard";
import SalesChart from "../components/SalesChart";
import RecentOrders from "../components/RecentOrders";

function Dashboard() {

  const [stats, setStats] = useState({
    products: 0,
    revenue: 0,
    orders: 0,
    categories: 0
  });

  const updateDashboard = () => {

    const products = JSON.parse(
      localStorage.getItem("roselleProducts") || "[]"
    );

    const categories = JSON.parse(
      localStorage.getItem("roselleCategories") || "[]"
    );

    const orders = JSON.parse(
      localStorage.getItem("roselleOrders") || "[]"
    );

    const uniqueCategories = new Set([
      ...categories.map((cat) =>
        typeof cat === "object" ? cat.name : cat
      ),
      ...products.map((product) =>
        typeof product.category === "object"
          ? product.category?.name
          : product.category
      )
    ].filter(Boolean));

    const totalRevenue = orders
      .filter((order) => order.payment === "Paid")
      .reduce(
        (total, order) =>
          total + Number(order.amount || 0),
        0
      );

    setStats({
      products: products.length,
      revenue: totalRevenue,
      orders: orders.length,
      categories: uniqueCategories.size
    });

  };


  useEffect(() => {

    updateDashboard();

    window.addEventListener("storage", updateDashboard);
    window.addEventListener("dashboardUpdate", updateDashboard);

    return () => {
      window.removeEventListener("storage", updateDashboard);
      window.removeEventListener("dashboardUpdate", updateDashboard);
    };

  }, []);


  return (

    <div className="dashboard-page">

      <div className="welcome-section">

        <div>
          <h1>Welcome back, Fathima! 🌷</h1>

          <p>
            Here's what's happening with your Roselle store today.
          </p>
        </div>

        <div className="welcome-date">
          Monday, November 23, 2026
        </div>

      </div>


      <div className="stats-grid">

        <StatCard
          title="Total Products"
          value={stats.products}
          icon="products"
          color="pink"
        />

        <StatCard
          title="Total Revenue"
          value={`₹${stats.revenue.toLocaleString("en-IN")}`}
          icon="revenue"
          color="purple"
        />

        <StatCard
          title="Total Orders"
          value={stats.orders}
          icon="orders"
          color="orange"
        />

        <StatCard
          title="Categories"
          value={stats.categories}
          icon="categories"
          color="green"
        />

      </div>


      <div className="dashboard-chart">
        <SalesChart />
      </div>


      <div className="dashboard-orders">
        <RecentOrders />
      </div>

    </div>

  );

}

export default Dashboard;