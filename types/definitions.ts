export type User = {
    username: string;
    email: string;
    password: string;
    avatar?: string;
}

export type Task = {
    id: string
    name: string;
    status: 'pending'| 'done' | 'ongoing';
    priority: 'high' | 'low' | 'medium';
    image?: string; 
}