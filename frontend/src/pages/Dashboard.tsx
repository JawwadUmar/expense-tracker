import { useEffect, useState, useCallback } from "react";
import { getExpenses } from "../api/expenses";
import type { Expense } from "../api/expenses";
import ExpenseForm from "../components/ExpenseForm";
import ExpenseList from "../components/ExpenseList";
import { useAuth } from "../context/AuthContext";

const CATEGORIES = [
    "All",
    "Food & Dining",
    "Transportation",
    "Utilities",
    "Entertainment",
    "Shopping",
    "Healthcare",
    "Other"
];

export default function Dashboard() {
    const { user, logout } = useAuth();
    const [expenses, setExpenses] = useState<Expense[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    
    // Filters
    const [categoryFilter, setCategoryFilter] = useState("All");
    const [sortDesc, setSortDesc] = useState(true); // default to newest first

    const loadExpenses = useCallback(async () => {
        setLoading(true);
        setError("");
        try {
            const data = await getExpenses(
                categoryFilter !== "All" ? categoryFilter : undefined,
                sortDesc
            );
            setExpenses(data || []);
        } catch (err: any) {
            console.error(err);
            setError("Failed to load expenses. Please try again later.");
        } finally {
            setLoading(false);
        }
    }, [categoryFilter, sortDesc]);

    useEffect(() => {
        loadExpenses();
    }, [loadExpenses]);

    const handleExpenseAdded = () => {
        // Reload expenses to show the new one
        loadExpenses();
    };

    const totalAmount = expenses.reduce((sum, exp) => sum + exp.amount, 0);
    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
        }).format(amount);
    };

    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <div>
                    <h1>Expense Tracker</h1>
                    <p className="text-muted">Welcome back, {user?.name || "User"}</p>
                </div>
                <button className="btn glass-panel" style={{ padding: "0.5rem 1rem" }} onClick={logout}>
                    Log Out
                </button>
            </header>

            {error && (
                <div style={{ background: "rgba(239, 68, 68, 0.1)", color: "var(--danger)", padding: "1rem", borderRadius: "8px", marginBottom: "2rem" }}>
                    {error}
                </div>
            )}

            <div className="dashboard-grid">
                <div>
                    <ExpenseForm onExpenseAdded={handleExpenseAdded} />
                </div>
                
                <div>
                    <div className="glass-panel total-card">
                        <div className="text-muted">Total Expenses</div>
                        <div className="total-amount">{formatCurrency(totalAmount)}</div>
                    </div>

                    <div className="filters-bar">
                        <div className="form-group" style={{ marginBottom: 0, flex: 1 }}>
                            <select 
                                className="form-control" 
                                value={categoryFilter} 
                                onChange={(e) => setCategoryFilter(e.target.value)}
                            >
                                {CATEGORIES.map(c => <option key={c} value={c}>{c === "All" ? "All Categories" : c}</option>)}
                            </select>
                        </div>
                        <button 
                            className="btn glass-panel" 
                            style={{ padding: "0.75rem", display: "flex", alignItems: "center", gap: "0.5rem" }}
                            onClick={() => setSortDesc(!sortDesc)}
                        >
                            Sort: {sortDesc ? "Newest First" : "Oldest First"}
                        </button>
                    </div>

                    <ExpenseList expenses={expenses} loading={loading} />
                </div>
            </div>
        </div>
    );
}
