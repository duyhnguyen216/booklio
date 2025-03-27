import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

// Fallback image
const placeholderImg = "https://www.cengage.com/covers/imageServlet?image_type=LRGFC&catalog=cengage&productISBN13=9780357693339";

// Image library mapped by product name (lowercased for safe matching) example for now waiting for resources
const imageLibrary: Record<string, string> = {
    "Economics Principles & Policy": "images/econ_principle_and_policy.jpeg",  
    "Macroeconomics Principles/Policy": "https://m.media-amazon.com/images/I/81u92ySZQ1L._AC_UF1000,1000_QL80_.jpg",
};

export default function ProductSelector({
    products,
    value,
    onChange,
}: {
    products: { id: string; name: string }[];
    value: string;
    onChange: (id: string) => void;
}) {
    const [query, setQuery] = useState("");

    const filtered = products
        .filter((product) =>
            product.name.toLowerCase().includes(query.toLowerCase())
        )
        .sort((a, b) => a.name.localeCompare(b.name)); // 🔠 Sorted by name

    const getImageUrl = (productName: string) => {
        return imageLibrary[productName] || placeholderImg;
    };

    return (
        <div className="space-y-6">
            <label className="text-lg font-semibold text-muted-foreground block text-center">
                Select a Product
            </label>

            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto">
                <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                <Input
                    type="text"
                    placeholder="Search product..."
                    className="pl-10 py-3 text-base"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
            </div>

            {/* Grid List */}
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
                                "flex flex-col items-center justify-between p-5 rounded-xl border hover:shadow-md hover:bg-muted/40 transition cursor-pointer text-center h-60",
                                product.id === value &&
                                "border-primary ring-2 ring-primary/50 bg-muted"
                            )}
                        >
                            <img
                                src={getImageUrl(product.name)}
                                alt="Book cover"
                                className="w-25 h-40 object-cover rounded border mb-3"
                                onError={(e) => (e.currentTarget.src = placeholderImg)}
                            />
                            <span className="text-base font-medium text-foreground">
                                {product.name}
                            </span>
                        </button>
                    ))
                )}
            </div>
        </div>
    );
}
