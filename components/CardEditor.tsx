"use client";

import { useState, useRef } from "react";
import Canvas from "./Canvas";
import Toolbar from "./Toolbar";
import { Download, Share2 } from "lucide-react";
import html2canvas from "html2canvas";
import { TextElement, TEMPLATES } from "./types";
import { motion } from "framer-motion";

const containerVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: {
            duration: 0.8,
            ease: [0.23, 1, 0.32, 1] as const,
            staggerChildren: 0.1
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            type: "spring" as const,
            stiffness: 200,
            damping: 20
        }
    }
};

export default function CardEditor() {
    const [templateId, setTemplateId] = useState<string>("classic");
    const [elements, setElements] = useState<TextElement[]>([
        { id: "sender", text: "From: Your Name", x: 100, y: 400, fontSize: 24, color: "#ffffff", fontFamily: "var(--font-sniglet)" },
        { id: "receiver", text: "To: My Dear Friend", x: 100, y: 100, fontSize: 32, color: "#ffffff", fontFamily: "var(--font-fredoka)" },
        { id: "message", text: "Eid Mubarak! May this special day bring peace, happiness and prosperity to everyone.", x: 50, y: 200, fontSize: 36, color: "#FFE500", fontFamily: "var(--font-fredoka)" },
    ]);

    const cardRef = useRef<HTMLDivElement>(null);
    const activeTemplate = TEMPLATES.find((t) => t.id === templateId) || TEMPLATES[0];

    const updateElement = (id: string, updates: Partial<TextElement>) => {
        setElements((prev) => prev.map((e) => (e.id === id ? { ...e, ...updates } : e)));
    };

    const addElement = (text: string, fontSize = 64) => {
        const newId = `sticker-${Date.now()}`;
        setElements((prev) => [
            ...prev,
            { id: newId, text, x: 150, y: 150, fontSize, color: "#ffffff", fontFamily: "var(--font-fredoka)" },
        ]);
    };

    const removeElement = (id: string) => {
        setElements((prev) => prev.filter((e) => e.id !== id));
    };

    const handleDownload = async () => {
        if (!cardRef.current) return;
        try {
            const canvas = await html2canvas(cardRef.current, { scale: 2, useCORS: true });
            const dataUrl = canvas.toDataURL("image/png");
            const link = document.createElement("a");
            link.download = "eid-mubarak-card.png";
            link.href = dataUrl;
            link.click();
        } catch (err) {
            console.error("Failed to download image", err);
        }
    };

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({ title: "Eid Mubarak!", text: "Check out this beautiful Eid card I made for you.", url: window.location.href });
            } catch (err) {
                console.error("Failed to share", err);
            }
        } else {
            alert("Web Share API is not supported in your browser.");
        }
    };

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="min-h-screen flex flex-col xl:flex-row items-stretch xl:items-start p-4 md:p-8 gap-6 relative overflow-hidden"
            style={{ background: "var(--background)" }}
        >
            {/* Ambient Background Blobs */}
            <div className="fixed top-[-10%] left-[-10%] w-[35%] h-[35%] rounded-full blur-[100px] opacity-40 pointer-events-none" style={{ background: "var(--mint)" }} />
            <div className="fixed bottom-[-10%] right-[-10%] w-[35%] h-[35%] rounded-full blur-[100px] opacity-40 pointer-events-none" style={{ background: "var(--yellow)" }} />

            {/* Canvas Area */}
            <motion.div variants={itemVariants} className="flex-1 flex flex-col items-center justify-center relative z-10 w-full xl:sticky xl:top-8 h-[calc(100vh-4rem)]">
                <div
                    className="w-full max-w-[600px] flex-1 min-h-0 p-6 md:p-10 relative flex items-center justify-center rounded-3xl"
                    style={{
                        background: "var(--card-bg)",
                        border: "3px solid var(--border)",
                        boxShadow: "8px 8px 0 var(--border)"
                    }}
                >
                    <Canvas
                        cardRef={cardRef}
                        template={activeTemplate}
                        elements={elements}
                        updateElement={updateElement}
                    />
                </div>

                {/* Action Buttons */}
                <div className="mt-6 flex gap-4 w-full max-w-[600px]">
                    <button
                        onClick={handleDownload}
                        className="flex-1 group flex items-center justify-center gap-2 py-4 rounded-2xl font-bold text-base transition-all chemtest-btn"
                        style={{ background: "var(--mint)", color: "var(--foreground)", border: "3px solid var(--border)", boxShadow: "4px 4px 0 var(--border)" }}
                    >
                        <Download className="w-5 h-5 group-hover:animate-bounce" /> Download
                    </button>
                    <button
                        onClick={handleShare}
                        className="flex-1 group flex items-center justify-center gap-2 py-4 rounded-2xl font-bold text-base transition-all chemtest-btn"
                        style={{ background: "var(--yellow)", color: "var(--foreground)", border: "3px solid var(--border)", boxShadow: "4px 4px 0 var(--border)" }}
                    >
                        <Share2 className="w-5 h-5 group-hover:rotate-12 transition-transform" /> Share
                    </button>
                </div>
            </motion.div>

            {/* Toolbar */}
            <motion.div
                variants={itemVariants}
                className="w-full xl:w-[480px] shrink-0 p-6 md:p-8 flex flex-col relative z-20 h-auto xl:h-[calc(100vh-4rem)] overflow-y-auto custom-scrollbar rounded-3xl"
                style={{
                    background: "var(--card-bg)",
                    border: "3px solid var(--border)",
                    boxShadow: "6px 6px 0 var(--border)"
                }}
            >
                <Toolbar
                    templateId={templateId}
                    onSelectTemplate={setTemplateId}
                    elements={elements}
                    updateElement={updateElement}
                    addElement={addElement}
                    removeElement={removeElement}
                />
            </motion.div>
        </motion.div>
    );
}
