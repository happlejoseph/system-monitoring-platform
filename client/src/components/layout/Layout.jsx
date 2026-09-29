


import { NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Layout = () => {
    
    const { user, logout } = useAuth();

    const role = user?.role;

    return (
        <div>
            <nav>
                <h2>System Monitor</h2>

                <NavLink to="/dashboard">
                    Dashboard
                </NavLink>

                <NavLink to="/alerts">
                    Alerts
                </NavLink>

                {(role === "admin" || role === "operator") && (
                    <NavLink to="/servers">
                        Servers
                    </NavLink>
                )}

                {role === "admin" && (
                    <>
                        <NavLink to="/users">
                            Users
                        </NavLink>

                        <NavLink to="/audit-logs">
                            Audit Logs
                        </NavLink>

                        <NavLink to="/settings">
                            Settings
                        </NavLink>

                        <NavLink to="/reports">
                            Reports
                        </NavLink>
                    </>
                )}

                <button onClick={logout}>
                    Logout
                </button>
            </nav>

            <main>
                <Outlet />
            </main>
        </div>
    );
};

export default Layout;
