import { redirect } from "next/navigation";
import { signIn } from "@/server/auth";
import { AuthError } from "next-auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import logoImage from "public/Logo_Text_Black.png";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import ErrorDisplay from "@/components/error-display";

export default async function SignInPage({
    searchParams,
}: {
    searchParams: { error?: string; callbackUrl?: string };
}) {
    const callbackUrl = searchParams.callbackUrl ?? "/";
    const error = searchParams.error;

    return (
        <div className="flex items-center justify-center w-screen h-screen bg-gray-50">
            <Card className="w-full max-w-4xl mx-auto overflow-hidden">
                <div className="flex flex-col md:flex-row">
                    {/* Logo section - left side */}
                    <div className="flex items-center justify-center p-8 bg-secondary md:w-1/2">
                        <Image
                            src={logoImage}
                            alt="Rheingold Salon Logo"
                            className="max-w-full h-auto"
                            style={{
                                objectFit: "contain",
                                objectPosition: "center"
                            }}
                            priority
                        />
                    </div>

                    {/* Form section - right side */}
                    <div className="p-8 md:w-1/2">
                        <CardHeader className="px-0 pt-0">
                            <CardTitle className="text-2xl font-serif font-bold">Rheingold Salon CMS</CardTitle>
                            <CardDescription>Use your internal email address and password to sign in.</CardDescription>
                        </CardHeader>

                        <CardContent className="px-0 pt-6">
                            {/* Show error message if present */}
                            {error && <ErrorDisplay error={error} />}

                            <form
                                className="space-y-4"
                                action={async (formData) => {
                                    "use server";

                                    const email = formData.get("email") as string;
                                    const password = formData.get("password") as string;

                                    try {
                                        await signIn("credentials", {
                                            email,
                                            password,
                                            redirectTo: callbackUrl,
                                        });
                                    } catch (error) {
                                        if (error instanceof AuthError) {
                                            // Redirect to same page but with error parameter
                                            redirect(`/sign-in?error=${error.type}&callbackUrl=${encodeURIComponent(callbackUrl)}`);
                                        }
                                        throw error;
                                    }
                                }}
                            >
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        placeholder="example@rheingold.intern"
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="password">Password</Label>
                                    <Input
                                        id="password"
                                        name="password"
                                        type="password"
                                        required
                                    />
                                </div>

                                <Button className="w-full mt-2" type="submit">
                                    Sign In
                                </Button>
                            </form>
                        </CardContent>
                    </div>
                </div>
            </Card>
        </div>
    );
}
