import { Switch } from "@/components/ui/switch";

interface ProductFilterProps {
    selectedCountries: string[];
    onCountryChange: (country: string) => void;
    educationLevel: "Off" | "K12" | "Higher Ed";
    onLevelChange: (level: "Off" | "K12" | "Higher Ed") => void;
    onClearFilters?: () => void;
    hasActiveFilters?: boolean;
}

const COUNTRY_OPTIONS = ["Canada", "USA", "International"];

export default function ProductFilter({
    selectedCountries,
    onCountryChange,
    educationLevel,
    onLevelChange,
    onClearFilters,
    hasActiveFilters,
}: ProductFilterProps) {

    return (
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between bg-card text-card-foreground px-4 py-4 rounded-xl border shadow-sm">
            {/* Country checkboxes */}
            <div className="flex flex-wrap gap-4 items-center justify-center">
                {COUNTRY_OPTIONS.map((country) => (
                    <label
                        key={country}
                        className="flex items-center space-x-2 text-sm text-muted-foreground"
                    >
                        <input
                            type="checkbox"
                            checked={selectedCountries.includes(country)}
                            onChange={() => onCountryChange(country)}
                            className="accent-primary"
                        />
                        <span>{country}</span>
                    </label>
                ))}
            </div>

            {/* Education Level Toggle */}
            <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground font-medium">Level:</span>
                <Switch
                    value={educationLevel}
                    options={["Off", "K12", "Higher Ed"]}
                    onValueChange={onLevelChange}
                />
            </div>

            {/* Clear Button */}
            {hasActiveFilters && onClearFilters && (
                <div className="flex justify-center md:justify-end w-full md:w-auto">
                    <button
                        onClick={onClearFilters}
                        className="text-xs text-primary hover:underline transition"
                    >
                        Clear All Filters
                    </button>
                </div>
            )}
        </div>
    );
}

