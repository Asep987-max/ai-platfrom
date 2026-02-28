"use client";

import { Button } from "@/ui/Button";
import { Input } from "@/ui/Input";
import Link from "next/link";

export default function RegisterPage() {
    return (
        <div className="flex min-h-[80vh] items-center justify-center">
            <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                <div className="flex flex-col space-y-2 text-center">
                    <h1 className="text-2xl font-bold tracking-tight text-text-primary">Create an account</h1>
                    <p className="text-sm text-text-muted">Enter your details to create your account</p>
                </div>
                <div className="grid gap-6">
                    <form onSubmit={(e) => e.preventDefault()}>
                        <div className="grid gap-4">
                            <div className="grid gap-1">
                                <Input
                                    id="name"
                                    placeholder="Full Name"
                                    type="text"
                                    autoCapitalize="words"
                                />
                            </div>
                            <div className="grid gap-1">
                                <Input
                                    id="email"
                                    placeholder="name@example.com"
                                    type="email"
                                    autoCapitalize="none"
                                    autoComplete="email"
                                    autoCorrect="off"
                                />
                            </div>
                            <div className="grid gap-1">
                                <Input
                                    id="password"
                                    placeholder="Password"
                                    type="password"
                                />
                            </div>
                            <Button className="mt-2">
                                Create Account
                            </Button>
                        </div>
                    </form>
                </div>
                <p className="px-8 text-center text-sm text-text-muted">
                    <Link href="/login" className="hover:text-primary underline underline-offset-4">
                        Already have an account? Sign In
                    </Link>
                </p>
            </div>
        </div>
    );
}
