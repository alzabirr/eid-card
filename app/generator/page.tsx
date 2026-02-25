import CardEditor from "@/components/CardEditor";

export const metadata = {
    title: "Generator | Eid Card",
    description: "Customize your Eid Card.",
};

export default function GeneratorPage() {
    return (
        <div className="min-h-screen bg-slate-100 p-4 md:p-8 flex flex-col">
            <header className="mb-6 flex justify-between items-center">
                <h1 className="text-2xl font-bold text-slate-800 tracking-tight">
                    Eid Mubarak <span className="text-emerald-600">Studio</span>
                </h1>
            </header>
            <main className="flex-1 flex flex-col xl:flex-row gap-8">
                <CardEditor />
            </main>
        </div>
    );
}
