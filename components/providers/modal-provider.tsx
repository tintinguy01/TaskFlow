"use client"

import { useEffect, useState } from "react"
import { SettingModal } from "../modals/setting-modal"
import { CoverImageModal } from "@/components/modals/cover-image-modal";
import { EventForm } from "../modals/event-modal";

export const ModalProvider = () => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }

     return (
        <>
            <EventForm />
            <SettingModal />
            <CoverImageModal />
        </>
     );
};