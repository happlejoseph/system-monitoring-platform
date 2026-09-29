

import { useState } from "react";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

const Login = () => {
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { login } = useAuth();

    const handleLogin = async () => {

        try {
            const response = await api.post("/auth/login", {
                email,
                password,
            });

            login(response.data.token);

            console.log("Login successfully:", response.data);
        }
        
        catch (error) {
            console.error("Login failed:", error);
        }
    };

    return (
        <div>
            <h1>Login</h1>

            <input
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <button type="button" onClick={handleLogin}>
                Login
            </button>
        </div>
    );
};

export default Login;
