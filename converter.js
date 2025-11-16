#!/usr/bin/env node

const { program } = require('commander');
const path = require('path');
const fs = require('fs');
const { marked } = require('marked');
const pdf = require('html-pdf');

// Configure CLI
program
  .name('md-to-pdf')
  .description('Convert Markdown files to PDF')
  .version('1.0.0');

program
  .command('convert <input> [output]')
  .description('Convert a markdown file to PDF')
  .option('-s, --style <css>', 'CSS stylesheet for styling')
  .action((input, output, options) => {
    convertMarkdownToPdf(input, output, options);
  });

program.parse(process.argv);

// If no command is provided, show help
if (!process.argv.slice(2).length) {
  program.outputHelp();
}

function convertMarkdownToPdf(inputFile, outputFile, options) {
  // Resolve input file path
  const inputPath = path.resolve(inputFile);

  // Check if file exists
  if (!fs.existsSync(inputPath)) {
    console.error(`❌ Error: File not found: ${inputPath}`);
    process.exit(1);
  }

  // Generate output filename if not provided
  const outputPath = outputFile 
    ? path.resolve(outputFile)
    : path.join(path.dirname(inputPath), path.basename(inputPath, '.md') + '.pdf');

  try {
    console.log(`📄 Converting: ${inputPath}`);
    console.log(`📁 Output: ${outputPath}`);

    // Read markdown file
    const markdownContent = fs.readFileSync(inputPath, 'utf8');
    
    // Convert markdown to HTML
    const htmlContent = marked(markdownContent);

    // Read custom CSS if provided
    let customCss = '';
    if (options.style) {
      const cssPath = path.resolve(options.style);
      if (fs.existsSync(cssPath)) {
        customCss = fs.readFileSync(cssPath, 'utf8');
      }
    }

    // Read default styles
    const defaultStylesPath = path.join(__dirname, 'styles.css');
    const defaultStyles = fs.existsSync(defaultStylesPath) 
      ? fs.readFileSync(defaultStylesPath, 'utf8')
      : '';

    // Create HTML document
    const fullHtml = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
      ${defaultStyles}
      ${customCss}
    </style>
</head>
<body>
    ${htmlContent}
</body>
</html>
    `;

    // PDF options
    const pdfOptions = {
      format: 'A4',
      orientation: 'portrait',
      border: {
        top: '1cm',
        right: '1cm',
        bottom: '1cm',
        left: '1cm'
      },
      header: {
        height: '0mm'
      },
      footer: {
        height: '10mm',
        contents: {
          default: '<span style="color: #999; font-size: 10px;">Page {{page}} of {{pages}}</span>'
        }
      }
    };

    // Generate PDF
    pdf.create(fullHtml, pdfOptions).toFile(outputPath, (err, res) => {
      if (err) {
        console.error(`❌ Conversion failed: ${err.message}`);
        process.exit(1);
      } else {
        console.log(`✅ Successfully converted to: ${outputPath}`);
      }
    });

  } catch (err) {
    console.error(`❌ Conversion failed: ${err.message}`);
    process.exit(1);
  }
}
