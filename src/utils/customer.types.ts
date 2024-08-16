export interface CustomerProps {
    id: string;
    name: string;
    phone: string;
    email: string;
    address?: string | null;
    created_at: Date | null;
    update_at: Date | null;
    userId: string;
}