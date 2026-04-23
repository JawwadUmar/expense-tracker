import { useState, useEffect } from "react";
import { createExpense } from "../api/expenses";
import type { ExpenseRequest } from "../api/expenses";

interface ExpenseFormProps {
    onExpenseAdded: () => void;
}

const CATEGORIES = [
    "Food & Dining",
    "Transportation",
    "Utilities",
    "Entertainment",
    "Shopping",
    "Healthcare",
    "Other"
];

export default function ExpenseForm({ onExpenseAdded }: ExpenseFormProps) {
    const [amount, setAmount] = useState("");
    const [category, setCategory] = useState(CATEGORIES[0]);
    const [description, setDescription] = useState("");
    const [date, setDate] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [idempotencyKey, setIdempotencyKey] = useState("");

    // Generate a new idempotency key on mount and after successful submission
    const generateKey = () => {
        setIdempotencyKey(crypto.randomUUID());
    };

    useEffect(() => {
        generateKey();
        const today = new Date().toISOString().split("T")[0];
        setDate(today);
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        
        const numAmount = parseFloat(amount);
        if (isNaN(numAmount) || numAmount <= 0) {
            setError("Please enter a valid positive amount.");
            return;
        }

        if (!date) {
            setError("Date is required.");
            return;
        }

        setLoading(true);
        
        try {
            const data: ExpenseRequest = {
                amount: numAmount,
                category,
                description,
                date: new Date(date).toISOString(),
                idempotency_key: idempotencyKey,
            };

            await createExpense(data);
            
            // Reset form
            setAmount("");
            setDescription("");
            generateKey(); // new key for next submission
            onExpenseAdded();
        } catch (err: any) {
            console.error(err);
            setError(err.response?.data?.message || "Failed to add expense. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="glass-panel">
            <h2>Add Expense</h2>
            {error && <div style={{ color: "var(--danger)", marginBottom: "1rem" }}>{error}</div>}
            
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label className="form-label">Amount (₹)</label>
                    <input 
                        type="number" 
                        step="0.01"
                        className="form-control" 
                        value={amount} 
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="0.00"
                        required
                    />
                </div>
                
                <div className="form-group">
                    <label className="form-label">Category</label>
                    <select 
                        className="form-control"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                </div>
                
                <div className="form-group">
                    <label className="form-label">Date</label>
                    <input 
                        type="date" 
                        className="form-control" 
                        value={date} 
                        onChange={(e) => setDate(e.target.value)}
                        required
                    />
                </div>
                
                <div className="form-group">
                    <label className="form-label">Description (Optional)</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        value={description} 
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="What was this for?"
                    />
                </div>
                
                <button type="submit" className="btn btn-primary" style={{ width: "100%" }} disabled={loading}>
                    {loading ? "Adding..." : "Add Expense"}
                </button>
            </form>
        </div>
    );
}
