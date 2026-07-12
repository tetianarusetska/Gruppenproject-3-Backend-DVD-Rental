interface BarRowProps {
    label: string;
    value: number;
    max: number;
    right?: string | number;
}

export default function BarRow({ label, value, max, right }: BarRowProps) {
    const pct = max === 0 ? 0 : Math.round((value / max) * 100);

    return (
        <div className="flex flex-col gap-1">
            <div className="flex justify-between text-sm">
                <span>{label}</span>
                <span className="text-white/70">{right ?? value}</span>
            </div>
            <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                <div
                    className="h-full bg-white rounded-full"
                    style={{ width: `${pct}%` }}
                />
            </div>
        </div>
    );
}