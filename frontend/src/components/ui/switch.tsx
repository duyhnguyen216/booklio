// src/components/ui/Switch.tsx

interface SwitchProps<T extends string> {
    value: T;
    options: T[]; // Must be exactly 3 items
    onValueChange: (value: T) => void;
}

export function Switch<T extends string>({
    value,
    options,
    onValueChange,
}: SwitchProps<T>) {
    if (options.length !== 3) {
        throw new Error("Switch requires exactly 3 options.");
    }

    const currentIndex = options.indexOf(value);
    const nextValue = options[(currentIndex + 1) % options.length];

    return (
        <button
            type="button"
            onClick={() => onValueChange(nextValue)}
            className="px-6 py-2 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold text-sm shadow-inner transition-colors duration-200"
        >
            {value === "K12" ? "K12" : value === "Higher Ed" ? "Higher Ed" : "Off"}
        </button>
    );
}
