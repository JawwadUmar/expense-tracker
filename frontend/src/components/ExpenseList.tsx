import type { Expense } from "../api/expenses";

interface ExpenseListProps {
    expenses: Expense[];
    loading: boolean;
}

export default function ExpenseList({ expenses, loading }: ExpenseListProps) {
    if (loading) {
        return (
            <div className="glass-panel">
                <h2>Recent Expenses</h2>
                {[1, 2, 3].map(i => (
                    <div key={i} className="expense-item" style={{ height: "80px", marginBottom: "10px" }}>
                        <div className="skeleton" style={{ width: "100%", height: "100%" }}></div>
                    </div>
                ))}
            </div>
        );
    }

    if (expenses.length === 0) {
        return (
            <div className="glass-panel" style={{ textAlign: "center", padding: "3rem" }}>
                <h3 style={{ color: "var(--text-muted)" }}>No expenses found</h3>
                <p className="text-muted">You haven't added any expenses that match these filters.</p>
            </div>
        );
    }

    const formatDate = (dateStr: string) => {
        const d = new Date(dateStr);
        return new Intl.DateTimeFormat("en-IN", {
            day: "numeric",
            month: "short",
            year: "numeric"
        }).format(d);
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
        }).format(amount);
    };

    return (
        <div className="glass-panel">
            <h2 style={{ marginBottom: "1.5rem" }}>Recent Expenses</h2>
            <div>
                {expenses.map(expense => (
                    <div key={expense.id} className="expense-item">
                        <div>
                            <div style={{ fontWeight: 500, marginBottom: "0.25rem" }}>
                                {expense.description || "No description"}
                            </div>
                            <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
                                <span className="expense-category">{expense.category}</span>
                                <span className="text-muted">{formatDate(expense.date)}</span>
                            </div>
                        </div>
                        <div className="expense-amount">
                            {formatCurrency(expense.amount)}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
