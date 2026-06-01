import { useState, useEffect } from 'react'

// Definimos la estructura de nuestros datos de telemetría (Tipado fuerte como en C#)
interface ServerMetrics {
  cpuUsage: number;
  memoryUsage: number;
  activeRequests: number;
  serverStatus: 'Healthy' | 'Warning' | 'Critical';
}

export default function App() {
  // Estado local para almacenar las métricas (Equivalente a una propiedad reactiva)
  const [metrics, setMetrics] = useState<ServerMetrics>({
    cpuUsage: 22,
    memoryUsage: 45,
    activeRequests: 120,
    serverStatus: 'Healthy'
  });

  // useEffect se ejecuta cuando el componente se monta (Como el Page_Load o un constructor)
  useEffect(() => {
    // Simulamos un WebSocket o sondeo de API que actualiza los datos cada segundo
    const interval = setInterval(() => {
      const randomCpu = Math.floor(Math.random() * 60) + 15; // Genera entre 15% y 75%
      const randomMem = Math.floor(Math.random() * 20) + 50; // Genera entre 50% y 70%
      const randomReq = Math.floor(Math.random() * 100) + 200; // Genera entre 200 y 300

      // Determinamos el estado del servidor según el uso de CPU
      let status: 'Healthy' | 'Warning' | 'Critical' = 'Healthy';
      if (randomCpu > 70) status = 'Critical';
      else if (randomCpu > 50) status = 'Warning';

      // Actualizamos el estado de React (Esto fuerza el rediseño automático de la pantalla)
      setMetrics({
        cpuUsage: randomCpu,
        memoryUsage: randomMem,
        activeRequests: randomReq,
        serverStatus: status
      });
    }, 1000);

    // Limpieza del intervalo al desmontar el componente (Buena práctica de manejo de memoria)
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-6 font-sans">
      {/* Encabezado del Dashboard */}
      <header className="mb-8 border-b border-gray-800 pb-4 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Telemetria de estado de computador (Juan camilo)</h1>
          <p className="text-sm text-gray-400 mt-1">Monitoreo en tiempo real</p>
        </div>
        <div className="flex items-center gap-2 bg-gray-800 px-4 py-2 rounded-lg border border-gray-700">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
          </span>
          <span className="text-xs font-medium uppercase tracking-wider text-green-400">Live Connection</span>
        </div>
      </header>

      {/* Grid de Tarjetas de Métricas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Tarjeta 1: CPU */}
        <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-lg">
          <p className="text-sm font-medium text-gray-400 uppercase tracking-wider">Uso de CPU</p>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-4xl font-extrabold tracking-tight text-blue-400">{metrics.cpuUsage}%</span>
          </div>
          {/* Barra de progreso visual */}
          <div className="w-full bg-gray-700 h-2 rounded-full mt-4 overflow-hidden">
            <div 
              className="bg-blue-500 h-full transition-all duration-500" 
              style={{ width: `${metrics.cpuUsage}%` }}
            ></div>
          </div>
        </div>

        {/* Tarjeta 2: Memoria RAM */}
        <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-lg">
          <p className="text-sm font-medium text-gray-400 uppercase tracking-wider">Memoria RAM</p>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-4xl font-extrabold tracking-tight text-purple-400">{metrics.memoryUsage}%</span>
          </div>
          <div className="w-full bg-gray-700 h-2 rounded-full mt-4 overflow-hidden">
            <div 
              className="bg-purple-500 h-full transition-all duration-500" 
              style={{ width: `${metrics.memoryUsage}%` }}
            ></div>
          </div>
        </div>

        {/* Tarjeta 3: Peticiones Activas */}
        <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-lg">
          <p className="text-sm font-medium text-gray-400 uppercase tracking-wider">Peticiones HTTP / seg</p>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-4xl font-extrabold tracking-tight text-amber-400">{metrics.activeRequests}</span>
            <span className="text-xs text-gray-400">req/s</span>
          </div>
          <p className="text-xs text-gray-500 mt-5">Balanceador de carga AWS ALB</p>
        </div>

        {/* Tarjeta 4: Estado General */}
        <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-lg">
          <p className="text-sm font-medium text-gray-400 uppercase tracking-wider">Estado del Nodo</p>
          <div className="mt-3">
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold tracking-wide uppercase
              ${metrics.serverStatus === 'Healthy' ? 'bg-green-950 text-green-400 border border-green-800' : ''}
              ${metrics.serverStatus === 'Warning' ? 'bg-amber-950 text-amber-400 border border-amber-800' : ''}
              ${metrics.serverStatus === 'Critical' ? 'bg-red-950 text-red-400 border border-red-800' : ''}
            `}>
              {metrics.serverStatus}
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-7">Región: us-east-1 (N. Virginia)</p>
        </div>

        {/* Tarjeta 5: Estado SQL Server (Nueva) */}
        <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-lg col-span-1 md:col-span-2 lg:col-span-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm font-medium text-gray-400 uppercase tracking-wider">Instancia Base de Datos SQL</p>
              <h3 className="text-xl font-bold text-emerald-400 mt-1">aws-rds-sql-server-prod</h3>
            </div>
            <div className="text-right">
              <span className="text-xs bg-gray-700 text-gray-300 px-3 py-1 rounded-md border border-gray-600">
                Latencia: 4ms
              </span>
              <p className="text-xs text-gray-500 mt-2">Pool: 55/100 conexiones activas</p>
            </div>
          </div>
        </div>

      </div>

      {/* Nota técnica para la entrevista */}
      <footer className="mt-12 text-center text-xs text-gray-600 border-t border-gray-800 pt-4">
        Clase de Arquitectura Frontend • React 18+ • TypeScript • Vite
      </footer>
    </div>
  )
}