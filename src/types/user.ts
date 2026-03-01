export interface User {
    id: string;
    name: string;
    email: string;
    role: "CUSTOMER" | "SUPPORT_AGENT";
    permissions?: string[]; 
}

export type SupportAgentType = {
    id: string;
    name: string;
}