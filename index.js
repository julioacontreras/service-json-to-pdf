import fs from 'fs'
import path from 'path'
import express from 'express'
import PdfPrinter from 'pdfmake'

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const port = 3000

const dir = path.resolve('')

const printer = new PdfPrinter({
  Roboto: {
		normal: dir + '/assets/fonts/Roboto-Regular.ttf',
		bold: dir + '/assets/fonts/Roboto-Medium.ttf',
		italics:dir + '/assets/fonts/Roboto-Italic.ttf',
		bolditalics: dir + '/assets/fonts/Roboto-MediumItalic.ttf'
  }
})

app.get('/', (req, res) => {
  res.send('Works!')
});

app.post('/', (req, res) => {
  const docDefinition = req.body;
  const pdfDoc = printer.createPdfKitDocument(docDefinition)
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'attachment; filename=report.pdf');  
  pdfDoc.pipe(fs.createWriteStream('output.pdf'))
  pdfDoc.pipe(res)
  pdfDoc.end()
})

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`)
});