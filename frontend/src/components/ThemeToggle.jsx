import { useEffect, useState } from "react";

export default function ThemeToggle() {
    const [theme, setTheme] = useState("light");

    useEffect(() => {
        const saved = localStorage.getItem("theme");
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        const systemTheme = prefersDark ? "dark" : "light";
        const initial = saved || systemTheme;

        setTheme(initial);
        document.documentElement.classList.toggle("dark", initial === "dark");
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === "dark" ? "light" : "dark";
        setTheme(newTheme);
        localStorage.setItem("theme", newTheme);
        document.documentElement.classList.toggle("dark", newTheme === "dark");
    };

    return (
        <div className="flex justify-end mb-4">
            <button
                onClick={toggleTheme}
                className="px-3 py-1 text-sm rounded border bg-muted hover:bg-muted/80 dark:text-white"
            >
                {theme === "dark" ? "🌞 Light Mode" : "🌙 Dark Mode"}
            </button>
        </div>
    );
}
