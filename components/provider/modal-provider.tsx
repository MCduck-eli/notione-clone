"use client";

import { useEffect, useState } from "react";
import Settings from "../settings";
import EdgeModal from "./edgestore-modal";

export default function ModalProvider() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;
    return (
        <div>
            <Settings />
            <EdgeModal />
        </div>
    );
}
