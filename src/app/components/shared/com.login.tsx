import React, { useState, FormEvent } from "react";
import { loginUser } from "../../services/users.services";
import { useApi } from "../../hooks/useApi";
import { User } from "../../types";

interface LoginResponse {
    accessToken: string;
    user: User;
}

const CommonUserLogin: React.FC = () => {
    const {
        data: loggedUser,
        error,
        isLoading,
        fetchData: login,
    } = useApi<{ email?: string; username?: string; password: string }, LoginResponse>(loginUser);

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [localError, setLocalError] = useState<string | null>(null);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        // Validate that at least one of username or email is provided along with password.
        if (!(username || email) || !password) {
            setLocalError("Either email or username and password are required.");
            return;
        }
        setLocalError(null);
        await login({
            email: email ? email : undefined,
            username: username ? username : undefined,
            password,
        });
    };

    return (
        <div>
            <h2>User Login</h2>
            {(localError || error) && (
                <p style={{ color: "red" }}>
                    {localError ? localError : error?.message}
                </p>
            )}
            {loggedUser ? (
                <div>
                    <h3>Login Successful!</h3>
                    <p>Welcome, {loggedUser.user.username}</p>
                </div>
            ) : (
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Username:</label>
                        <input
                            type="text"
                            value={username}
                            placeholder="Username (optional if email provided)"
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div>
                        <label>Email:</label>
                        <input
                            type="email"
                            value={email}
                            placeholder="Email (optional if username provided)"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <label>Password:</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" disabled={isLoading}>
                        {isLoading ? "Logging in..." : "Login"}
                    </button>
                </form>
            )}
        </div>
    );
};

export default CommonUserLogin;