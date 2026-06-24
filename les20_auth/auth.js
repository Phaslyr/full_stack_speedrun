import { DatabaseSync } from "node:sqlite";
import { betterAuth } from "better-auth";

const db = new DatabaseSync('database.db');

export const auth = betterAuth({
    database: db,
    emailAndPassword: {
        enabled: true
    }
});