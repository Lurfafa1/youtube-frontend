"use client"

import React, { useState, FormEvent } from "react";
import { registerUser } from "../../services/users.services";
import { User } from "../../types";
import { useApi } from "../../hooks/useApi";

const CommonUserRegister: React.FC = () => {
    const { data: registeredUser, error, isLoading, fetchData: register } = useApi<FormData, User>(registerUser);

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [fullname, setFullname] = useState("");
    const [password, setPassword] = useState("");
    const [avatar, setAvatar] = useState<File | null>(null);
    const [coverImage, setCoverImage] = useState<File | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [localError, setLocalError] = useState<string | null>(null);


    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();


        // Ensure avatar is provided since the backend requires it.
        if (!avatar) {
            setLocalError("Avatar is required.");
            return;
        }
        setLocalError(null);
        setIsSubmitting(true);
        const formData = new FormData();
        formData.append("username", username);
        formData.append("email", email);
        formData.append("fullname", fullname);
        formData.append("password", password);
        formData.append("avatar", avatar);

        if (coverImage) {
            formData.append("coverImage", coverImage);
        }

        await register(formData);
        setIsSubmitting(false);
    };

    return (
        <div>
            <h2>User Registration</h2>
            {(localError || error) && (
                <p style={{ color: "red" }}>
                    {localError ? localError : error?.message}
                </p>
            )}
            {registeredUser ? (
                <div>
                    <h3>Registration Successful!</h3>
                    <p>Welcome, {registeredUser.username}</p>
                </div>
            ) : (
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Username:</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label>Email:</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label>Full Name:</label>
                        <input
                            type="text"
                            value={fullname}
                            onChange={(e) => setFullname(e.target.value)}
                            required
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
                    <div>
                        <label>Avatar:</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) =>
                                e.target.files ? setAvatar(e.target.files[0]) : null
                            }
                            required
                        />
                    </div>
                    <div>
                        <label>Cover Image:</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) =>
                                e.target.files ? setCoverImage(e.target.files[0]) : null
                            }
                        />
                    </div>
                    <button type="submit" disabled={isSubmitting || isLoading}>
                        {isSubmitting || isLoading ? "Registering..." : "Register"}
                    </button>
                </form>
            )}
        </div>
    );
};

export default CommonUserRegister;