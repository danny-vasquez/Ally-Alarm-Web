import { Route, BrowserRouter, Routes } from 'react-router-dom'
import AppLayout from './components/layout/AppLayout'
import InicioPage from './pages/InicioPage'
import PlantillasPage from './pages/PlantillasPage'
import CategoriasPage from './pages/CategoriasPage'
import ConfiguracionPage from './pages/ConfiguracionPage'
import GestionDispositivosPage from './pages/GestionDispositivosPage'

function App() {
  return (
    <BrowserRouter>
      <AppLayout>
        <Routes>
          <Route path="/" element={<InicioPage />} />
          <Route path="/plantillas" element={<PlantillasPage />} />
          <Route path="/categorias" element={<CategoriasPage />} />
          <Route path="/configuracion" element={<ConfiguracionPage />} />
          <Route
            path="/configuracion/gestion-dispositivos"
            element={<GestionDispositivosPage />}
          />
        </Routes>
      </AppLayout>
    </BrowserRouter>
  )
}

export default App
