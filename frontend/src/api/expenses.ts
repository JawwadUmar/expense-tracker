import api from "./axios";

export interface Expense {
    id: number;
    user_id: number;
    amount: number;
    category: string;
    description: string;
    date: string;
    idempotency_key: string;
    created_at: string;
    updated_at: string;
}

export interface ExpenseRequest {
    amount: number;
    category: string;
    description: string;
    date: string;
    idempotency_key: string;
}

export const getExpenses = async (category?: string, sortDesc?: boolean) => {
    const params = new URLSearchParams();
    if (category) {
        params.append("category", category);
    }
    if (sortDesc) {
        params.append("sort", "date_desc");
    }

    const response = await api.get(`/expenses?${params.toString()}`);
    return response.data.data as Expense[];
};

export const createExpense = async (data: ExpenseRequest) => {
    const response = await api.post("/expenses", data);
    return response.data.data as Expense;
};
