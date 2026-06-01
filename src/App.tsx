import React from 'react';
// Importamos el componente que acabamos de crear y tipar
import UsuariosDashboard from './components/Usuarios'; 

const App: React.FC = () => {
  return (
    <div className="App">
      {/* Al ponerlo aquí, será la cara principal de tu aplicación */}
      <UsuariosDashboard />
    </div>
  );
};

export default App;