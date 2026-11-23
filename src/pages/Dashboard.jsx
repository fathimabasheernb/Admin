import React from "react";

import StatCard from "../components/StatCard";
import SalesChart from "../components/SalesChart";
import RecentOrders from "../components/RecentOrders";


function Dashboard() {

  return (

    <div className="dashboard-page">

      {/* Welcome Section */}

      <div className="welcome-section">

        <div>
          <h1>Welcome back, Admin! 🌷</h1>

          <p>
            Here's what's happening with your Roselle store today.
          </p>
        </div>

        <div className="welcome-date">
          Monday, November 23, 2026
        </div>

      </div>


      {/* Statistics Cards */}

      <div className="stats-grid">

        <StatCard
          title="Total Products"
          value="125"
          change="+12.5%"
          icon="products"
          color="pink"
        />

        <StatCard
          title="Total Revenue"
          value="₹48,250"
          change="+8.2%"
          icon="revenue"
          color="purple"
        />

        <StatCard
          title="Total Orders"
          value="86"
          change="+15.3%"
          icon="orders"
          color="orange"
        />

        <StatCard
          title="Categories"
          value="12"
          change="+2 new"
          icon="categories"
          color="green"
        />

      </div>


      {/* Sales Chart */}

      <div className="dashboard-chart">

        <SalesChart />

      </div>


      {/* Recent Orders */}

      <div className="dashboard-orders">

        <RecentOrders />

      </div>

    </div>

  );

}

export default Dashboard;