import { useEffect, useState } from "react";
import API from "../api/api";

function Settings() {
  const [form, setForm] = useState({
    collegeName: "",
    courses: "",
    fees: "",
    admissionProcess: "",
    contactInfo: "",
    systemPrompt: "",
  });

  const getSettings = async () => {
    const res = await API.get("/settings");
    setForm({
      collegeName: res.data.collegeName || "",
      courses: res.data.courses || "",
      fees: res.data.fees || "",
      admissionProcess: res.data.admissionProcess || "",
      contactInfo: res.data.contactInfo || "",
      systemPrompt: res.data.systemPrompt || "",
    });
  };

  useEffect(() => {
    getSettings();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await API.post("/settings", form);
    alert("Settings saved");
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-5">AI Counselling Settings</h1>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow">
        <input
          name="collegeName"
          value={form.collegeName}
          placeholder="College Name"
          className="w-full border p-2 mb-3"
          onChange={handleChange}
        />

        <textarea
          name="courses"
          value={form.courses}
          placeholder="Courses"
          className="w-full border p-2 mb-3"
          rows="3"
          onChange={handleChange}
        />

        <textarea
          name="fees"
          value={form.fees}
          placeholder="Fees"
          className="w-full border p-2 mb-3"
          rows="3"
          onChange={handleChange}
        />

        <textarea
          name="admissionProcess"
          value={form.admissionProcess}
          placeholder="Admission Process"
          className="w-full border p-2 mb-3"
          rows="3"
          onChange={handleChange}
        />

        <textarea
          name="contactInfo"
          value={form.contactInfo}
          placeholder="Contact Info"
          className="w-full border p-2 mb-3"
          rows="3"
          onChange={handleChange}
        />

        <textarea
          name="systemPrompt"
          value={form.systemPrompt}
          placeholder="AI System Prompt"
          className="w-full border p-2 mb-3"
          rows="4"
          onChange={handleChange}
        />

        <button className="bg-green-600 text-white px-5 py-2 rounded">
          Save Settings
        </button>
      </form>
    </div>
  );
}

export default Settings;