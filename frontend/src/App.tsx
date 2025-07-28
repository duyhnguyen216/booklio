import ThemeToggle from "@/components/ThemeToggle";
import ProductSelector from "@/components/ProductSelector";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";

const raw_products = [
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
    { name: "Illustrated Collection", id: "9780357881774_under iac isbn 9780357882474.pdf" },
    { name: "Forensic Science: Fundamentals & Investigations", id: "9780357124987.pdf", level: "K12" },
    { name: "Reach Higher Grade 1A", id: "9780357366547.pdf", level: "K12" },
    { name: "Reach Higher Grade 1B", id: "9780357366561.pdf", level: "K12" },
    { name: "Reach Higher Grade 2A", id: "9780357366813.pdf", level: "K12" },
    { name: "Reach Higher Grade 2B", id: "9780357366837.pdf", level: "K12" },
    { name: "Reach Higher Grade 3A", id: "9780357366875.pdf", level: "K12" },
    { name: "Reach Higher Grade 3B", id: "9780357366899.pdf", level: "K12" },
    { name: "Reach Higher Grade 4A", id: "9780357366936.pdf", level: "K12" },
    { name: "Reach Higher Grade 4B", id: "9780357366950.pdf", level: "K12" },
    { name: "Reach Higher Grade 5A", id: "9780357366998.pdf", level: "K12" },
    { name: "Reach Higher Grade 5B", id: "9780357367018.pdf", level: "K12" },
    { name: "Reach Higher Grade 6A", id: "9780357367056.pdf", level: "K12" },
    { name: "Reach Higher Grade 6B", id: "9780357367070.pdf", level: "K12" },
    { name: "Calculus for AP, 2e", id: "9780357431948.pdf", level: "K12" },
    { name: "Lift Fundamentals", id: "9780357501122.pdf", level: "K12" },
    { name: "Lift Level 1", id: "9780357501139.pdf", level: "K12" },
    { name: "Lift Level 2", id: "9780357501146.pdf", level: "K12" },
    { name: "Lift Level 3", id: "9780357501153.pdf", level: "K12" },
    { name: "NGL World Cultures and Geography, 3rd Edition", id: "9780357543269.pdf", level: "K12" },
    { name: "Medical Terminology for Health Professions", id: "9780357635698.pdf", level: "K12" },
    { name: "Precalculus with Limits, 5e (High School)", id: "9780357643273.pdf", level: "K12" },
    { name: "Calculus of a Single Variable, 12e (AP Edition)", id: "9780357921784.pdf", level: "K12" },
    { name: "NGL Physics, 1st Edition", id: "9780357991565.pdf", level: "K12" },
    { name: "Century 21 Accounting: Multicolumn Journal", id: "9781337565424.pdf", level: "K12" },
    { name: "Century 21 Accounting: General Journal", id: "9781337623124.pdf", level: "K12" },
    { name: "NGL World History Voyages of Exploration, 1st Edition", id: "9781337786829.pdf", level: "K12" },
    { name: "Precalculus with Limits: A Graphing Approach, 8e", id: "9781337904285.pdf", level: "K12" },
    { name: "NGL World of Chemistry, 4th edition", id: "9781337916127.pdf", level: "K12" },
    { name: "Financial Algebra: Advanced Algebra with Financial Applications, 3e", id: "9798214076089.pdf", level: "K12" },
    { name: "NGL US History American Through the Lens, Updated Edition", id: "9798214078359.pdf", level: "K12" },
    { name: "DHO Health Science", id: "9798214094359.pdf", level: "K12" },
    { name: "Lift Welcome", id: "9798214172347.pdf", level: "K12" },
    { name: "Lift Intro", id: "9798214172453.pdf", level: "K12" },
    { name: "Sociology in Our Times", id: "", country: "Canada" },
    { name: "Automotive Technology: A Systems Approach", id: "9780176796174_CX2203_lores.pdf", country: "Canada" },
    { name: "Canadian Business English", id: "9780176832193_CX2312_lores.pdf", country: "Canada" },
    { name: "Carpentry", id: "9780176884925_CX2404_lores.pdf", country: "Canada" },
    { name: "Business Communication", id: "9780176910181_CX2308_lores.pdf", country: "Canada" },
    { name: "Biology: Exploring the Diversity of Life", id: "9780176911140_CX2311_lores.pdf", country: "Canada" },
    { name: "Dosage Calculations", id: "9780176912260_CX2401_lores.pdf", country: "Canada" },
    { name: "Statistics: A Tool for Social Research and Data Analysis", id: "9780176922047_CX2409_lores.pdf", country: "Canada" },
    { name: "Understanding Human Resources Management: A Canadian Perspective", id: "9780176935597_CX2210_lores.pdf", country: "Canada" },
    { name: "PSYCH", id: "9780176945701_CX2405_lores.pdf", country: "Canada" },
    { name: "Principles of Microeconomics", id: "9781774740279_CX2308_lores.pdf", country: "Canada" },
    { name: "Principles of Macroeconomics", id: "9781774740286_CX2501_lores.pdf", country: "Canada" },
    { name: "Psychopathology: An Integrative Approach to Understanding", id: "9781774740323_p01_lores.pdf", country: "Canada" },
    { name: "HDEV", id: "9781774741078_p01_lores.pdf", country: "Canada" },
    { name: "Fundamentals of Social Research", id: "9781774741160_p01_lores.pdf", country: "Canada" },
    { name: "An Invitation to Health", id: "9781774741177_p01_lores.pdf", country: "Canada" },
    { name: "CB: Consumer Behaviour", id: "9781774746646_p01_lores.pdf", country: "Canada" },
    { name: "LOOK: Looking Out, Looking In", id: "9781774747605_CX2504_lores.pdf", country: "Canada" },
    { name: "Inclusion in Early Childhood Programs", id: "9781774747780_p01_lores.pdf", country: "Canada" },
    { name: "The Administrative Professional: Technology and Procedures", id: "9781774747797_CX2310_lores.pdf", country: "Canada" },
    { name: "Exploring Macroeconomics", id: "9781774747803_CX2302_lores.pdf", country: "Canada" },
    { name: "Exploring Microeconomics", id: "9781774747810_CX2302_lores.pdf", country: "Canada" },
    { name: "Criminology in Canada", id: "9781774747827_CX2306_lores.pdf", country: "Canada" },
    { name: "MGMT", id: "9781774747834_CX2304_lores.pdf", country: "Canada" },
    { name: "Grassroots with Readings: The Writer's Workbook", id: "9781774749630_CX2312_lores.pdf", country: "Canada" },
    { name: "Marketing Strategy", id: "9781774749647_p01_lores.pdf", country: "Canada" },
    { name: "Understanding Nutrition", id: "9781778410383_CX2505_lores.pdf", country: "Canada" },
    { name: "MKTG", id: "9781778410390_CX2407_lores.pdf", country: "Canada" },
    { name: "Sociology of Indigenous Peoples in Canada", id: "9781778412776_p01_lores.pdf", country: "Canada" },
    { name: "Sociology: Compass for a New Social World", id: "9781778412790_CX2407_lores.pdf", country: "Canada" },
    { name: "Becoming a Master Student", id: "9781778412806_p01_lores.pdf", country: "Canada" },
    { name: "Essentials of Business Communication", id: "9781778412813_CX2504_lores.pdf", country: "Canada" },
    { name: "Electrical Wiring: Industrial", id: "9781778412820_CX2504_lores.pdf", country: "Canada" },
    { name: "¡Hola!", id: "9781778412844_p01_lores.pdf", country: "Canada" },
    { name: "Electrical Wiring: Commercial", id: "9781778412851_p01_lores.pdf", country: "Canada" },
    { name: "Electrical Wiring: Residential", id: "9781778412868_p01_lores.pdf", country: "Canada" },
    { name: "Nutrition: Concepts and Controversies", id: "9781778412882_CX2503_lores.pdf", country: "Canada" },
    { name: "Psychology: Themes and Variations", id: "9781778412899_CX2502_lores.pdf", country: "Canada" },
    { name: "Delmar's Standard Textbook of Electricity", id: "9781778412974_CX2411_lores.pdf", country: "Canada" },
    { name: "Healthy Foundations in Early Childhood Settings", id: "9781778415388_p01_lores.pdf", country: "Canada" },
    { name: "Partnerships: Families and Communities in Early Childhood", id: "9781778415531_p01_lores.pdf", country: "Canada" },
    { name: "SELL", id: "9781778415562_p01_lores.pdf", country: "Canada" },
    { name: "CRIM", id: "9781778415579_p01_lores.pdf", country: "Canada" },
    { name: "Becoming and Being an Early Childhood Professional", id: "9781778416828_p01_lores.pdf", country: "Canada" },
    { name: "Observing Young Children", id: "9781778417023_p01_lores.pdf", country: "Canada" },
    { name: "Managing Human Resources", id: "9781778417924_CX2505_lores.pdf", country: "Canada" },
    { name: "Organization Theory and Design", id: "9781778417948_CX2505_lores.pdf", country: "Canada" },
    { name: "Developmental Psychology: Infancy and Childhood", id: "9781778415555_p01_lores.pdf", country: "Canada" },
    { name: "MindTap Instant Access (Multi-Term) for Pride's Business", id: "9781778417658_CX2505_lores.pdf", country: "Canada" }

];

 const products = raw_products.map((p) => ({
    id: p.id,
    name: p.name,
    country: p.country ?? "", // or "Unknown", or "" — your default
    level: (p.level === "K12" || p.level === "Higher Ed") ? p.level : "Higher Ed", // default fallback
}));

export default function App() {
    const [question, setQuestion] = useState("");
    const [productId, setProductId] = useState(products[0].id);
    const [instructions, setInstructions] = useState("");
    const [generatedUrl, setGeneratedUrl] = useState("");
    const [showPrompt, setShowPrompt] = useState(false);
    const questionRef = useRef<HTMLTextAreaElement | null>(null);

    function scrollToSmoothly(pos: number, time: number = 500) {
        const currentPos = window.pageYOffset;
        let start: number | null = null;

        window.requestAnimationFrame(function step(currentTime) {
            if (!start) start = currentTime;
            const progress = currentTime - start;
            const distance = pos - currentPos;
            const delta = (distance * progress) / time;

            window.scrollTo(0, currentPos + delta);

            if (progress < time) {
                window.requestAnimationFrame(step);
            } else {
                window.scrollTo(0, pos);
            }
        });
    }

    useEffect(() => {
        setInstructions(
            "INSTRUCTIONS: 1) In your answer give a quick summary, the location(s) in which this subject is found in the book, and then a few bullet points with useful details elucidating your response"
        );
        // Focus on question field
        questionRef.current?.focus();
    }, []);

    const getProductName = (id: string) => {
        const product = products.find((p) => p.id === id);
        return product ? product.name : "";
    };

    const handleSubmit = async () => {
        if (!question.trim()) {
            alert("Please enter a question before submitting!");
            return;
        }
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
                        ref={questionRef}
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
                        onChange={(id) => {
                            setProductId(id);

                            setTimeout(() => {
                                if (questionRef.current) {
                                    scrollToSmoothly(0, 300);
                                    questionRef.current.focus();
                                }
                            }, 200); // slight delay to give feedback
                        }}
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
