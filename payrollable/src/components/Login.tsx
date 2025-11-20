import { useAuth } from "../context/AuthContext"
import { useNavigate } from "react-router";
import { useState } from "react";

// Login page to verify the login credentials into TMU Oracle 12c.

export default function Login() {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");


    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault()
        try {
            await login(username, password); // save the credentials in the context (see AuthContext)
            navigate("/homepage"); 
        } catch (error) {
            console.error(error);
            alert("invalid username or password!");
        }
    }

    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <form className="border rounded-1 p-4 w-75 d-flex flex-column" onSubmit={handleSubmit}>
                <h2>Login</h2>
                <div className="form-group">
                    <label htmlFor="usernameInput">Username</label>
                    <input
                        value={username} 
                        className="form-control" 
                        id="usernameInput" 
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="passwordInput">Password</label>
                    <input
                        value={password} 
                        type="password" 
                        className="form-control" 
                        id="passwordInput"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit" className="btn btn-primary mt-2">Login</button>
            </form>
        </div>
    )
}