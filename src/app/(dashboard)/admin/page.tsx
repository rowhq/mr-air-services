export default function AdminDashboard() {
  const stats = [
    { label: "Visitas Hoy", value: "124", change: "+12%" },
    { label: "Mensajes", value: "8", change: "+3" },
    { label: "Cotizaciones", value: "15", change: "+5" },
    { label: "Conversiones", value: "23%", change: "+2%" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-xl shadow-sm">
            <p className="text-sm text-gray-500">{stat.label}</p>
            <p className="text-3xl font-bold mt-2">{stat.value}</p>
            <p className="text-sm text-green-600 mt-1">{stat.change}</p>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <h2 className="text-lg font-semibold mb-4">Acciones Rápidas</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="p-4 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition">
            Editar Hero
          </button>
          <button className="p-4 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition">
            Ver Mensajes
          </button>
          <button className="p-4 bg-purple-50 text-purple-600 rounded-lg hover:bg-purple-100 transition">
            Editar Servicios
          </button>
          <button className="p-4 bg-orange-50 text-orange-600 rounded-lg hover:bg-orange-100 transition">
            Configuración
          </button>
        </div>
      </div>

      {/* Recent Messages */}
      <div className="bg-white p-6 rounded-xl shadow-sm mt-6">
        <h2 className="text-lg font-semibold mb-4">Mensajes Recientes</h2>
        <div className="space-y-4">
          {[
            { name: "Juan Pérez", email: "juan@email.com", subject: "Cotización instalación" },
            { name: "María García", email: "maria@email.com", subject: "Mantenimiento preventivo" },
            { name: "Carlos López", email: "carlos@email.com", subject: "Reparación urgente" },
          ].map((message, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
            >
              <div>
                <p className="font-medium">{message.name}</p>
                <p className="text-sm text-gray-500">{message.subject}</p>
              </div>
              <button className="text-blue-600 hover:underline text-sm">Ver</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
