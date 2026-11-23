import React, { useState } from "react";

import {
  Users,
  ShieldCheck,
  UserPlus,
  Search,
  Pencil,
  Trash2,
  X,
  Plus,
  Briefcase,
  CheckCircle,
  Clock
} from "lucide-react";

const permissionsList = [
  "Dashboard",
  "Products",
  "Orders",
  "Customers",
  "Analytics",
  "Staff",
  "Settings"
];

const defaultRoles = [
  {
    id: 1,
    name: "Super Admin",
    description: "Complete dashboard access",
    permissions: permissionsList
  },
  {
    id: 2,
    name: "Manager",
    description: "Manage daily store operations",
    permissions: ["Dashboard", "Products", "Orders", "Customers"]
  },
  {
    id: 3,
    name: "Product Manager",
    description: "Manage products and categories",
    permissions: ["Dashboard", "Products"]
  },
  {
    id: 4,
    name: "Order Manager",
    description: "Manage customer orders",
    permissions: ["Dashboard", "Orders", "Customers"]
  },
  {
    id: 5,
    name: "Customer Support",
    description: "Handle customer enquiries",
    permissions: ["Dashboard", "Customers", "Orders"]
  }
];

const defaultStaff = [
  {
    id: 1,
    name: "Aisha Rahman",
    email: "aisha@gmail.com",
    phone: "9876543210",
    role: "Manager",
    status: "Active",
    joined: "12 Jan 2026"
  },
  {
    id: 2,
    name: "Sara Thomas",
    email: "sara@gmail.com",
    phone: "9876543211",
    role: "Product Manager",
    status: "Active",
    joined: "15 Feb 2026"
  },
  {
    id: 3,
    name: "Maya Joseph",
    email: "maya@gmail.com",
    phone: "9876543212",
    role: "Order Manager",
    status: "Active",
    joined: "20 Mar 2026"
  },
  {
    id: 4,
    name: "Ananya Das",
    email: "ananya@gmail.com",
    phone: "9876543213",
    role: "Customer Support",
    status: "Inactive",
    joined: "05 Apr 2026"
  }
];

function Staff() {

  const [activeTab, setActiveTab] = useState("staff");

  const [staff, setStaff] = useState(() => {
    return JSON.parse(localStorage.getItem("roselleStaff") || "null") || defaultStaff;
  });

  const [roles, setRoles] = useState(() => {
    return JSON.parse(localStorage.getItem("roselleRoles") || "null") || defaultRoles;
  });

  const [search, setSearch] = useState("");

  const [showStaffModal, setShowStaffModal] = useState(false);
  const [showRoleModal, setShowRoleModal] = useState(false);

  const [editingStaff, setEditingStaff] = useState(null);
  const [editingRole, setEditingRole] = useState(null);

  const [staffForm, setStaffForm] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
    status: "Active"
  });

  const [roleForm, setRoleForm] = useState({
    name: "",
    description: "",
    permissions: []
  });

  const [alert, setAlert] = useState("");

  const saveStaff = (data) => {
    setStaff(data);
    localStorage.setItem("roselleStaff", JSON.stringify(data));
  };

  const saveRoles = (data) => {
    setRoles(data);
    localStorage.setItem("roselleRoles", JSON.stringify(data));
  };

  const openStaffModal = (member = null) => {

    setEditingStaff(member);

    setStaffForm(member ? { ...member } : {
      name: "",
      email: "",
      phone: "",
      role: roles[0]?.name || "",
      status: "Active"
    });

    setShowStaffModal(true);
  };

  const handleStaffSubmit = (e) => {

    e.preventDefault();

    let updated;

    if (editingStaff) {
      updated = staff.map((s) =>
        s.id === editingStaff.id ? { ...staffForm, id: s.id, joined: s.joined } : s
      );
    } else {
      updated = [
        ...staff,
        {
          ...staffForm,
          id: Date.now(),
          joined: new Date().toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric"
          })
        }
      ];
    }

    saveStaff(updated);
    setShowStaffModal(false);
  };

  const deleteStaff = (id) => {

    if (window.confirm("Are you sure you want to delete this staff member?")) {
      saveStaff(staff.filter((s) => s.id !== id));
    }
  };

  const openRoleModal = (role = null) => {

    setEditingRole(role);

    setRoleForm(role ? { ...role, permissions: [...role.permissions] } : {
      name: "",
      description: "",
      permissions: []
    });

    setShowRoleModal(true);
  };

  const handleRoleSubmit = (e) => {

    e.preventDefault();

    let updated;

    if (editingRole) {
      updated = roles.map((r) =>
        r.id === editingRole.id ? { ...roleForm, id: r.id } : r
      );

      if (editingRole.name !== roleForm.name) {
        const updatedStaff = staff.map((s) =>
          s.role === editingRole.name ? { ...s, role: roleForm.name } : s
        );

        saveStaff(updatedStaff);
      }

    } else {
      updated = [
        ...roles,
        { ...roleForm, id: Date.now() }
      ];
    }

    saveRoles(updated);
    setShowRoleModal(false);
  };

  const deleteRole = (role) => {

    if (role.name === "Super Admin") {
      setAlert("The Super Admin role cannot be deleted.");
      return;
    }

    if (staff.some((s) => s.role === role.name)) {
      setAlert("This role is assigned to staff members. Reassign them before deleting.");
      return;
    }

    if (window.confirm(`Delete ${role.name} role?`)) {
      saveRoles(roles.filter((r) => r.id !== role.id));
    }
  };

  const togglePermission = (permission) => {

    setRoleForm((prev) => ({
      ...prev,
      permissions: prev.permissions.includes(permission)
        ? prev.permissions.filter((p) => p !== permission)
        : [...prev.permissions, permission]
    }));
  };

  const toggleStatus = (member) => {

    const updated = staff.map((s) =>
      s.id === member.id
        ? { ...s, status: s.status === "Active" ? "Inactive" : "Active" }
        : s
    );

    saveStaff(updated);
  };

  const filteredStaff = staff.filter((s) =>
    `${s.name} ${s.email} ${s.role}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (

    <div className="staff-page">

      <div className="staff-heading">

        <div>
          <h1>Staff Management</h1>
          <p>Manage your team, roles and permissions.</p>
        </div>

        <button
          className="staff-add-button"
          onClick={() =>
            activeTab === "staff"
              ? openStaffModal()
              : openRoleModal()
          }
        >
          <Plus size={18} />
          {activeTab === "staff" ? "Add Staff" : "Create Role"}
        </button>

      </div>

      <div className="staff-stats">

        <div className="staff-stat-card">
          <div className="stat-icon"><Users /></div>
          <p>Total Staff</p>
          <h2>{staff.length}</h2>
        </div>

        <div className="staff-stat-card">
          <div className="stat-icon"><CheckCircle /></div>
          <p>Active Staff</p>
          <h2>{staff.filter(s => s.status === "Active").length}</h2>
        </div>

        <div className="staff-stat-card">
          <div className="stat-icon"><ShieldCheck /></div>
          <p>Total Roles</p>
          <h2>{roles.length}</h2>
        </div>

        <div className="staff-stat-card">
          <div className="stat-icon"><Clock /></div>
          <p>Inactive Staff</p>
          <h2>{staff.filter(s => s.status === "Inactive").length}</h2>
        </div>

      </div>

      <div className="staff-tabs">

        <button
          className={activeTab === "staff" ? "active" : ""}
          onClick={() => setActiveTab("staff")}
        >
          <Users size={18} /> Staff Members
        </button>

        <button
          className={activeTab === "roles" ? "active" : ""}
          onClick={() => setActiveTab("roles")}
        >
          <ShieldCheck size={18} /> Manage Roles
        </button>

      </div>

      {activeTab === "staff" ? (

        <div className="staff-content">

          <div className="staff-toolbar">

            <h3>All Staff Members</h3>

            <div className="staff-search">
              <Search size={18} />
              <input
                placeholder="Search staff..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

          </div>

          <div className="staff-table-wrapper">

            <table className="staff-table">

              <thead>
                <tr>
                  <th>EMPLOYEE</th>
                  <th>EMAIL</th>
                  <th>PHONE</th>
                  <th>ROLE</th>
                  <th>STATUS</th>
                  <th>JOINED</th>
                  <th>ACTIONS</th>
                </tr>
              </thead>

              <tbody>

                {filteredStaff.map((member) => (

                  <tr key={member.id}>

                    <td>
                      <div className="staff-person">
                        <div className="staff-avatar">
                          {member.name.charAt(0)}
                        </div>
                        <strong>{member.name}</strong>
                      </div>
                    </td>

                    <td>{member.email}</td>
                    <td>{member.phone}</td>

                    <td>
                      <span className="role-badge">
                        {member.role}
                      </span>
                    </td>

                    <td>
                      <button
                        className={`status-badge ${member.status.toLowerCase()}`}
                        onClick={() => toggleStatus(member)}
                      >
                        {member.status}
                      </button>
                    </td>

                    <td>{member.joined}</td>

                    <td>
                      <div className="staff-actions">

                        <button onClick={() => openStaffModal(member)}>
                          <Pencil size={17} />
                        </button>

                        <button onClick={() => deleteStaff(member.id)}>
                          <Trash2 size={17} />
                        </button>

                      </div>
                    </td>

                  </tr>

                ))}

                {filteredStaff.length === 0 && (
                  <tr>
                    <td colSpan="7" className="staff-empty">
                      No staff members found.
                    </td>
                  </tr>
                )}

              </tbody>

            </table>

          </div>

        </div>

      ) : (

        <div className="roles-content">

          <div className="roles-heading">
            <div>
              <h3>Available Roles</h3>
              <p>Create and customize employee permissions.</p>
            </div>
          </div>

          <div className="roles-grid">

            {roles.map((role) => (

              <div className="role-card" key={role.id}>

                <div className="role-card-top">

                  <div className="role-icon">
                    <Briefcase size={22} />
                  </div>

                  <div className="role-actions">

                    <button onClick={() => openRoleModal(role)}>
                      <Pencil size={17} />
                    </button>

                    <button onClick={() => deleteRole(role)}>
                      <Trash2 size={17} />
                    </button>

                  </div>

                </div>

                <h3>{role.name}</h3>

                <p>{role.description}</p>

                <div className="role-members">
                  <Users size={16} />
                  {staff.filter(s => s.role === role.name).length} Members
                </div>

                <div className="role-permissions">

                  <strong>Permissions</strong>

                  <div>
                    {role.permissions.map((permission) => (
                      <span key={permission}>{permission}</span>
                    ))}
                  </div>

                </div>

              </div>

            ))}

          </div>

        </div>

      )}

      {showStaffModal && (

        <div className="staff-modal-overlay">

          <div className="staff-modal">

            <div className="modal-heading">
              <div>
                <h2>{editingStaff ? "Edit Staff" : "Add New Staff"}</h2>
                <p>Enter employee details below.</p>
              </div>

              <button onClick={() => setShowStaffModal(false)}>
                <X />
              </button>
            </div>

            <form onSubmit={handleStaffSubmit}>

              <label>Full Name</label>
              <input
                required
                value={staffForm.name}
                onChange={e => setStaffForm({ ...staffForm, name: e.target.value })}
                placeholder="Enter full name"
              />

              <label>Email Address</label>
              <input
                type="email"
                required
                value={staffForm.email}
                onChange={e => setStaffForm({ ...staffForm, email: e.target.value })}
                placeholder="Enter email"
              />

              <label>Phone Number</label>
              <input
                required
                value={staffForm.phone}
                onChange={e => setStaffForm({ ...staffForm, phone: e.target.value })}
                placeholder="Enter phone number"
              />

              <label>Assign Role</label>
              <select
                value={staffForm.role}
                onChange={e => setStaffForm({ ...staffForm, role: e.target.value })}
                required
              >
                {roles.map(r => (
                  <option key={r.id} value={r.name}>{r.name}</option>
                ))}
              </select>

              <label>Status</label>
              <select
                value={staffForm.status}
                onChange={e => setStaffForm({ ...staffForm, status: e.target.value })}
              >
                <option>Active</option>
                <option>Inactive</option>
              </select>

              <button type="submit" className="modal-submit">
                {editingStaff ? "Save Changes" : "Add Staff Member"}
              </button>

            </form>

          </div>

        </div>

      )}

      {showRoleModal && (

        <div className="staff-modal-overlay">

          <div className="staff-modal role-modal">

            <div className="modal-heading">

              <div>
                <h2>{editingRole ? "Edit Role" : "Create New Role"}</h2>
                <p>Customize role permissions.</p>
              </div>

              <button onClick={() => setShowRoleModal(false)}>
                <X />
              </button>

            </div>

            <form onSubmit={handleRoleSubmit}>

              <label>Role Name</label>

              <input
                required
                value={roleForm.name}
                onChange={e => setRoleForm({ ...roleForm, name: e.target.value })}
                placeholder="Enter role name"
              />

              <label>Description</label>

              <textarea
                value={roleForm.description}
                onChange={e => setRoleForm({ ...roleForm, description: e.target.value })}
                placeholder="Describe this role"
              />

              <label>Module Permissions</label>

              <div className="permission-list">

                {permissionsList.map(permission => (

                  <label className="permission-item" key={permission}>

                    <input
                      type="checkbox"
                      checked={roleForm.permissions.includes(permission)}
                      onChange={() => togglePermission(permission)}
                    />

                    <span>{permission}</span>

                  </label>

                ))}

              </div>

              <button type="submit" className="modal-submit">
                {editingRole ? "Update Role" : "Create Role"}
              </button>

            </form>

          </div>

        </div>

      )}

      {alert && (

        <div className="staff-alert-overlay">

          <div className="staff-alert-box">
            <ShieldCheck size={35} />
            <h3>Action Restricted</h3>
            <p>{alert}</p>

            <button onClick={() => setAlert("")}>
              Okay
            </button>
          </div>

        </div>

      )}

    </div>

  );
}

export default Staff;