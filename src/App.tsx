import { Route, BrowserRouter, Routes } from 'react-router-dom'
import AppLayout from './components/layout/AppLayout'
import { TemplatesProvider } from './context/TemplatesContext'
import InicioPage from './pages/InicioPage'
import PlantillasPage from './pages/PlantillasPage'
import TemplateEditorPage from './pages/TemplateEditorPage'
import CategoriasPage from './pages/CategoriasPage'
import ConfiguracionPage from './pages/ConfiguracionPage'
import GestionDispositivosPage from './pages/GestionDispositivosPage'

function App() {
  return (
    <BrowserRouter>
      <TemplatesProvider>
        <AppLayout>
          <Routes>
            <Route path="/" element={<InicioPage />} />
            <Route path="/plantillas" element={<PlantillasPage />} />
            <Route
              path="/plantillas/editar/:categoryId"
              element={<TemplateEditorPage />}
            />
            <Route path="/categorias" element={<CategoriasPage />} />
            <Route path="/configuracion" element={<ConfiguracionPage />} />
            <Route
              path="/configuracion/gestion-dispositivos"
              element={<GestionDispositivosPage />}
            />
          </Routes>
        </AppLayout>
      </TemplatesProvider>
    </BrowserRouter>
  )
}

export default App
