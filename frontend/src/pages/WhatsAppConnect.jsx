import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import QRCode from "react-qr-code";
import API from "../api/api";

const socket = io("http://localhost:5000");

function WhatsAppConnect() {
  const [qr, setQr] = useState("");
  const [status, setStatus] = useState("Not connected");

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (user?.id) {
      socket.emit("joinCollege", user.id);
    }

    socket.on("qr", (qrData) => {
      setQr(qrData);
      setStatus("QR generated. Scan from WhatsApp.");
    });

    socket.on("ready", (data) => {
      setStatus(data.message);
      setQr("");
    });

    socket.on("authenticated", (data) => {
      setStatus(data.message);
    });

    socket.on("disconnected", (data) => {
      setStatus(data.message);
    });

    return () => {
      socket.off("qr");
      socket.off("ready");
      socket.off("authenticated");
      socket.off("disconnected");
    };
  }, []);

  const connectWhatsApp = async () => {
    try {
      const res = await API.post("/whatsapp/connect");
      setStatus(res.data.message);
    } catch (error) {
      alert(error.response?.data?.message || "WhatsApp connect failed");
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-5">WhatsApp Connect</h1>

      <div className="bg-white p-6 rounded shadow">
        <p className="mb-4">
          Status: <b>{status}</b>
        </p>

        <button
          onClick={connectWhatsApp}
          className="bg-green-600 text-white px-5 py-2 rounded"
        >
          Generate QR
        </button>

        {qr && (
          <div className="mt-6 bg-white p-4 inline-block border">
            <QRCode value={qr} size={250} />
          </div>
        )}
      </div>
    </div>
  );
}

export default WhatsAppConnect;