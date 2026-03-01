export type Template = {
    id: string;
    name: string;
    bgUrl: string;
    bgColor: string;
    className: string;
};

export const TEMPLATES: Template[] = [
    {
        id: "violet",
        name: "Violet Dream",
        bgUrl: "none",
        bgColor: "#A8A6FF",
        className: "bg-gradient-to-br from-[#A8A6FF] to-[#807dfa] border-[#141414]",
    },
    {
        id: "pink",
        name: "Pink Fizz",
        bgUrl: "none",
        bgColor: "#FFA6F6",
        className: "bg-gradient-to-br from-[#FFA6F6] to-[#fa7fee] border-[#141414]",
    },
    {
        id: "lime",
        name: "Lime Fresh",
        bgUrl: "none",
        bgColor: "#9dfc7c",
        className: "bg-gradient-to-br from-[#9dfc7c] to-[#7df752] border-[#141414]",
    },
    {
        id: "cyan",
        name: "Cyan Splash",
        bgUrl: "none",
        bgColor: "#A6FAFF",
        className: "bg-gradient-to-br from-[#A6FAFF] to-[#53f2fc] border-[#141414]",
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
