import React, { useState } from "react";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";


function SalesChart() {

  const [chartType, setChartType] = useState("revenue");


  const data = [
    { day: "Mon", revenue: 12000, orders: 18 },
    { day: "Tue", revenue: 18000, orders: 25 },
    { day: "Wed", revenue: 14000, orders: 21 },
    { day: "Thu", revenue: 22000, orders: 32 },
    { day: "Fri", revenue: 19000, orders: 28 },
    { day: "Sat", revenue: 28000, orders: 40 },
    { day: "Sun", revenue: 16000, orders: 23 }
  ];


  return (

    <div className="chart-card">

      <div className="chart-header">

        <div>
          <h3>Performance Overview</h3>
          <p>Daily store performance over the last 7 days</p>
        </div>


        <div className="chart-tabs">

          <button
            className={chartType === "revenue" ? "selected" : ""}
            onClick={() => setChartType("revenue")}
          >
            Revenue
          </button>


          <button
            className={chartType === "orders" ? "selected" : ""}
            onClick={() => setChartType("orders")}
          >
            Orders
          </button>

        </div>

      </div>


      <div className="chart-container">

        <ResponsiveContainer width="100%" height={300}>

          <BarChart data={data}>

            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
            />

            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
            />

            <YAxis
              axisLine={false}
              tickLine={false}
            />

            <Tooltip />

            <Bar
              dataKey={chartType}
              fill="#C77D94"
              radius={[8, 8, 0, 0]}
              barSize={35}
            />

          </BarChart>

        </ResponsiveContainer>

      </div>

    </div>

  );

}

export default SalesChart;