"use client";

import { RefObject } from "react";
import { Rnd } from "react-rnd";
import { Template, TextElement } from "./types";
import { cn } from "@/lib/utils";
import TrackingEye from "./motion/TrackingEye";
import { motion } from "framer-motion";

interface CanvasProps {
    cardRef: RefObject<HTMLDivElement | null>;
    template: Template;
    elements: TextElement[];
    updateElement: (id: string, updates: Partial<TextElement>) => void;
}

export default function Canvas({ cardRef, template, elements, updateElement }: CanvasProps) {
    // We use a fixed aspect ratio container for the card (e.g., 4:5 or 1:1)
    const isLight = template.id === "light";

    return (
        <div className="relative w-full max-w-[500px] aspect-[4/5] mx-auto overflow-hidden rounded-3xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.25)] ring-8 ring-white/50 bg-white/50 backdrop-blur-sm group/canvas transition-transform duration-500 hover:scale-[1.01]">
            <div
                ref={cardRef}
                className={cn(
                    "w-full h-full relative overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] will-change-transform",
                    template.className,
                    "border-[16px]",
                )}
            >
                {/* SVG Overlays for extra decor (Crescent, Stars) */}
                {!isLight && (
                    <>
                        <TrackingEye className="absolute top-6 right-6 opacity-30 mix-blend-screen pointer-events-none">
                            <svg width="100" height="100" viewBox="0 0 24 24" fill="currentColor" className="text-yellow-300 drop-shadow-2xl">
                                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                            </svg>
                        </TrackingEye>
                        <motion.div
                            animate={{ opacity: [0.2, 0.5, 0.2] }}
                            transition={{ duration: 3, repeat: Infinity }}
                            className="absolute bottom-10 left-10 text-white/20 pointer-events-none"
                        >
                            <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                            </svg>
                        </motion.div>
                    </>
                )}
                {isLight && (
                    <TrackingEye className="absolute top-[-20%] right-[-20%] w-[70%] h-[70%] bg-amber-200/60 rounded-full blur-[80px] opacity-70 pointer-events-none mix-blend-multiply">
                        <div className="w-full h-full" />
                    </TrackingEye>
                )}

                {elements.map((el) => (
                    <Rnd
                        key={el.id}
                        position={{ x: el.x, y: el.y }}
                        onDragStop={(e, d) => {
                            updateElement(el.id, { x: d.x, y: d.y });
                        }}
                        bounds="parent"
                        enableResizing={false}
                        className="z-10 absolute cursor-move group/element flex items-center justify-center p-2 touch-none"
                    >
                        {/* Hover bounds indicator */}
                        <div className="absolute inset-0 rounded-xl border-2 border-transparent group-hover/element:border-emerald-400 border-dashed opacity-0 group-hover/element:opacity-100 transition-all bg-emerald-400/5 pointer-events-none -m-1" />

                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.9, rotate: -2 }}
                            style={{
                                fontSize: `${el.fontSize}px`,
                                color: el.color,
                                fontFamily: el.fontFamily
                            }}
                            className="text-center w-full min-w-[100px] leading-tight drop-shadow-xl select-none"
                        >
                            {el.text || "Click to edit"}
                        </motion.div>
                    </Rnd>
                ))}
            </div>
        </div>
    );
}
