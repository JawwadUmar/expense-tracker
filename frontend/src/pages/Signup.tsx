import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signup, type SignUpRequest } from "../api/auth";
import { isAxiosError } from "axios";
import { toast } from "react-toastify";

const Signup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        
        const requestData: SignUpRequest = {
            email: email,
            password: password,
            name: name,
        };

        try {
            await signup(requestData);
            toast.success("Account created successfully! Please log in.");
            navigate("/login");
        } catch (error: any) {
            if (isAxiosError(error)) {
                const message = error.response?.data?.message || "Signup failed";
                toast.error(message);
            } else {
                toast.error(error.response?.data?.message || "An unexpected error occurred");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="dashboard-container" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div className="glass-panel" style={{ width: '100%', maxWidth: '400px', margin: 'auto' }}>
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <h1 style={{ marginBottom: '0.5rem' }}>Create Account</h1>
                    <p className="text-muted">Start tracking your expenses today</p>
                </div>

                <form onSubmit={handleSignup}>
                    <div className="form-group">
                        <label className="form-label">Full Name</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter your full name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    
                    <div className="form-group">
                        <label className="form-label">Email</label>
                        <input
                            type="email"
                            className="form-control"
                            placeholder="Enter your email address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    
                    <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                        <label className="form-label">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Create a password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={loading}>
                        {loading ? 'Creating Account...' : 'Sign Up'}
                    </button>
                </form>
                
                <div style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.875rem' }}>
                    <span className="text-muted">Already have an account? </span>
                    <Link to="/login" style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: 500 }}>
                        Sign In
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Signup;