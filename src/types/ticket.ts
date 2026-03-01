export type TicketType = {
    id?: string;
    title: string;
    description: string;
    status?: string;
    agentName?: string;
    createdAt?: Date;
}

export type UpdateTicketType = {
    description?: string;
    status?: string;
    priority?: string;
}