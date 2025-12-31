import { useEffect, useState } from "react";
import api from "../api";
import "./CustomerForm.css";


export default function CustomerForm({ reload, selected, clearSelection }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: ""
  });

  /* Fill form when editing */
  useEffect(() => {
    if (selected) setForm(selected);
  }, [selected]);

  const submit = async (e) => {
    e.preventDefault();

    if (selected) {
      // UPDATE
      await api.put(`/customers/${selected._id}`, form);
    } else {
      // CREATE
      await api.post("/customers", form);
    }

    setForm({ name: "", email: "", phone: "" });
    clearSelection();
    reload();
  };

  return (
    <form className="customer-form" onSubmit={submit}>
  <h3>{selected ? "✏️ Update Customer" : "➕ Add New Customer"}</h3>

  <div className="input-group">
    <input
      type="text"
      required
      value={form.name}
      onChange={(e) => setForm({ ...form, name: e.target.value })}
    />
    <label>Customer Name</label>
  </div>

  <div className="input-group">
    <input
      type="email"
      required
      value={form.email}
      onChange={(e) => setForm({ ...form, email: e.target.value })}
    />
    <label>Email Address</label>
  </div>

  <div className="input-group">
    <input
      type="tel"
      required
      value={form.phone}
      onChange={(e) => setForm({ ...form, phone: e.target.value })}
    />
    <label>Phone Number</label>
  </div>

  <button type="submit" className="form-btn">
    {selected ? "Update Customer" : "Add Customer"}
  </button>
</form>

  );
}
