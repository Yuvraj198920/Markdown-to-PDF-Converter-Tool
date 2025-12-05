import { useState, useEffect } from 'react';
import Head from 'next/head';

export default function Home() {
  const [markdown, setMarkdown] = useState('');
  const [preview, setPreview] = useState('');
  const [isConverting, setIsConverting] = useState(false);
  const [fileName, setFileName] = useState('document');

  useEffect(() => {
    // Dynamically import marked for client-side rendering
    const convertMarkdown = async () => {
      if (markdown) {
        const { marked } = await import('marked');
        setPreview(marked(markdown));
      } else {
        setPreview('');
      }
    };
    convertMarkdown();
  }, [markdown]);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name.replace('.md', ''));
      const reader = new FileReader();
      reader.onload = (event) => {
        setMarkdown(event.target.result);
      };
      reader.readAsText(file);
    }
  };

  const generatePDF = async () => {
    setIsConverting(true);
    try {
      const html2pdf = (await import('html2pdf.js')).default;
      const element = document.getElementById('preview-content');
      
      const opt = {
        margin: [10, 10, 10, 10],
        filename: `${fileName}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
      };

      await html2pdf().set(opt).from(element).save();
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error generating PDF. Please try again.');
    }
    setIsConverting(false);
  };

  const sampleMarkdown = `# Sample Document

## Introduction
This is a **sample markdown** document to demonstrate the converter.

### Features
- Convert Markdown to PDF
- Live preview
- Custom styling
- Easy to use

## Code Example
\`\`\`javascript
function hello() {
  console.log("Hello, World!");
}
\`\`\`

## Table Example
| Name | Role |
|------|------|
| John | Developer |
| Jane | Designer |

> This is a blockquote example.

---

*Thank you for using MD to PDF Converter!*
`;

  return (
    <>
      <Head>
        <title>Markdown to PDF Converter</title>
        <meta name="description" content="Convert Markdown files to PDF online" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container">
        <header className="header">
          <h1>📄 Markdown to PDF Converter</h1>
          <p>Convert your Markdown files to beautifully formatted PDFs</p>
        </header>

        <div className="toolbar">
          <div className="file-input-wrapper">
            <label htmlFor="file-upload" className="btn btn-secondary">
              📁 Upload .md File
            </label>
            <input
              id="file-upload"
              type="file"
              accept=".md,.markdown,.txt"
              onChange={handleFileUpload}
              style={{ display: 'none' }}
            />
          </div>

          <button
            className="btn btn-secondary"
            onClick={() => setMarkdown(sampleMarkdown)}
          >
            📝 Load Sample
          </button>

          <input
            type="text"
            placeholder="File name"
            value={fileName}
            onChange={(e) => setFileName(e.target.value)}
            className="filename-input"
          />

          <button
            className="btn btn-primary"
            onClick={generatePDF}
            disabled={!markdown || isConverting}
          >
            {isConverting ? '⏳ Converting...' : '📥 Download PDF'}
          </button>
        </div>

        <div className="editor-container">
          <div className="panel">
            <h3 className="panel-title">✏️ Markdown Editor</h3>
            <textarea
              className="editor"
              value={markdown}
              onChange={(e) => setMarkdown(e.target.value)}
              placeholder="Type or paste your Markdown here..."
            />
          </div>

          <div className="panel">
            <h3 className="panel-title">👁️ Preview</h3>
            <div
              id="preview-content"
              className="preview"
              dangerouslySetInnerHTML={{ __html: preview }}
            />
          </div>
        </div>

        <footer className="footer">
          <p>Built with ❤️ | Markdown to PDF Converter Tool</p>
        </footer>
      </main>
    </>
  );
}
