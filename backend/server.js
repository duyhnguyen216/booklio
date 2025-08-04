const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.post("/api/generate-url", (req, res) => {
    const { question, productId, productName, instructions } = req.body;

    const encodedProductName = encodeURIComponent(productName);
    const encodedInstructions = encodeURIComponent(instructions);
    const encodedQuestion = encodeURIComponent(question);

    const url = `https://ux1.test-atolio.cengage.info/insights?q=USE[Product: "${encodedProductName}"; Filename: ${productId}] | [${encodedInstructions}] | QUESTION: [${encodedQuestion}]`;

    res.json({ url });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

const path = require("path");

app.use(express.static(path.join(__dirname, "client")));

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "index.html"));
});
