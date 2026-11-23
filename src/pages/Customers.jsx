import React, { useState } from "react";

import {
  Search,
  Eye,
  Trash2,
  CheckCircle,
  Ban
} from "lucide-react";


function Customers() {

  const initialCustomers = [
    {
      id: 1,
      name: "Aisha Rahman",
      email: "aisha@gmail.com",
      phone: "9876543210",
      orders: 5,
      spent: 7495,
      status: "Approved"
    },
    {
      id: 2,
      name: "Sarah Thomas",
      email: "sarah@gmail.com",
      phone: "9876543211",
      orders: 3,
      spent: 3899,
      status: "Pending"
    },
    {
      id: 3,
      name: "Mariya Joseph",
      email: "mariya@gmail.com",
      phone: "9876543212",
      orders: 8,
      spent: 12450,
      status: "Approved"
    },
    {
      id: 4,
      name: "Ananya Nair",
      email: "ananya@gmail.com",
      phone: "9876543213",
      orders: 2,
      spent: 2998,
      status: "Blocked"
    },
    {
      id: 5,
      name: "Diya Menon",
      email: "diya@gmail.com",
      phone: "9876543214",
      orders: 4,
      spent: 5600,
      status: "Pending"
    }
  ];


  const [customers, setCustomers] = useState(() => {

    const saved = localStorage.getItem("roselleCustomers");

    return saved ? JSON.parse(saved) : initialCustomers;

  });


  const [search, setSearch] = useState("");

  const [filter, setFilter] = useState("All");

  const [selectedCustomer, setSelectedCustomer] = useState(null);


  // Save customers

  const saveCustomers = (updatedCustomers) => {

    setCustomers(updatedCustomers);

    localStorage.setItem(
      "roselleCustomers",
      JSON.stringify(updatedCustomers)
    );

  };


  // Approve or block customers

  const updateStatus = (id, status) => {

    const updatedCustomers = customers.map(customer =>

      customer.id === id
        ? { ...customer, status }
        : customer

    );

    saveCustomers(updatedCustomers);

  };


  // Delete customer

  const deleteCustomer = (id) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this customer?"
    );

    if (confirmDelete) {

      saveCustomers(
        customers.filter(customer => customer.id !== id)
      );

    }

  };


  // Search and filter

  const filteredCustomers = customers.filter(customer => {

    const matchesSearch =
      customer.name.toLowerCase().includes(search.toLowerCase()) ||
      customer.email.toLowerCase().includes(search.toLowerCase());

    const matchesFilter =
      filter === "All" || customer.status === filter;

    return matchesSearch && matchesFilter;

  });


  return (

    <div className="customers-page">


      {/* Page Heading */}

      <div className="page-heading">

        <div>

          <h1>Customers</h1>

          <p>Manage your Roselle customer accounts.</p>

        </div>

      </div>


      {/* Customer Statistics */}

      <div className="product-summary">

        <div className="summary-box">

          <span>Total Customers</span>

          <h2>{customers.length}</h2>

        </div>


        <div className="summary-box">

          <span>Approved</span>

          <h2>
            {customers.filter(c => c.status === "Approved").length}
          </h2>

        </div>


        <div className="summary-box">

          <span>Pending Approval</span>

          <h2>
            {customers.filter(c => c.status === "Pending").length}
          </h2>

        </div>


        <div className="summary-box">

          <span>Blocked</span>

          <h2>
            {customers.filter(c => c.status === "Blocked").length}
          </h2>

        </div>

      </div>


      {/* Search and Filter */}

      <div className="product-toolbar">

        <div className="product-search">

          <Search size={19} />

          <input

            type="text"

            placeholder="Search customer name or email..."

            value={search}

            onChange={e => setSearch(e.target.value)}

          />

        </div>


        <select

          value={filter}

          onChange={e => setFilter(e.target.value)}

        >

          <option value="All">All Customers</option>

          <option value="Approved">Approved</option>

          <option value="Pending">Pending</option>

          <option value="Blocked">Blocked</option>

        </select>

      </div>


      {/* Customers Table */}

      <div className="products-table-card">

        <div className="table-container">

          <table>

            <thead>

              <tr>

                <th>CUSTOMER</th>

                <th>PHONE</th>

                <th>ORDERS</th>

                <th>TOTAL SPENT</th>

                <th>STATUS</th>

                <th>ACTIONS</th>

              </tr>

            </thead>


            <tbody>

              {filteredCustomers.map(customer => (

                <tr key={customer.id}>

                  <td>

                    <div className="product-info">

                      <div className="customer-avatar">

                        {customer.name.charAt(0)}

                      </div>

                      <div>

                        <strong>{customer.name}</strong>

                        <p>{customer.email}</p>

                      </div>

                    </div>

                  </td>


                  <td>{customer.phone}</td>


                  <td>{customer.orders}</td>


                  <td>

                    ₹{customer.spent.toLocaleString("en-IN")}

                  </td>


                  <td>

                    <span className={`status-badge ${customer.status.toLowerCase()}`}>

                      {customer.status}

                    </span>

                  </td>


                  <td>

                    <div className="product-actions">

                      <button

                        title="View customer"

                        onClick={() => setSelectedCustomer(customer)}

                      >

                        <Eye size={17} />

                      </button>


                      {customer.status === "Pending" && (

                        <button

                          title="Approve customer"

                          onClick={() => updateStatus(customer.id, "Approved")}

                        >

                          <CheckCircle size={17} />

                        </button>

                      )}


                      {customer.status !== "Blocked" && (

                        <button

                          title="Block customer"

                          onClick={() => {

                            const confirmBlock = window.confirm(
                              "Are you sure you want to block this customer?"
                            );

                            if (confirmBlock) {
                              updateStatus(customer.id, "Blocked");
                            }

                          }}

                        >

                          <Ban size={17} />

                        </button>

                      )}


                      {customer.status === "Blocked" && (

                        <button

                          title="Unblock customer"

                          onClick={() => updateStatus(customer.id, "Approved")}

                        >

                          <CheckCircle size={17} />

                        </button>

                      )}


                      <button

                        title="Delete customer"

                        onClick={() => deleteCustomer(customer.id)}

                      >

                        <Trash2 size={17} />

                      </button>

                    </div>

                  </td>

                </tr>

              ))}


              {filteredCustomers.length === 0 && (

                <tr>

                  <td colSpan="6" className="empty-message">

                    No customers found.

                  </td>

                </tr>

              )}

            </tbody>

          </table>

        </div>

      </div>


      {/* Customer Details Modal */}

      {selectedCustomer && (

        <div className="modal-overlay">

          <div className="product-modal">

            <div className="modal-header">

              <div>

                <h2>Customer Details</h2>

                <p>Customer information</p>

              </div>


              <button

                className="close-modal"

                onClick={() => setSelectedCustomer(null)}

              >

                ×

              </button>

            </div>


            <div className="order-details">

              <p><strong>Name:</strong> {selectedCustomer.name}</p>

              <p><strong>Email:</strong> {selectedCustomer.email}</p>

              <p><strong>Phone:</strong> {selectedCustomer.phone}</p>

              <p><strong>Total Orders:</strong> {selectedCustomer.orders}</p>

              <p>
                <strong>Total Spent:</strong> ₹
                {selectedCustomer.spent.toLocaleString("en-IN")}
              </p>

              <p><strong>Account Status:</strong> {selectedCustomer.status}</p>

            </div>


            <button

              className="save-button"

              onClick={() => setSelectedCustomer(null)}

            >

              Close

            </button>

          </div>

        </div>

      )}

    </div>

  );

}


export default Customers;