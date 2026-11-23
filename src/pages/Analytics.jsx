import React, { useState, useEffect } from "react";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from "recharts";

import initialProducts from "../data/products";

function Analytics() {

  const [analytics, setAnalytics] = useState({
    products: [],
    orders: [],
    revenue: 0,
    totalOrders: 0,
    totalProducts: 0,
    categories: 0,
    monthlyRevenue: [],
    orderStatus: [],
    bestSelling: []
  });

  // Read actual data from localStorage

  const updateAnalytics = () => {

    const savedProducts = localStorage.getItem("roselleProducts");
    const savedOrders = localStorage.getItem("roselleOrders");
    const savedCategories = localStorage.getItem("roselleCategories");

    const products = savedProducts
      ? JSON.parse(savedProducts)
      : initialProducts;

    const orders = savedOrders
      ? JSON.parse(savedOrders)
      : [];

    const categories = savedCategories
      ? JSON.parse(savedCategories)
      : [];

    // Total revenue from paid orders

    const paidOrders = orders.filter(
      order => order.payment === "Paid"
    );

    const revenue = paidOrders.reduce(
      (total, order) => total + Number(order.amount || 0),
      0
    );

    // Total categories

    const categoryNames = [
      ...products.map(product =>
        typeof product.category === "object"
          ? product.category?.name
          : product.category
      ),
      ...categories.map(category =>
        typeof category === "object"
          ? category?.name
          : category
      )
    ].filter(Boolean);

    const uniqueCategories = [
      ...new Set(
        categoryNames.map(category => category.toLowerCase())
      )
    ];

    // Monthly revenue

    const months = [
      "Jan", "Feb", "Mar", "Apr",
      "May", "Jun", "Jul", "Aug",
      "Sep", "Oct", "Nov", "Dec"
    ];

    const monthlyRevenue = months.map((month, index) => {

      const monthRevenue = paidOrders
        .filter(order => {

          const date = new Date(order.date);

          if (!isNaN(date.getTime())) {
            return date.getMonth() === index;
          }

          const parts = order.date?.split(" ");

          if (parts?.length === 3) {
            return parts[1]?.startsWith(month);
          }

          return false;

        })
        .reduce(
          (total, order) => total + Number(order.amount || 0),
          0
        );

      return {
        month,
        revenue: monthRevenue
      };

    });

    // Order status statistics

    const statusNames = [
      "Pending",
      "Processing",
      "Shipped",
      "Delivered"
    ];

    const orderStatus = statusNames.map(status => ({
      name: status,
      value: orders.filter(
        order => order.status === status
      ).length
    }));

    // Best-selling products
    // Based on how often each product appears in orders

    const productSales = {};

    orders.forEach(order => {

      const productName = order.product;

      if (productName) {
        productSales[productName] =
          (productSales[productName] || 0) + 1;
      }

    });

    const bestSelling = Object.entries(productSales)
      .map(([name, sales]) => ({
        name,
        sales
      }))
      .sort((a, b) => b.sales - a.sales)
      .slice(0, 5);

    setAnalytics({

      products,
      orders,
      revenue,
      totalOrders: orders.length,
      totalProducts: products.length,
      categories: uniqueCategories.length,
      monthlyRevenue,
      orderStatus,
      bestSelling

    });

  };

  // Automatically refresh analytics

  useEffect(() => {

    updateAnalytics();

    window.addEventListener(
      "dashboardUpdate",
      updateAnalytics
    );

    window.addEventListener(
      "storage",
      updateAnalytics
    );

    return () => {

      window.removeEventListener(
        "dashboardUpdate",
        updateAnalytics
      );

      window.removeEventListener(
        "storage",
        updateAnalytics
      );

    };

  }, []);

  const COLORS = [
    "#e8a0ad",
    "#b9a0d1",
    "#f4c58a",
    "#9fc9b0"
  ];

  return (

    <div className="analytics-page">

      {/* Heading */}

      <div className="page-heading">

        <div>
          <h1>Analytics</h1>
          <p>
            Track your Roselle store performance and business growth.
          </p>
        </div>

      </div>


      {/* Statistics Cards */}

      <div className="product-summary">

        <div className="summary-box">
          <span>Total Revenue</span>
          <h2>
            ₹{analytics.revenue.toLocaleString("en-IN")}
          </h2>
        </div>

        <div className="summary-box">
          <span>Total Orders</span>
          <h2>{analytics.totalOrders}</h2>
        </div>

        <div className="summary-box">
          <span>Total Products</span>
          <h2>{analytics.totalProducts}</h2>
        </div>

        <div className="summary-box">
          <span>Total Categories</span>
          <h2>{analytics.categories}</h2>
        </div>

      </div>


      {/* Revenue Chart */}

      <div className="analytics-grid">

        <div className="analytics-card">

          <div className="analytics-card-heading">
            <h2>Revenue Overview</h2>
            <p>Monthly revenue from paid orders</p>
          </div>

          <div style={{ width: "100%", height: 300 }}>

            <ResponsiveContainer width="100%" height="100%">

              <BarChart data={analytics.monthlyRevenue}>

                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                />

                <XAxis dataKey="month" />

                <YAxis />

                <Tooltip
                  formatter={(value) =>
                    `₹${Number(value).toLocaleString("en-IN")}`
                  }
                />

                <Bar
                  dataKey="revenue"
                  fill="#d88b9b"
                  radius={[6, 6, 0, 0]}
                />

              </BarChart>

            </ResponsiveContainer>

          </div>

        </div>


        {/* Order Status Chart */}

        <div className="analytics-card">

          <div className="analytics-card-heading">
            <h2>Order Status</h2>
            <p>Current order distribution</p>
          </div>

          <div style={{ width: "100%", height: 300 }}>

            <ResponsiveContainer width="100%" height="100%">

              <PieChart>

                <Pie
                  data={analytics.orderStatus}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={95}
                  label
                >

                  {analytics.orderStatus.map((entry, index) => (

                    <Cell
                      key={entry.name}
                      fill={COLORS[index % COLORS.length]}
                    />

                  ))}

                </Pie>

                <Tooltip />

                <Legend />

              </PieChart>

            </ResponsiveContainer>

          </div>

        </div>

      </div>


      {/* Best Selling Products */}

      <div className="analytics-card best-selling-card">

        <div className="analytics-card-heading">
          <h2>Best-Selling Products</h2>
          <p>Products appearing most frequently in orders</p>
        </div>

        {analytics.bestSelling.length > 0 ? (

          <div className="best-selling-list">

            {analytics.bestSelling.map((product, index) => (

              <div
                className="best-selling-item"
                key={product.name}
              >

                <div className="best-selling-number">
                  {index + 1}
                </div>

                <div className="best-selling-info">
                  <h4>{product.name}</h4>
                  <p>{product.sales} orders</p>
                </div>

              </div>

            ))}

          </div>

        ) : (

          <p className="empty-message">
            No sales data available yet.
          </p>

        )}

      </div>

    </div>

  );

}

export default Analytics;
