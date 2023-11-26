"use client";

import { useUser } from "@clerk/clerk-react";
import {
    Dialog,
    DialogContent,
    DialogHeader
} from "@/components/ui/dialog";

import { useWelcome } from "@/hooks/use-welcome";
import { useEffect, useState } from "react";

export const WelcomeModal = () => {
    const { user, isLoaded } = useUser();
    const welcomeStore = useWelcome()

    // storing to local storage`

    useEffect(() => {
        if (isLoaded) {
            const firstTime = localStorage.getItem("firstTime")
            if (firstTime && firstTime === "true") {
                localStorage.setItem("firstTime", "false")
                welcomeStore.onOpen()
            } else if (firstTime && firstTime === "false") {
                localStorage.setItem("firstTime", "true")
            } else {
                localStorage.setItem("firstTime", "true")
            }
        }

    }, [isLoaded])

    // useEffect(() => {
    //     if (isFirstTime) {
    //         welcomeStore.onOpen()
    //         localStorage.setItem("firstTime", "false")
    //     }
    // }, [isFirstTime])

    return (
        <Dialog
            open={welcomeStore.isOpen}
            onOpenChange={welcomeStore.onClose}
        >
            <DialogContent>
                <DialogHeader className="border-b pb-3">
                    <h2 className="text-lg font-medium">
                        Welcome to Jôtion
                    </h2>
                </DialogHeader>

                <div className="flex flex-col gap-y-1">
                    <span className="text-[0.8rem] text-muted-foreground">
                        Hi {user?.fullName}, welcome to Jôtion. We're so glad you're here!
                    </span>
                </div>

            </DialogContent>
        </Dialog>
    )

};