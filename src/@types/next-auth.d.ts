import { DefaultSession } from 'next-auth'

declare module "next-auth" {
    interface ession {
        user: {
            id: string;
        } & DefaultSession["user"];
    }
}