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
  const fileName = `${formatDate(yesterday)}.pdf`;
  const filePath = path.join("public", fileName);
  doc.save(filePath);
  return fileName;
}

const formatDate = (date) => {
  const tomorrow = new Date(date.getTime() + 1000 * 60 * 60 * 24);
  const day = String(tomorrow.getDate()).padStart(2, "0");
  const month = String(tomorrow.getMonth() + 1).padStart(2, "0");
  const year = tomorrow.getFullYear();
  return `${day}-${month}-${year}`;
};

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
