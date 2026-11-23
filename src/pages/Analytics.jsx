import React from "react";

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


function Analytics() {

  const revenueData = [
    { month: "Jan", revenue: 12000 },
    { month: "Feb", revenue: 18000 },
    { month: "Mar", revenue: 15000 },
    { month: "Apr", revenue: 25000 },
    { month: "May", revenue: 22000 },
    { month: "Jun", revenue: 32000 },
    { month: "Jul", revenue: 28000 }
  ];


  const categoryData = [
    { name: "Rose Bouquets", value: 45 },
    { name: "Mixed Flowers", value: 25 },
    { name: "Lilies", value: 20 },
    { name: "Other Flowers", value: 10 }
  ];


  const bestSelling = [
    {
      name: "Blush Rose Bouquet",
      sales: 85,
      revenue: 127415
    },
    {
      name: "Classic Red Roses",
      sales: 72,
      revenue: 93528
    },
    {
      name: "Pastel Dream Bouquet",
      sales: 58,
      revenue: 110142
    },
    {
      name: "White Lily Elegance",
      sales: 42,
      revenue: 71358
    }
  ];


  const COLORS = [
    "#C77D94",
    "#E6A8B8",
    "#A76D83",
    "#F0C6D2"
  ];


  return (

    <div className="analytics-page">


      {/* Heading */}

      <div className="page-heading">

        <div>

          <h1>Analytics</h1>

          <p>Understand your store's performance and growth.</p>

        </div>

        <select className="analytics-filter">

          <option>Last 7 Months</option>

          <option>Last 30 Days</option>

          <option>Last 12 Months</option>

        </select>

      </div>


      {/* Statistics */}

      <div className="product-summary">


        <div className="summary-box">

          <span>Total Revenue</span>

          <h2>₹1,52,000</h2>

          <small>+12.5% from last period</small>

        </div>


        <div className="summary-box">

          <span>Total Sales</span>

          <h2>257</h2>

          <small>+8.4% from last period</small>

        </div>


        <div className="summary-box">

          <span>Average Order Value</span>

          <h2>₹1,480</h2>

          <small>+5.2% from last period</small>

        </div>


        <div className="summary-box">

          <span>Conversion Rate</span>

          <h2>4.8%</h2>

          <small>+2.1% from last period</small>

        </div>


      </div>


      {/* Revenue Chart */}

      <div className="analytics-chart-card">

        <div className="chart-header">

          <div>

            <h3>Revenue Overview</h3>

            <p>Monthly revenue performance</p>

          </div>

        </div>


        <div className="analytics-chart">

          <ResponsiveContainer width="100%" height={320}>

            <BarChart data={revenueData}>

              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
              />

              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
              />

              <YAxis
                axisLine={false}
                tickLine={false}
              />

              <Tooltip />

              <Bar
                dataKey="revenue"
                fill="#C77D94"
                radius={[8, 8, 0, 0]}
                barSize={40}
              />

            </BarChart>

          </ResponsiveContainer>

        </div>

      </div>


      {/* Category Chart */}

      <div className="analytics-bottom-grid">


        <div className="analytics-chart-card">

          <h3>Sales by Category</h3>

          <p>Product category distribution</p>


          <ResponsiveContainer width="100%" height={280}>

            <PieChart>

              <Pie
                data={categoryData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={95}
                innerRadius={55}
                paddingAngle={4}
              >

                {categoryData.map((entry, index) => (

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


        {/* Best Selling Products */}

        <div className="analytics-chart-card">

          <h3>Best Selling Products</h3>

          <p>Your most popular floral arrangements</p>


          <div className="best-selling-list">

            {bestSelling.map((product, index) => (

              <div
                className="best-selling-item"
                key={product.name}
              >

                <div className="selling-rank">
                  {index + 1}
                </div>

                <div className="selling-details">

                  <h4>{product.name}</h4>

                  <p>{product.sales} items sold</p>

                </div>

                <strong>
                  ₹{product.revenue.toLocaleString("en-IN")}
                </strong>

              </div>

            ))}

          </div>

        </div>


      </div>

    </div>

  );

}


export default Analytics;