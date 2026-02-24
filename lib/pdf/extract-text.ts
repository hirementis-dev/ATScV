'use server';

async function extractWithPdfJs(file: File): Promise<string> {
  const pdfjs = await import('pdfjs-dist/legacy/build/pdf.mjs');
  const data = new Uint8Array(await file.arrayBuffer());
  const loadingTask = pdfjs.getDocument({ data });
  const doc = await loadingTask.promise;

  try {
    const chunks: string[] = [];

    for (let pageNum = 1; pageNum <= doc.numPages; pageNum += 1) {
      const page = await doc.getPage(pageNum);
      const textContent = await page.getTextContent();

      const pageText = textContent.items
        .map((item: any) => ('str' in item ? item.str : ''))
        .join(' ')
        .trim();

      if (pageText) chunks.push(pageText);
    }

    return chunks.join('\n\n').trim();
  } finally {
    await loadingTask.destroy();
  }
}

async function extractWithPdfParse(file: File): Promise<string> {
  const { PDFParse } = await import('pdf-parse');
  const arrayBuffer = await file.arrayBuffer();
  const pdf = new PDFParse({ data: new Uint8Array(arrayBuffer) });

  try {
    const pdfData = await pdf.getText();
    return (pdfData.text ?? '').trim();
  } finally {
    await pdf.destroy();
  }
}

export async function extractPdfText(file: File): Promise<string> {
  try {
    const pdfJsText = await extractWithPdfJs(file);
    if (pdfJsText) return pdfJsText;
  } catch (error) {
    console.error('pdfjs-dist extraction failed:', error);
  }

  const fallbackText = await extractWithPdfParse(file);
  if (!fallbackText) {
    throw new Error('Unable to extract text from PDF.');
  }

  return fallbackText;
}
