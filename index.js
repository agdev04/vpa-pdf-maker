const express = require("express");
const { jsPDF } = require("jspdf");
const path = require("path");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static("public"));

function generatePDF(content) {
  const doc = new jsPDF();
  doc.setFontSize(10);
  doc.text(content, 10, 10);
  const yesterday = new Date();
  // yesterday.setDate(yesterday.getDate());
  const fileName = `${yesterday.toLocaleDateString("es-CL")}.pdf`;
  const filePath = path.join("public", fileName);
  doc.save(filePath);
  return fileName;
}

app.post("/", (req, res) => {
  const { content } = req.body;
  try {
    const fileName = generatePDF(content);
    res.json({ success: true, fileName });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ success: false, error: "PDF generation failed" });
  }
});

app.listen(port, () => console.log(`App listening on port ${port}`));
