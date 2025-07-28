import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import ProductFilter from "@/components/ProductFilter";

// Fallback image
const placeholderImg = "https://www.cengage.com/covers/imageServlet?image_type=LRGFC&catalog=cengage&productISBN13=9780357693339";

// Optional image library (fallbacks)
const imageLibrary: Record<string, string> = {
    "Economics Principles & Policy": "images/econ_principle_and_policy.jpeg",
    "Macroeconomics Principles/Policy": "https://m.media-amazon.com/images/I/81u92ySZQ1L._AC_UF1000,1000_QL80_.jpg",
};

export default function ProductSelector({
    products,
    value,
    onChange,
}: {
    products: { id: string; name: string; country: string; level: string }[];
    value: string;
    onChange: (id: string) => void;
}) {
    const [query, setQuery] = useState("");
    const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
    const [educationLevel, setEducationLevel] = useState<"Off" | "K12" | "Higher Ed">("Off");


    const toggleCountry = (country: string) => {
        setSelectedCountries((prev) =>
            prev.includes(country) ? prev.filter((c) => c !== country) : [...prev, country]
        );
    };

    const filtered = products
        .filter((product) => product.name.toLowerCase().includes(query.toLowerCase()))
        .filter((product) =>selectedCountries.length === 0 || selectedCountries.includes(product.country))
        .filter((product) => {
            if (educationLevel === "Off") return true;
            const level = product.level || "Higher Ed"; // default fallback
            if (educationLevel === "K12") return level === "K12";
            if (educationLevel === "Higher Ed") return level === "Higher Ed";
            return true;
        })
        .sort((a, b) => a.name.localeCompare(b.name));

    const getImageLocalPath = (product: { name: string; id: string }) => {
        const cleanId = product.id.replace(/\.pdf$/i, "");
        return `images/${cleanId}.jpg`;
    };

    const countryFlags: { [key: string]: string } = {
        Canada: '🇨🇦',
        USA: '🇺🇸',
    };
    return (
        <div className="w-full max-w-screen-xl mx-auto px-4 md:px-8 space-y-12">
            {/* Filter Panel */}
            <section className="bg-card text-card-foreground border border-border rounded-2xl p-6 shadow-sm space-y-6">
                <h2 className="text-xl font-semibold text-foreground text-center">Filter Products</h2>

                {/* Search bar */}
                <div className="relative max-w-xl mx-auto">
                    <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                    <Input
                        type="text"
                        placeholder="Search product..."
                        className="pl-10 py-2.5 text-base"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                </div>

                <ProductFilter
                    selectedCountries={selectedCountries}
                    onCountryChange={toggleCountry}
                    educationLevel={educationLevel}
                    onLevelChange={setEducationLevel}
                />
            </section>

            {/* Product Selection Section */}
            <section className="space-y-4">
                <h2 className="text-xl font-semibold text-foreground text-center">Ask a Product Question</h2>

                <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4">
                    {filtered.length === 0 ? (
                        <div className="col-span-full text-sm text-muted-foreground text-center">
                            No matching products
                        </div>
                    ) : (
                        filtered.map((product) => (
                            <button
                                key={product.id}
                                onClick={() => onChange(product.id)}
                                className={cn(
                                    "relative flex flex-col items-center justify-between p-5 rounded-xl border text-center h-60 transition-transform hover:shadow-md hover:bg-muted/30 cursor-pointer",
                                    product.id === value
                                        ? "border-primary ring-2 ring-primary/50 bg-muted scale-105 shadow-lg"
                                        : "opacity-90 hover:opacity-100"
                                )}
                            >
                                {product.id === value && (
                                    <div className="absolute top-2 right-2 text-primary text-xl">✅</div>
                                )}
                                <img
                                    src={getImageLocalPath(product)}
                                    alt={product.name}
                                    className="w-24 h-40 object-cover rounded border mb-3"
                                    onError={(e) => {
                                        e.currentTarget.onerror = null;
                                        e.currentTarget.src = imageLibrary[product.name] || placeholderImg;
                                    }}
                                />
                                <span className="text-sm font-medium text-foreground text-balance">
                                    {(product.country && countryFlags[product.country]) ? `${countryFlags[product.country]} ` : ''}
                                    {product.name}
                                </span>
                            </button>
                        ))
                    )}
                </div>
            </section>
        </div>
    );
}
