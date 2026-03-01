"use client";

import { TEMPLATES } from "./types";
import type { TextElement } from "./types";
import { cn } from "@/lib/utils";
import { Trash2 } from "lucide-react";
import { motion } from "framer-motion";

interface ToolbarProps {
    templateId: string;
    onSelectTemplate: (id: string) => void;
    elements: TextElement[];
    updateElement: (id: string, updates: Partial<TextElement>) => void;
    addElement: (text: string, fontSize?: number) => void;
    removeElement: (id: string) => void;
}

const FONTS = [
    { name: "Outfit (Modern)", value: "var(--font-outfit)" },
    { name: "Fredoka (Bubbly / Feastables)", value: "var(--font-fredoka)" },
    { name: "Sniglet (Soft)", value: "var(--font-sniglet)" },
    { name: "Pacifico (Cursive)", value: "var(--font-pacifico)" },
    { name: "Playfair (Elegant)", value: "var(--font-playfair)" },
];

const EMOJIS = ["🌙", "⭐", "🕌", "🏮", "✨", "❤️", "🕊️", "🎉"];

const SECTION_COLORS = ["var(--lime-300)", "var(--yellow)", "var(--cyan-300)"];

const sectionVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            type: "spring" as const,
            stiffness: 260,
            damping: 20
        }
    }
};

export default function Toolbar({ templateId, onSelectTemplate, elements, updateElement, addElement, removeElement }: ToolbarProps) {
    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={{
                visible: { transition: { staggerChildren: 0.1 } }
            }}
            className="space-y-8 pb-8"
        >
            {/* Templates Section */}
            <motion.section variants={sectionVariants}>
                <div
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold mb-4"
                    style={{ background: "var(--lime-300)", border: "2px solid var(--border)", boxShadow: "2px 2px 0 var(--border)" }}
                >
                    🎨 Choose Theme
                </div>
                <div className="grid grid-cols-3 gap-3">
                    {TEMPLATES.map((t) => (
                        <motion.button
                            key={t.id}
                            whileHover={{ y: -3 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => onSelectTemplate(t.id)}
                            className={cn(
                                "h-24 rounded-2xl flex items-end p-2.5 text-xs font-semibold overflow-hidden relative group transition-all",
                                t.className
                            )}
                            style={
                                templateId === t.id
                                    ? { border: "3px solid var(--border)", boxShadow: "4px 4px 0 var(--border)", outline: "3px solid var(--yellow)", outlineOffset: "2px" }
                                    : { border: "2px solid rgba(26,26,26,0.3)", boxShadow: "2px 2px 0 rgba(26,26,26,0.3)" }
                            }
                        >
                            <span className="bg-white/95 text-gray-900 px-2 py-1.5 rounded-lg w-full text-center truncate z-10">
                                {t.name}
                            </span>
                        </motion.button>
                    ))}
                </div>
            </motion.section>

            {/* Stickers Section */}
            <motion.section variants={sectionVariants}>
                <div
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold mb-4"
                    style={{ background: "var(--yellow)", border: "2px solid var(--border)", boxShadow: "2px 2px 0 var(--border)" }}
                >
                    ✨ Add Stickers
                </div>
                <div className="flex flex-wrap gap-3">
                    {EMOJIS.map((emoji) => (
                        <motion.button
                            key={emoji}
                            whileHover={{ scale: 1.2, rotate: 10, y: -4 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => addElement(emoji, 80)}
                            className="w-12 h-12 flex items-center justify-center text-2xl rounded-xl transition-all"
                            style={{
                                background: "var(--card-bg)",
                                border: "2.5px solid var(--border)",
                                boxShadow: "3px 3px 0 var(--border)"
                            }}
                        >
                            {emoji}
                        </motion.button>
                    ))}
                </div>
            </motion.section>

            {/* Edit Content Layers */}
            <motion.section variants={sectionVariants} className="space-y-4">
                <div
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold mb-2"
                    style={{ background: "var(--cyan-300)", border: "2px solid var(--border)", boxShadow: "2px 2px 0 var(--border)" }}
                >
                    ✏️ Edit Content Layers
                </div>

                {elements.map((el, i) => {
                    const isSticker = el.id.startsWith("sticker");
                    return (
                        <motion.div
                            key={el.id}
                            layout
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="p-5 rounded-2xl space-y-4 relative group transition-all"
                            style={{
                                background: "var(--card-bg)",
                                border: "2.5px solid var(--border)",
                                boxShadow: "4px 4px 0 var(--border)"
                            }}
                        >
                            {/* Label */}
                            <div className="flex justify-between items-center">
                                <label className="text-xs font-bold capitalize flex items-center gap-2" style={{ color: "var(--foreground)" }}>
                                    <span
                                        className="w-5 h-5 rounded-lg inline-block"
                                        style={{ background: SECTION_COLORS[i % 3], border: "1.5px solid var(--border)" }}
                                    />
                                    {isSticker ? "Sticker" : el.id}
                                </label>
                                {isSticker && (
                                    <button
                                        onClick={() => removeElement(el.id)}
                                        className="p-1.5 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                                        style={{ color: "var(--coral)" }}
                                        title="Remove sticker"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                )}
                            </div>

                            {/* Text input */}
                            {el.id === "message" ? (
                                <textarea
                                    value={el.text}
                                    onChange={(e) => updateElement(el.id, { text: e.target.value })}
                                    className="w-full px-4 py-3 rounded-xl outline-none transition-all min-h-[100px] resize-none text-sm font-medium"
                                    style={{
                                        background: "var(--background)",
                                        border: "2px solid var(--border)",
                                        color: "var(--foreground)"
                                    }}
                                    placeholder="Write your message..."
                                />
                            ) : (
                                <input
                                    type="text"
                                    value={el.text}
                                    onChange={(e) => updateElement(el.id, { text: e.target.value })}
                                    className="w-full px-4 py-3 rounded-xl outline-none transition-all text-sm font-medium"
                                    style={{
                                        background: "var(--background)",
                                        border: "2px solid var(--border)",
                                        color: "var(--foreground)"
                                    }}
                                    placeholder={`Enter ${el.id}...`}
                                />
                            )}

                            {/* Color + Font */}
                            {!isSticker && (
                                <div className="flex gap-3 mt-2">
                                    <input
                                        type="color"
                                        value={el.color}
                                        onChange={(e) => updateElement(el.id, { color: e.target.value })}
                                        className="w-12 h-12 p-1 rounded-xl cursor-pointer overflow-hidden color-picker-custom"
                                        style={{ border: "2px solid var(--border)", background: "var(--background)" }}
                                        title="Text Color"
                                    />
                                    <div className="relative flex-1">
                                        <select
                                            value={el.fontFamily}
                                            onChange={(e) => updateElement(el.id, { fontFamily: e.target.value })}
                                            className="w-full h-12 px-4 appearance-none rounded-xl text-sm font-medium outline-none transition-all cursor-pointer"
                                            style={{
                                                background: "var(--background)",
                                                border: "2px solid var(--border)",
                                                color: "var(--foreground)"
                                            }}
                                        >
                                            {FONTS.map((font) => (
                                                <option key={font.value} value={font.value} style={{ fontFamily: font.value }}>
                                                    {font.name}
                                                </option>
                                            ))}
                                        </select>
                                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none opacity-60">
                                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Size Slider */}
                            <div className="pt-1">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-xs font-semibold opacity-60">Size</span>
                                    <span
                                        className="text-xs font-bold px-2 py-0.5 rounded-md"
                                        style={{ background: SECTION_COLORS[i % 3], border: "1.5px solid var(--border)" }}
                                    >
                                        {el.fontSize}
                                    </span>
                                </div>
                                <input
                                    type="range"
                                    min="16"
                                    max="120"
                                    value={el.fontSize}
                                    onChange={(e) => updateElement(el.id, { fontSize: Number(e.target.value) })}
                                    className="w-full h-2 rounded-lg appearance-none cursor-pointer"
                                    style={{ accentColor: "var(--lime-300)" }}
                                />
                            </div>
                        </motion.div>
                    );
                })}
            </motion.section>
        </motion.div>
    );
}
