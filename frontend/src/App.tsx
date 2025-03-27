import ThemeToggle from "@/components/ThemeToggle";
import ProductSelector from "@/components/ProductSelector";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";

const products = [
    { name: "Economics Principles & Policy", id: "9781337696326_p02_lores.pdf" },
    { name: "Macroeconomics Principles/Policy", id: "9781337794985_p01_lores.pdf" },
    { name: "Macroeconomics", id: "9781305696082_under 9781285859477.pdf" },
    { name: "Microeconomics", id: "9781285859484_p01_updf.pdf" },
    { name: "Economics", id: "9781305695702_under 9781285859460.pdf" },
    { name: "Macroeconomics Contemporary Introduction", id: "9781305505490_p01_updf.pdf" },
    { name: "Microeconomics Contemporary Introduction", id: "9781305631625_under 9781305505537.pdf" },
    { name: "Econ Macro", id: "9780357902080_p01_lores.pdf" },
    { name: "Econ Micro", id: "9780357901960_CX2411_lores.pdf" },
    { name: "Management", id: "9780357139752_CX2201_lores.pdf" },
    { name: "Understanding Management", id: "9780357716892_p01_lores.pdf" },
    { name: "Fundamentals Of Management", id: "9780357517345_CX2201_lores.pdf" },
    { name: "Management", id: "9780357517123_CX2202_lores.pdf" },
    { name: "Mgmt", id: "9780357137727_p01_lores.pdf" },
    { name: "Contemporary Marketing", id: "9780357461709_CX2201_lores.pdf" },
    { name: "Mktg", id: "9780357929216_p01_lores.pdf" },
    { name: "Foundations Marketing", id: "9780357129463_CX2210_lores.pdf" },
    { name: "Marketing", id: "9780357984260_CX2408_lores.pdf" },
    { name: "Business Analytics Data Analysis/Decision Making", id: "9780357984581_p01_lores.pdf" },
    { name: "Business Analytics", id: "9780357902202_CX2402_lores.pdf" },
    { name: "Spreadsheet Modeling/Decision Analysis", id: "9780357132098_CX2308_lores.pdf" },
    { name: "Essential Modern Business Statistics W/Ms Excel", id: "9780357930045_p01_lores.pdf" },
    { name: "Essentials Statistics Business/Economics", id: "9780357716014_p01_lores.pdf" },
    { name: "Modern Business Statistics W/Ms Excel", id: "9780357929889_p01_lores.pdf" },
    { name: "Statistics Business & Economics", id: "9780357715857_CX2310_lores.pdf" },
    { name: "Statistics Management/Economics", id: "9780357714270_CX2411_lores.pdf" },
    { name: "Discovering Psychology Science Of Mind", id: "9780357363232_CX2312_lores.pdf" },
    { name: "Introduction Psychology Gateways To Mind & Behavior", id: "9780357371398_CX2210_lores.pdf" },
    { name: "Essentials Of Psychology Concepts & Applications", id: "9780357375587_CX2210_lores.pdf" },
    { name: "What Is Psychology Foundations Applications & Integration", id: "9780357373965_CX2210_lores.pdf" },
    { name: "Psych", id: "9780357432921_CX2202_lores.pdf" },
    { name: "Psychology Themes/Variations", id: "9780357374825_CX2408_lores.pdf" },
    { name: "Anatomy & Physiology", id: "9780357802212_CX2501_lores.pdf" },
    { name: "Anatomy & Physiology Lab Manual", id: "9780357909164_CX2401_lores.pdf" },
    { name: "Biology Concepts/Applications", id: "9781305967335_CX2202_lores.pdf" },
    { name: "Biology Unity & Diversity Of Life", id: "9781337677585_under 9781337408332.pdf" },
    { name: "Biology Dynamic Science", id: "9780357134894_CX2302_lores.pdf" },
    { name: "Biology", id: "9781337392938_lores.pdf" },
    { name: "Chemistry For Engineering Students", id: "9780357974803_p01_lores.pdf" },
    { name: "General Chemistry", id: "9781305580343_CX2407_lores.pdf" },
    { name: "Financial Accounting", id: "9780357984949_p01_lores.pdf" },
    { name: "Using Financial Accounting", id: "9780357507858_CX2308_lores.pdf" },
    { name: "Corporate Financial Accounting", id: "9780357929629_CX2408_lores.pdf" },
    { name: "Financial Accounting", id: "9780357899830_CX2402_lores.pdf" },
    { name: "Managerial Accounting Cornerstone Business Decision Making", id: "9780357715345_p01_lores.pdf" },
    { name: "Managerial Accounting", id: "9780357715222_CX2401_lores.pdf" },
    { name: "Financial/Managerial Accounting", id: "9780357714041_CX2205_lores.pdf" },
    { name: "Accounting", id: "9780357899649_CX2401_lores.pdf" },
    { name: "Survey Of Accounting", id: "9780357900291_p01_lores.pdf" },
    { name: "Algebra And Trigonometry", id: "9780357753644_p01_lores.pdf" },
    { name: "Algebra & Trigonometry W/Analytic Geometry", id: "9780840068521_CX2208_lores.pdf" },
    { name: "College Algebra", id: "9780357753651_p01_lores.pdf" },
    { name: "Precalculus Enhanced Edition", id: "9781305663107_CX2311_lores.pdf" },
    { name: "Precalculus", id: "9780840068620_p09_lores.pdf" },
    { name: "Precalculus Mathematics Calculus", id: "9780357753637_CX2302_lores.pdf" },
    { name: "Precalculus Functions & Graphs", id: "9781337552332_CX2307_lores.pdf" },
    { name: "Trigonometry", id: "9781111574482_CX2311_lores.pdf" },
    { name: "Algebra & Trigonometry", id: "9780357452080_CX2407_lores.pdf" },
    { name: "Algebra/Trigonometry Real Mathematics Real People", id: "9781305071735_CX2210_lores.pdf" },
    { name: "College Algebra", id: "9780357454091_CX2405_lores.pdf" },
    { name: "Precalculus", id: "9780357456996_CX2201_lores.pdf" },
    { name: "Precalculus Real Mathematics Real People", id: "9781305071704_p01_lores.pdf" },
    { name: "Precalculus With Limits", id: "9780357457856_CX2408_lores.pdf" },
    { name: "Precalculus: A Concise Course", id: "9781285628677_under 9781133960744.pdf" },
    { name: "Trigonometry", id: "9780357455210_CX2201_lores.pdf" },
    { name: "Trigonometry Right Triangle Approach", id: "9780357381809_CX2201_lores.pdf" },
    { name: "Economics Private/Public Choice", id: "9780357134245_under 9780357133996.pdf" },
    { name: "Macroeconomics Private/Public Choice", id: "9780357134009_CX2202_lores.pdf" },
    { name: "Microeconomics Private/Public Choice", id: "9780357134016_CX2201_lores.pdf" },
    { name: "Brief Principles Macroeconomics", id: "9780357723067_CX2304_lores.pdf" },
    { name: "Essentials Economics", id: "9780357723166_CX2409_lores.pdf" },
    { name: "Principles Macroeconomics", id: "9780357722961_CX2304_lores.pdf" },
    { name: "Principles Microeconomics", id: "9780357722862_p01_lores.pdf" },
    { name: "Principles Of Economics", id: "9780357722718_CX2405_lores.pdf" },
    { name: "Economics Today", id: "9780357720936_CX2407_lores.pdf" },
    { name: "Macroeconomics Today", id: "9780357721094_CX2407_lores.pdf" },
    { name: "Microeconomics Today", id: "9780357721193_p01_lores.pdf" },
    { name: "Economics", id: "9780357720370_p01_lores.pdf" },
    { name: "Macroeconomics", id: "9780357720530_p01_lores.pdf" },
    { name: "Microeconomics", id: "9780357720639_p01_lores.pdf" },
    { name: "Chemistry & Chemical Reactivity", id: "9780357851401_CX2306_lores.pdf" },
    { name: "Chemical Principles", id: "9781305581982_CX2310_lores.pdf" },
    { name: "Chemistry", id: "9780357850671_p01_lores.pdf" },
    { name: "Chemistry Atoms First Approach", id: "9780357363362_CX2201_lores.pdf" },
    { name: "Illustrated Collection", id: "9780357881774_under iac isbn 9780357882474.pdf" }
];


export default function App() {
    const [question, setQuestion] = useState("");
    const [productId, setProductId] = useState(products[0].id);
    const [instructions, setInstructions] = useState("");
    const [generatedUrl, setGeneratedUrl] = useState("");
    const [showPrompt, setShowPrompt] = useState(false);

    useEffect(() => {
        setInstructions(
            "INSTRUCTIONS: 1) In your answer give a quick summary, the location(s) in which this subject is found in the book, and then a few bullet points with useful details elucidating your response"
        );
    }, []);

    const getProductName = (id: string) => {
        const product = products.find((p) => p.id === id);
        return product ? product.name : "";
    };

    const handleSubmit = async () => {
        const productName = getProductName(productId);

        const res = await fetch("/api/generate-url", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                question: encodeURIComponent(question),
                productId,
                productName: encodeURIComponent(productName),
                instructions: encodeURIComponent(instructions),
            }),
        });

        const { url } = await res.json();
        setGeneratedUrl(url);
        window.open(url, "_blank");
    };

    return (
        <main className="min-h-screen bg-background text-foreground text-base md:text-lg">
            {/* container */}
            <div className="w-full max-w-7xl px-4 md:px-12 xl:px-24 py-8 space-y-12 mx-auto">
                {/* top bar */}
                <div className="flex justify-end">
                    <ThemeToggle />
                </div>

                {/* main title */}
                <h1 className="text-4xl font-bold text-center">
                    Ask a Product Question
                </h1>

                {/* question box */}
                <div className="space-y-2 max-w-2xl mx-auto text-center">
                    <label className="text-sm font-medium text-muted-foreground">
                        Your Question
                    </label>
                    <Textarea
                        placeholder="Type your question here..."
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter" && !e.shiftKey) {
                                e.preventDefault(); // prevent newline
                                handleSubmit();     // trigger submit
                            }
                        }}
                    />

                </div>

                {/* product selector */}
                <div className="space-y-2 max-w-5xl mx-auto text-left">
                    <ProductSelector
                        products={products}
                        value={productId}
                        onChange={setProductId}
                    />
                </div>

                {/* prompt toggle + editor */}
                <div className="max-w-2xl mx-auto text-center">
                    <button
                        onClick={() => setShowPrompt(!showPrompt)}
                        className="text-xs text-blue-600 hover:underline transition"
                    >
                        {showPrompt ? "Hide System Prompt" : "Show System Prompt"}
                    </button>

                    {showPrompt && (
                        <div className="mt-2 space-y-2">
                            <label className="text-sm font-medium text-muted-foreground">
                                System Prompt
                            </label>
                            <Textarea
                                value={instructions}
                                onChange={(e) => setInstructions(e.target.value)}
                            />
                        </div>
                    )}
                </div>


                {/* result */}
                {generatedUrl && (
                    <div className="space-y-2 max-w-2xl mx-auto text-center">
                        <label className="text-sm font-medium text-muted-foreground">
                            Generated URL
                        </label>
                        <Input readOnly value={generatedUrl} />
                    </div>
                )}
            </div>
            <footer className="w-full text-center text-sm text-muted-foreground py-6 bg-background">
                <p>
                    Internal application developed and maintained by Duy Nguyen
                </p>
                <p>
                    For support, please contact <a href="mailto:duy.nguyen@cengage.com" className="underline hover:text-blue-500">not.SHOWING.you.my.email@cengage.com</a>
                </p>
            </footer>


            {/* submit button */}
            <div className="h-20" /> {/* spacer to prevent overlap */}
            <div className="fixed bottom-0 left-0 w-full bg-background border-t p-4 shadow-sm flex justify-center z-50">
                <Button onClick={handleSubmit} className="px-6 py-3 text-base w-full max-w-sm">
                    Submit
                </Button>
            </div>
        </main>

    );
}
