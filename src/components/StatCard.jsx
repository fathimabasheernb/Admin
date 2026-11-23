import React from "react";

import {
  Package,
  IndianRupee,
  ShoppingCart,
  Layers
} from "lucide-react";

function StatCard({ title, value, change, icon, color }) {

  const icons = {
    products: Package,
    revenue: IndianRupee,
    orders: ShoppingCart,
    categories: Layers
  };

  const Icon = icons[icon];

  return (

    <div className="stat-card">

      <div className="stat-card-top">

        <div className={`stat-icon ${color}`}>
          <Icon size={21} />
        </div>

        <span className="stat-title">
          {title}
        </span>

      </div>


      <h2 className="stat-value">
        {value}
      </h2>


      <div className="stat-card-bottom">

        <span className="stat-change">
          ↗ {change}
        </span>

        <span className="stat-period">
          Last 7 days
        </span>

      </div>

    </div>

  );

}

export default StatCard;