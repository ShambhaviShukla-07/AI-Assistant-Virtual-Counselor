import { useEffect, useState } from "react";
import API from "../api/api";

function Enquiries() {
  const [enquiries, setEnquiries] = useState([]);
  const [selected, setSelected] = useState(null);

  const getEnquiries = async () => {
    const res = await API.get("/enquiries");
    setEnquiries(res.data);
  };

  useEffect(() => {
    getEnquiries();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-5">Student Enquiries</h1>

      <div className="grid grid-cols-2 gap-5">
        <div className="bg-white rounded shadow">
          {enquiries.map((item) => (
            <div
              key={item._id}
              onClick={() => setSelected(item)}
              className="p-4 border-b cursor-pointer hover:bg-gray-100"
            >
              <h2 className="font-bold">{item.studentPhone}</h2>
              <p className="text-sm text-gray-600">
                Status: {item.leadStatus}
              </p>
              <p className="text-sm">
                {item.summary}
              </p>
            </div>
          ))}
        </div>

        <div className="bg-white rounded shadow p-4">
          {!selected && <p>Select enquiry to view chat</p>}

          {selected && (
            <>
              <h2 className="font-bold mb-4">
                Chat: {selected.studentPhone}
              </h2>

              <div className="space-y-3">
                {selected.messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`p-3 rounded ${
                      msg.sender === "student"
                        ? "bg-blue-100"
                        : "bg-green-100"
                    }`}
                  >
                    <b>{msg.sender}</b>
                    <p>{msg.text}</p>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Enquiries;