

import { Navigate, Route, Routes } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Layout from "./components/layout/Layout";

import { useAuth } from "./context/AuthContext";
import Alerts from "./pages/Alerts";

const App = () => {

    const { isAuthenticated } = useAuth();

    if (!isAuthenticated) {
        return <Login />;
    }

    return (
        <Routes>
            <Route element={<Layout />}>
            
                <Route path="/" element={<Navigate to="/dashboard" replace />} />

                <Route path="/dashboard" element={<Dashboard />}/>

                <Route path="/alerts" element={<Alerts/>}/>
            </Route>
        </Routes>
    );
};

export default App;