'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import './admin.css';

export default function AdminLogin() {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();

        // Simple password check - you can change this password
        if (password === 'Myaaditya@0101') {
            localStorage.setItem('adminAuthenticated', 'true');
            router.push('/admin/dashboard');
        } else {
            setError('Invalid password. Please try again.');
            setPassword('');
        }
    };

    return (
        <div className="admin-login-container">
            <div className="admin-login-card">
                <div className="admin-header">
                    <h1>🔐 Admin Portal</h1>
                    <p>Aadity's Healthy Bites Administration</p>
                </div>

                <form onSubmit={handleLogin} className="admin-login-form">
                    <div className="form-group">
                        <label htmlFor="password">Admin Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter admin password"
                            required
                            autoFocus
                        />
                    </div>

                    {error && <div className="error-message">{error}</div>}

                    <button type="submit" className="btn-login">
                        Login to Dashboard
                    </button>


                </form>
            </div>
        </div>
    );
}
