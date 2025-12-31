import { useEffect, useState } from "react";
import api from "../api";
import CustomerForm from "../components/CustomerForm";
import "./Dashboard.css";

export default function Dashboard() {
  const [customers, setCustomers] = useState([]);
  const [selected, setSelected] = useState(null);

  const loadCustomers = async () => {
    const res = await api.get("/customers");
    setCustomers(res.data);
  };

  useEffect(() => {
    loadCustomers();
  }, []);

  const deleteCustomer = async (id) => {
    if (window.confirm("Delete this customer?")) {
      await api.delete(`/customers/${id}`);
      loadCustomers();
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <div className="dashboard">
      {/* HEADER */}
      <header className="dashboard-header">
        <h1>📊 CRM Dashboard</h1>
        <button className="logout-btn" onClick={logout}>Logout</button>
      </header>

      {/* FORM */}
      <section className="form-section">
        <CustomerForm
          reload={loadCustomers}
          selected={selected}
          clearSelection={() => setSelected(null)}
        />
      </section>

      {/* CUSTOMER LIST */}
      {customers.length === 0 ? (
        <p className="empty-state">No customers added yet 🚀</p>
      ) : (
        <div className="customer-list">
          {customers.map((c) => (
            <div className="customer-card" key={c._id}>
              <h3>{c.name}</h3>

              <div className="contact-row">
                <a href={`mailto:${c.email}`} className="contact email">
                  📧 {c.email}
                </a>
                <a href={`tel:${c.phone}`} className="contact phone">
                  📞 {c.phone}
                </a>
              </div>

              <div className="actions">
                <button className="edit-btn" onClick={() => setSelected(c)}>
                  Edit
                </button>
                <button
                  className="delete-btn"
                  onClick={() => deleteCustomer(c._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
