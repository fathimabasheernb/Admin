import React, { useState } from "react";

import {
  Store,
  User,
  Bell,
  Save
} from "lucide-react";


function Settings() {

  const defaultSettings = {
    storeName: "Roselle",
    description: "Flowers for every beautiful moment.",
    email: "roselle@example.com",
    phone: "9876543210",
    address: "Kerala, India",
    adminName: "Roselle Admin",
    currency: "INR",
    notifications: true,
    orderAlerts: true,
    customerAlerts: false
  };


  const [settings, setSettings] = useState(() => {

    const saved = localStorage.getItem("roselleSettings");

    return saved ? JSON.parse(saved) : defaultSettings;

  });


  const [message, setMessage] = useState("");


  // Handle input changes

  const handleChange = (e) => {

    const { name, value, type, checked } = e.target;

    setSettings({

      ...settings,

      [name]: type === "checkbox" ? checked : value

    });

  };


  // Save settings

  const handleSave = (e) => {

    e.preventDefault();

    localStorage.setItem(
      "roselleSettings",
      JSON.stringify(settings)
    );

    setMessage("Settings saved successfully! 🌷");

    setTimeout(() => {

      setMessage("");

    }, 3000);

  };


  return (

    <div className="settings-page">


      {/* Heading */}

      <div className="page-heading">

        <div>

          <h1>Settings</h1>

          <p>Manage your store and administrator preferences.</p>

        </div>

      </div>


      <form onSubmit={handleSave}>


        {/* Store Information */}

        <div className="settings-card">

          <div className="settings-card-heading">

            <div className="settings-icon">
              <Store size={21} />
            </div>

            <div>

              <h3>Store Information</h3>

              <p>Manage your Roselle boutique details.</p>

            </div>

          </div>


          <div className="settings-form-grid">


            <div className="settings-field">

              <label>Store Name</label>

              <input
                type="text"
                name="storeName"
                value={settings.storeName}
                onChange={handleChange}
                required
              />

            </div>


            <div className="settings-field">

              <label>Store Email</label>

              <input
                type="email"
                name="email"
                value={settings.email}
                onChange={handleChange}
                required
              />

            </div>


            <div className="settings-field">

              <label>Phone Number</label>

              <input
                type="tel"
                name="phone"
                value={settings.phone}
                onChange={handleChange}
              />

            </div>


            <div className="settings-field">

              <label>Store Address</label>

              <input
                type="text"
                name="address"
                value={settings.address}
                onChange={handleChange}
              />

            </div>


            <div className="settings-field full-width">

              <label>Store Description</label>

              <textarea
                name="description"
                value={settings.description}
                onChange={handleChange}
                rows="3"
              />

            </div>


            <div className="settings-field">

              <label>Currency</label>

              <select
                name="currency"
                value={settings.currency}
                onChange={handleChange}
              >

                <option value="INR">Indian Rupee (₹)</option>

                <option value="USD">US Dollar ($)</option>

                <option value="EUR">Euro (€)</option>

              </select>

            </div>


          </div>

        </div>


        {/* Admin Profile */}

        <div className="settings-card">

          <div className="settings-card-heading">

            <div className="settings-icon">
              <User size={21} />
            </div>

            <div>

              <h3>Administrator Profile</h3>

              <p>Manage your administrator information.</p>

            </div>

          </div>


          <div className="settings-field">

            <label>Admin Name</label>

            <input
              type="text"
              name="adminName"
              value={settings.adminName}
              onChange={handleChange}
            />

          </div>

        </div>


        {/* Notifications */}

        <div className="settings-card">

          <div className="settings-card-heading">

            <div className="settings-icon">
              <Bell size={21} />
            </div>

            <div>

              <h3>Notifications</h3>

              <p>Choose which notifications you want to receive.</p>

            </div>

          </div>


          <div className="notification-settings">


            <label className="notification-option">

              <div>

                <strong>General Notifications</strong>

                <p>Receive general store notifications.</p>

              </div>

              <input
                type="checkbox"
                name="notifications"
                checked={settings.notifications}
                onChange={handleChange}
              />

            </label>


            <label className="notification-option">

              <div>

                <strong>Order Alerts</strong>

                <p>Get notified about new customer orders.</p>

              </div>

              <input
                type="checkbox"
                name="orderAlerts"
                checked={settings.orderAlerts}
                onChange={handleChange}
              />

            </label>


            <label className="notification-option">

              <div>

                <strong>Customer Alerts</strong>

                <p>Get notified about customer activities.</p>

              </div>

              <input
                type="checkbox"
                name="customerAlerts"
                checked={settings.customerAlerts}
                onChange={handleChange}
              />

            </label>


          </div>

        </div>


        {/* Save Button */}

        <div className="settings-save-area">

          {message && (

            <span className="settings-success">
              {message}
            </span>

          )}

          <button
            type="submit"
            className="save-button"
          >

            <Save size={18} />

            Save Changes

          </button>

        </div>


      </form>

    </div>

  );

}


export default Settings;