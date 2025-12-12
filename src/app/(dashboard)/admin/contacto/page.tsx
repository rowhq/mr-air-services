"use client";

import { useState } from "react";

interface Message {
  id: number;
  name: string;
  email: string;
  message: string;
  date: string;
  read: boolean;
}

export default function ContactoAdmin() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      name: "Juan Pérez",
      email: "juan@email.com",
      message: "Necesito una cotización para instalar un aire acondicionado en mi oficina de 50m².",
      date: "2024-01-15",
      read: false,
    },
    {
      id: 2,
      name: "María García",
      email: "maria@email.com",
      message: "Quisiera agendar un mantenimiento preventivo para 3 equipos split.",
      date: "2024-01-14",
      read: true,
    },
    {
      id: 3,
      name: "Carlos López",
      email: "carlos@email.com",
      message: "Mi aire acondicionado no enfría bien, necesito una revisión urgente.",
      date: "2024-01-13",
      read: true,
    },
  ]);

  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);

  const markAsRead = (id: number) => {
    setMessages(messages.map(m => m.id === id ? { ...m, read: true } : m));
  };

  const deleteMessage = (id: number) => {
    if (confirm("¿Estás seguro de eliminar este mensaje?")) {
      setMessages(messages.filter(m => m.id !== id));
      if (selectedMessage?.id === id) {
        setSelectedMessage(null);
      }
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Mensajes de Contacto</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Messages List */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-4 border-b">
            <h2 className="font-semibold">Bandeja de Entrada ({messages.filter(m => !m.read).length} nuevos)</h2>
          </div>
          <div className="divide-y max-h-[600px] overflow-y-auto">
            {messages.map((message) => (
              <div
                key={message.id}
                onClick={() => {
                  setSelectedMessage(message);
                  markAsRead(message.id);
                }}
                className={`p-4 cursor-pointer hover:bg-gray-50 transition ${
                  selectedMessage?.id === message.id ? "bg-blue-50" : ""
                } ${!message.read ? "bg-yellow-50" : ""}`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className={`font-medium ${!message.read ? "font-bold" : ""}`}>
                      {message.name}
                    </p>
                    <p className="text-sm text-gray-500">{message.email}</p>
                  </div>
                  <span className="text-xs text-gray-400">{message.date}</span>
                </div>
                <p className="text-sm text-gray-600 mt-2 truncate">{message.message}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Message Detail */}
        <div className="bg-white rounded-xl shadow-sm">
          {selectedMessage ? (
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-xl font-semibold">{selectedMessage.name}</h2>
                  <p className="text-gray-500">{selectedMessage.email}</p>
                  <p className="text-sm text-gray-400 mt-1">{selectedMessage.date}</p>
                </div>
                <button
                  onClick={() => deleteMessage(selectedMessage.id)}
                  className="text-red-600 hover:bg-red-50 px-3 py-1 rounded-lg transition"
                >
                  Eliminar
                </button>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-700 whitespace-pre-wrap">{selectedMessage.message}</p>
              </div>
              <div className="mt-6 flex gap-4">
                <a
                  href={`mailto:${selectedMessage.email}`}
                  className="flex-1 text-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  Responder por Email
                </a>
              </div>
            </div>
          ) : (
            <div className="p-6 text-center text-gray-500">
              <p>Selecciona un mensaje para ver los detalles</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
