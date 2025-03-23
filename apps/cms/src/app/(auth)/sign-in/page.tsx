'use client'

import ErrorDisplay from "@/app/(auth)/sign-in/error-display";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import {
    useSearchParams,
} from "next/navigation";
import { signIn } from "next-auth/react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"

import { signInSchema } from "@/lib/zod";

import logoImage from "public/Logo_Text_Black.png";
import type { z } from "zod";

// Type for form data based on the schema
type SignInFormData = z.infer<typeof signInSchema>;

export default function SignInPage() {
    const searchParams = useSearchParams();
    const errorFromUrl = searchParams.get("error");

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [serverError, setServerError] = useState(errorFromUrl ?? "");

    const form = useForm<SignInFormData>({
        resolver: zodResolver(signInSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = async (data: SignInFormData) => {
        setIsSubmitting(true);
        setServerError("");

        const result = await signIn("credentials", {
            email: data.email,
            password: data.password,
            redirectTo: "/"
        });

        if (result?.error) {
            setServerError(result.error);
            setIsSubmitting(false);
        }
    };

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
                            {serverError && <ErrorDisplay error={serverError} />}

                            <Form {...form}>
                                <form
                                    className="space-y-4"
                                    onSubmit={form.handleSubmit(onSubmit)}>
                                    <FormField
                                        control={form.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel htmlFor="email">Email</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        id="email"
                                                        type="email"
                                                        placeholder="example@rheingold.intern"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )} />
                                    <FormField
                                        control={form.control}
                                        name="password"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel htmlFor="password">Password</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        id="password"
                                                        type="password"
                                                        placeholder="*******"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )} />
                                    <Button className="w-full mt-2" type="submit">
                                        {isSubmitting ? "signing in..." : "sign in"}
                                    </Button>
                                </form>
                            </Form>
                        </CardContent>
                    </div>
                </div>
            </Card >
        </div >
    );
}
