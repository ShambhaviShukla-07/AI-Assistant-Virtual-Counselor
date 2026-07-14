import { Link, Outlet, useNavigate } from "react-router-dom";

function DashboardLayout() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex bg-gray-100">
      <aside className="w-64 bg-gray-900 text-white p-5">
        <h2 className="text-xl font-bold mb-6">
          Admission ERP
        </h2>

        <p className="text-sm mb-6 text-gray-300">
          {user?.collegeName}
        </p>

        <nav className="space-y-3">
          <Link className="block hover:text-green-400" to="/dashboard">
            Dashboard
          </Link>
          <Link className="block hover:text-green-400" to="/dashboard/settings">
            AI Settings
          </Link>
          <Link className="block hover:text-green-400" to="/dashboard/whatsapp">
            WhatsApp Connect
          </Link>
          <Link className="block hover:text-green-400" to="/dashboard/enquiries">
            Enquiries
          </Link>
        </nav>

        <button
          onClick={logout}
          className="mt-8 bg-red-600 px-4 py-2 rounded"
        >
          Logout
        </button>
      </aside>

      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
}

export default DashboardLayout;