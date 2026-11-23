import React from "react";

function RecentOrders() {

  const orders = [
    {
      id: "#ROS1001",
      customer: "Aisha Rahman",
      product: "Blush Rose Bouquet",
      date: "23 Nov 2026",
      amount: "₹1,499",
      payment: "Paid",
      status: "Delivered"
    },
    {
      id: "#ROS1002",
      customer: "Sarah Thomas",
      product: "Classic Red Roses",
      date: "23 Nov 2026",
      amount: "₹1,299",
      payment: "Paid",
      status: "Processing"
    },
    {
      id: "#ROS1003",
      customer: "Mariya Joseph",
      product: "Pastel Dream Bouquet",
      date: "22 Nov 2026",
      amount: "₹1,899",
      payment: "Pending",
      status: "Pending"
    },
    {
      id: "#ROS1004",
      customer: "Ananya Nair",
      product: "White Lily Elegance",
      date: "22 Nov 2026",
      amount: "₹1,699",
      payment: "Paid",
      status: "Shipped"
    }
  ];

  return (

    <div className="orders-card">

      <div className="orders-header">

        <div>
          <h3>Recent Orders</h3>
          <p>Latest orders from your customers</p>
        </div>

        <button className="view-all-button">
          View All →
        </button>

      </div>


      <div className="table-container">

        <table>

          <thead>
            <tr>
              <th>ORDER ID</th>
              <th>CUSTOMER</th>
              <th>PRODUCT</th>
              <th>DATE</th>
              <th>AMOUNT</th>
              <th>PAYMENT</th>
              <th>STATUS</th>
            </tr>
          </thead>


          <tbody>

            {orders.map((order) => (

              <tr key={order.id}>

                <td>{order.id}</td>

                <td>{order.customer}</td>

                <td>{order.product}</td>

                <td>{order.date}</td>

                <td>{order.amount}</td>

                <td>
                  <span className={`status-badge ${order.payment.toLowerCase()}`}>
                    {order.payment}
                  </span>
                </td>

                <td>
                  <span className={`status-badge ${order.status.toLowerCase()}`}>
                    {order.status}
                  </span>
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>

  );

}

export default RecentOrders;