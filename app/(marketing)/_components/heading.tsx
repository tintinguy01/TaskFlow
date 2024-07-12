"use client";

import Spinner from "@/components/spinner";
import { Button } from "@/components/ui/button";
import { SignInButton } from "@clerk/clerk-react";
import { useConvexAuth } from "convex/react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const Heading = () => {
    const {isAuthenticated, isLoading} = useConvexAuth();

    return (
        <div className="max-w-3xl space-y-5">
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold">
            Flow Through Tasks with Ease. Welcome to <span 
                className="underline">TaskFlow</span>
            </h1>
            <h3 className="text-bast sm:text-xl md:text-2xl font-medium">
                TaskFlow streamlines task management and scheduling with customizable categories and dynamic progress tracking.<br/> Simplify life with TaskFlow.
            </h3>
            {isLoading && (
                <div className="w-full flex items-center justify-center">
                    <Spinner size="lg" />
                </div>
            )}
            {isAuthenticated && !isLoading && (
                <Button asChild>
                    <Link href="/documents">
                        Enter TasKFlow 
                        <ArrowRight className="h-4 w-4 ml-2" />
                    </Link>
                </Button>
            )}
            {!isAuthenticated && !isLoading && (
                <SignInButton mode="modal">
                    <Button>
                        Get TaskFlow Free
                        <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                </SignInButton>
            )}
        </div>
    )
}

export default Heading;