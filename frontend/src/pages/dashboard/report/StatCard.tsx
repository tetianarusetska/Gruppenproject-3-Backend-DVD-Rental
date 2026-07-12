interface StatCardProps {
    label: string;
    value: string | number;
}

export default function StatCard({ label, value }: StatCardProps) {
    return (
        <div className="border border-white/10 rounded-xl px-6 py-5 flex flex-col gap-2">
            <span className="uppercase text-xs tracking-widest text-white/50">
                {label}
            </span>
            <span className="text-4xl font-bold">{value}</span>
        </div>
    );
}