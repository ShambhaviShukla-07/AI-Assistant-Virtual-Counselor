function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">
        Welcome, {user?.collegeName}
      </h1>

      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded shadow">
          <h2 className="font-bold">Step 1</h2>
          <p>AI Settings save karo</p>
        </div>

        <div className="bg-white p-5 rounded shadow">
          <h2 className="font-bold">Step 2</h2>
          <p>WhatsApp QR scan karo</p>
        </div>

        <div className="bg-white p-5 rounded shadow">
          <h2 className="font-bold">Step 3</h2>
          <p>Student enquiries dekho</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;