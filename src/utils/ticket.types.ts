export interface TicketProps {
    id: string;
    name: string;
    description: string;
    status: string;
    created_at: Date | null;
    update_at: Date | null;
    customerId: string | null;
    userId: string | null;
}