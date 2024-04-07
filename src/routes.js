import React from "react";
import { Redirect, Switch, Route, Router } from "react-router-dom";
import RouteGuard from "./components/utils/routeGuard";

//history
import { history } from "./components/utils/history";

//pages
import LoginPage from './pages/login';
import PacientePage from './pages/paciente';
import CalendarioPage from './pages/calendario';
import PacienteMenuPage from './pages/pacienteMenu';
import FinanceiroPage from './pages/financeiro';

function Routes() {
    return (
        <Router history={history}>
            <Switch>
                <RouteGuard exact path="/" component={PacientePage} />
                <RouteGuard path="/pacientes" component={PacientePage} />
                <RouteGuard path="/calendario" component={CalendarioPage} />
                <RouteGuard path="/pacienteMenu" component={PacienteMenuPage} />
                <RouteGuard path="/financeiro" component={FinanceiroPage} />
                <Route path="/login" component={LoginPage} />
                <Redirect to="/" />
            </Switch>
        </Router>
    );
}

export default Routes;
