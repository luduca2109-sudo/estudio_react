export interface Usuario {
  id?: number; // Opcional porque AWS lo genera automáticamente (Identity)
  nombre: string;
  email: string;
  fechaCreacion?: string; // Viene como string ISO desde la API
}