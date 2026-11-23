import React, { useState } from "react";
import { Search, Eye, Trash2 } from "lucide-react";

function Orders() {

  const initialOrders = [
    {
      id: "ROS1001",
      customer: "Aisha Rahman",
      email: "aisha@gmail.com",
      product: "Blush Rose Bouquet",
      date: "23 Nov 2026",
      amount: 1499,
      payment: "Paid",
      status: "Delivered"
    },
    {
      id: "ROS1002",
      customer: "Sarah Thomas",
      email: "sarah@gmail.com",
      product: "Classic Red Roses",
      date: "23 Nov 2026",
      amount: 1299,
      payment: "Paid",
      status: "Processing"
    },
    {
      id: "ROS1003",
      customer: "Mariya Joseph",
      email: "mariya@gmail.com",
      product: "Pastel Dream Bouquet",
      date: "22 Nov 2026",
      amount: 1899,
      payment: "Pending",
      status: "Pending"
    },
    {
      id: "ROS1004",
      customer: "Ananya Nair",
      email: "ananya@gmail.com",
      product: "White Lily Elegance",
      date: "22 Nov 2026",
      amount: 1699,
      payment: "Paid",
      status: "Shipped"
    }
  ];

  const [orders, setOrders] = useState(() => {
  const saved = localStorage.getItem("roselleOrders");

  if (saved) {
    return JSON.parse(saved);
  }

  localStorage.setItem(
    "roselleOrders",
    JSON.stringify(initialOrders)
  );

  return initialOrders;
});

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [selectedOrder, setSelectedOrder] = useState(null);


  // Save orders

  const saveOrders = (updatedOrders) => {
  setOrders(updatedOrders);

  localStorage.setItem(
    "roselleOrders",
    JSON.stringify(updatedOrders)
  );

  window.dispatchEvent(new Event("dashboardUpdate"));
};


  // Update order status

  const updateStatus = (id, status) => {

    const updatedOrders = orders.map(order =>
      order.id === id
        ? { ...order, status }
        : order
    );

    saveOrders(updatedOrders);

    if (selectedOrder?.id === id) {
      setSelectedOrder({ ...selectedOrder, status });
    }

  };


  // Delete order

  const deleteOrder = (id) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this order?"
    );

    if (confirmDelete) {
      saveOrders(orders.filter(order => order.id !== id));
    }

  };


  // Search and filter

  const filteredOrders = orders.filter(order => {

    const matchesSearch =
      order.customer.toLowerCase().includes(search.toLowerCase()) ||
      order.id.toLowerCase().includes(search.toLowerCase());

    const matchesFilter =
      filter === "All" || order.status === filter;

    return matchesSearch && matchesFilter;

  });


  return (

    <div className="orders-page">

      <div className="page-heading">

        <div>
          <h1>Orders</h1>
          <p>Track and manage your customer orders.</p>
        </div>

      </div>


      {/* Order Statistics */}

      <div className="product-summary">

        <div className="summary-box">
          <span>Total Orders</span>
          <h2>{orders.length}</h2>
        </div>

        <div className="summary-box">
          <span>Processing</span>
          <h2>
            {orders.filter(o => o.status === "Processing").length}
          </h2>
        </div>

        <div className="summary-box">
          <span>Delivered</span>
          <h2>
            {orders.filter(o => o.status === "Delivered").length}
          </h2>
        </div>

        <div className="summary-box">
          <span>Pending</span>
          <h2>
            {orders.filter(o => o.status === "Pending").length}
          </h2>
        </div>

      </div>


      {/* Search and Filter */}

      <div className="product-toolbar">

        <div className="product-search">

          <Search size={19} />

          <input
            type="text"
            placeholder="Search customer or order ID..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />

        </div>


        <select
          value={filter}
          onChange={e => setFilter(e.target.value)}
        >

          <option value="All">All Orders</option>
          <option value="Pending">Pending</option>
          <option value="Processing">Processing</option>
          <option value="Shipped">Shipped</option>
          <option value="Delivered">Delivered</option>

        </select>

      </div>


      {/* Orders Table */}

      <div className="products-table-card">

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
                <th>ACTIONS</th>
              </tr>

            </thead>


            <tbody>

              {filteredOrders.map(order => (

                <tr key={order.id}>

                  <td>#{order.id}</td>

                  <td>{order.customer}</td>

                  <td>{order.product}</td>

                  <td>{order.date}</td>

                  <td>
                    ₹{order.amount.toLocaleString("en-IN")}
                  </td>

                  <td>
                    <span className={`status-badge ${order.payment.toLowerCase()}`}>
                      {order.payment}
                    </span>
                  </td>

                  <td>

                    <select
                      className="order-status-select"
                      value={order.status}
                      onChange={e =>
                        updateStatus(order.id, e.target.value)
                      }
                    >

                      <option>Pending</option>
                      <option>Processing</option>
                      <option>Shipped</option>
                      <option>Delivered</option>

                    </select>

                  </td>

                  <td>

                    <div className="product-actions">

                      <button
                        title="View order"
                        onClick={() => setSelectedOrder(order)}
                      >
                        <Eye size={17} />
                      </button>

                      <button
                        title="Delete order"
                        onClick={() => deleteOrder(order.id)}
                      >
                        <Trash2 size={17} />
                      </button>

                    </div>

                  </td>

                </tr>

              ))}


              {filteredOrders.length === 0 && (

                <tr>
                  <td colSpan="8" className="empty-message">
                    No orders found.
                  </td>
                </tr>

              )}

            </tbody>

          </table>

        </div>

      </div>


      {/* Order Details Modal */}

      {selectedOrder && (

        <div className="modal-overlay">

          <div className="product-modal">

            <div className="modal-header">

              <div>
                <h2>Order Details</h2>
                <p>#{selectedOrder.id}</p>
              </div>

              <button
                className="close-modal"
                onClick={() => setSelectedOrder(null)}
              >
                ×
              </button>

            </div>


            <div className="order-details">

              <p><strong>Customer:</strong> {selectedOrder.customer}</p>

              <p><strong>Email:</strong> {selectedOrder.email}</p>

              <p><strong>Product:</strong> {selectedOrder.product}</p>

              <p><strong>Date:</strong> {selectedOrder.date}</p>

              <p>
                <strong>Amount:</strong> ₹
                {selectedOrder.amount.toLocaleString("en-IN")}
              </p>

              <p><strong>Payment:</strong> {selectedOrder.payment}</p>

              <p><strong>Status:</strong> {selectedOrder.status}</p>

            </div>


            <button
              className="save-button"
              onClick={() => setSelectedOrder(null)}
            >
              Close
            </button>

          </div>

        </div>

      )}

    </div>

  );

}

export default Orders;