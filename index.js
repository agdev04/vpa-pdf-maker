const express = require("express");
const app = express();
const port = 3000;
const { jsPDF } = require("jspdf");
const bodyParser = require("body-parser");

app.use(bodyParser.json());

function generatePDFWithDownloadableLink(content) {
  try {
    const doc = new jsPDF();
    doc.setFontSize(10);
    doc.text(content, 10, 10);
    doc.save(`public/${new Date().toLocaleDateString("es-CL")}.pdf`);
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}

app.post("/", (req, res) => {
  console.log(req.body);

  const { content } = req.body;

  generatePDFWithDownloadableLink(content);

  res.send({
    success: true,
  });
});

app.use(express.static("public"));

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
