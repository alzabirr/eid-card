export type Template = {
    id: string;
    name: string;
    bgUrl: string;
    bgColor: string;
    className: string;
};

export const TEMPLATES: Template[] = [
    {
        id: "classic",
        name: "Classic Emerald",
        bgUrl: "none",
        bgColor: "#065f46",
        className: "bg-gradient-to-br from-emerald-800 to-green-900 border-yellow-500",
    },
    {
        id: "night",
        name: "Crescent Night",
        bgUrl: "none",
        bgColor: "#1e1b4b",
        className: "bg-gradient-to-br from-indigo-950 to-slate-900 border-slate-300",
    },
    {
        id: "light",
        name: "Golden Dawn",
        bgUrl: "none",
        bgColor: "#fef08a",
        className: "bg-gradient-to-tr from-amber-100 to-yellow-50 border-amber-600",
    },
];

export type TextElement = {
    id: string;
    text: string;
    x: number;
    y: number;
    fontSize: number;
    color: string;
    fontFamily: string;
};
