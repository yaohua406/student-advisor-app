export interface User {
    id: string;
    email: string;
    created_at: string;
    updated_at: string;
}

export interface Course {
    id: string;
    title: string;
    description: string;
    credits: number;
    advisorId: string;
}

export interface Advisor {
    id: string;
    name: string;
    expertise: string;
    contactInfo: string;
}

export interface UserProfile {
    name: string;
    email?: string;
    institution: string;
    major: string;
    desiredJob: string;
}