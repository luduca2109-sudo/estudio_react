import React, { useState, useEffect } from 'react';
import apiService from '../services/api';
import type { Usuario } from '../types/usuario';

const UsuariosDashboard: React.FC = () => {
  // Inicializamos el estado explícitamente como un arreglo de la interfaz Usuario
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [nombre, setNombre] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const cargarUsuarios = async (): Promise<void> => {
    try {
      const data = await apiService.getUsuarios();
      setUsuarios(data);
    } catch (error) {
      alert("No se pudieron cargar los usuarios de AWS");
    }
  };

  useEffect(() => {
    cargarUsuarios();
  }, []);

  // Tipamos el evento del formulario explícitamente
  const handleSubmit = async (e: React.BaseSyntheticEvent<SubmitEvent, HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    if (!nombre || !email) return alert("Por favor llena todos los campos");

    setLoading(true);
    try {
      await apiService.createUsuario({ nombre, email });
      setNombre('');
      setEmail('');
      await cargarUsuarios(); 
    } catch (error) {
      alert("Error al guardar el usuario en la nube");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h2>Gestión de Usuarios (AWS RDS Postgres + TS)</h2>
      
      <form onSubmit={handleSubmit} style={{ marginBottom: '30px', display: 'flex', gap: '10px' }}>
        <input 
          type="text" 
          placeholder="Nombre" 
          value={nombre} 
          onChange={(e) => setNombre(e.target.value)}
          style={{ padding: '8px' }}
        />
        <input 
          type="email" 
          placeholder="Correo Electrónico" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)}
          style={{ padding: '8px' }}
        />
        <button type="submit" disabled={loading} style={{ padding: '8px 15px', cursor: 'pointer' }}>
          {loading ? 'Guardando...' : 'Agregar Usuario'}
        </button>
      </form>

      <h3>Usuarios Registrados</h3>
      {usuarios.length === 0 ? (
        <p>No hay usuarios en la base de datos de AWS aún.</p>
      ) : (
        <table border={1} cellPadding="10" style={{ borderCollapse: 'collapse', width: '100%', maxWidth: '600px' }}>
          <thead>
            <tr style={{ backgroundColor: '#f2f2f2' }}>
              <th>ID</th>
              <th>Nombre</th>
              <th>Email</th>
              <th>Fecha Creación</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((u) => (
              <tr key={u.id}>
                <td>{u.id}</td>
                <td>{u.nombre}</td>
                <td>{u.email}</td>
                <td>{u.fechaCreacion ? new Date(u.fechaCreacion).toLocaleString() : ''}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UsuariosDashboard;