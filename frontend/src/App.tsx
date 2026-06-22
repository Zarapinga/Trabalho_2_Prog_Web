import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import DashboardPage from './pages/DashboardPage';
import TccListPage from './pages/TccListPage';
import TccFormPage from './pages/TccFormPage';
import AlunosPage from './pages/AlunosPage';
import ProfessoresPage from './pages/ProfessoresPage';
import CursosPage from './pages/CursosPage';
import DepartamentosPage from './pages/DepartamentosPage';
import UnidadesPage from './pages/UnidadesPage';

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/tccs" element={<TccListPage />} />
        <Route path="/tccs/novo" element={<TccFormPage />} />
        <Route path="/tccs/:id/editar" element={<TccFormPage />} />
        <Route path="/alunos" element={<AlunosPage />} />
        <Route path="/professores" element={<ProfessoresPage />} />
        <Route path="/cursos" element={<CursosPage />} />
        <Route path="/departamentos" element={<DepartamentosPage />} />
        <Route path="/unidades" element={<UnidadesPage />} />
      </Routes>
    </Layout>
  );
}
