import React from "react";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import RouteGuard from "./components/utils/routeGuard";

//history
import { history } from "./components/utils/history";

//pages
import LoginPage from './pages/login';
import PacientePage from './pages/paciente';
import CalendarioPage from './pages/calendario';
import PacienteMenuPage from './pages/pacienteMenu';
import FinanceiroPage from './pages/financeiro';
import UsuariosPage from './pages/usuarios';
import ConsultaMenuPage from './pages/consultaMenu';

function RoutesClass() {
    return (
        <Router history={history}>
            <Routes>
                <Route path="/" element={<RouteGuard component={PacientePage} />} />
                <Route path="/pacientes" element={<RouteGuard component={PacientePage} />} />
                <Route path="/calendario" element={<RouteGuard component={CalendarioPage} />} />
                <Route path="/pacienteMenu" element={<RouteGuard component={PacienteMenuPage} />} />
                <Route path="/financeiro" element={<RouteGuard component={FinanceiroPage} />} />
                <Route path="/usuarios" element={<RouteGuard component={UsuariosPage} />} />
                <Route path="/consultaMenu/:id" element={<RouteGuard component={ConsultaMenuPage} />} />
                <Route path="/login" element={<LoginPage />} />
            </Routes>
        </Router>
    );
}

export default RoutesClass;
