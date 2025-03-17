"use client";

import { Alert, AlertDescription } from "@/components/ui/alert";

// Error messages map
const errorMessages: Record<string, string> = {
    CredentialsSignin: "Invalid email or password. Please try again.",
    SessionRequired: "You need to be signed in to access this page.",
    Default: "An error occurred during sign in. Please try again."
};

export default function ErrorDisplay({ error }: { error: string }) {
    const errorMessage = errorMessages[error] ?? errorMessages.Default;

    return (
        <Alert variant="destructive" className="mb-4">
            <AlertDescription>{errorMessage}</AlertDescription>
        </Alert>
    );
}
