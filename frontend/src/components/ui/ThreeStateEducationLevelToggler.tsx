const EDUCATION_LEVELS = ["Off", "K12", "Higher Ed"] as const;
type EducationLevel = (typeof EDUCATION_LEVELS)[number];

interface EducationToggleProps {
    educationLevel: EducationLevel;
    onLevelChange: (level: EducationLevel) => void;
}

export function EducationToggle({ educationLevel, onLevelChange }: EducationToggleProps) {
    return (
        <div className="relative flex rounded-full border border-white text-white bg-gradient-to-br from-gray-800 to-purple-800 p-1 w-[192px] h-10 shadow-md">
            {EDUCATION_LEVELS.map((level) => (
                <button
                    key={level}
                    onClick={() => onLevelChange(level)}
                    className={`flex-1 z-10 text-sm font-semibold transition-colors duration-200 rounded-full ${educationLevel === level ? "text-black" : "text-white"
                        }`}
                >
                    {level}
                </button>
            ))}
            <div
                className="absolute top-1 bottom-1 w-1/3 rounded-full bg-white transition-transform duration-300"
                style={{
                    transform: `translateX(${EDUCATION_LEVELS.indexOf(educationLevel) * 100}%)`,
                }}
            />
        </div>
    );
}
