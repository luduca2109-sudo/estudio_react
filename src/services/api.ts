import axios from 'axios';

import type { Usuario } from '../types/usuario';

const API_URL = 'http://localhost:5213/api'; 

const apiService = {
  // Retorna una promesa con un arreglo de Usuarios
  getUsuarios: async (): Promise<Usuario[]> => {
    try {
      const response = await axios.get<Usuario[]>(`${API_URL}/usuarios`);
      return response.data;
    } catch (error) {
      console.error("Error al obtener usuarios:", error);
      throw error;
    }
  },

  // Recibe los datos del usuario y retorna el Usuario creado por AWS
  createUsuario: async (usuarioData: Usuario): Promise<Usuario> => {
    try {
      const response = await axios.post<Usuario>(`${API_URL}/usuarios`, usuarioData);
      return response.data;
    } catch (error) {
      console.error("Error al crear usuario:", error);
      throw error;
    }
  }
};

export default apiService;