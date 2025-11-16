# Markdown to PDF Converter Tool

A command-line tool to convert Markdown files to PDF format with customizable styling options.

## Installation

```bash
npm install
```

## Usage

### Method 1: Using npm script (Recommended)

Convert a markdown file to PDF with automatic output naming:

```bash
npm run convert sainik_school_complete_solution_sheet.md
```

This will create `sainik_school_complete_solution_sheet.pdf` in the same directory.

### Method 2: Using shell script

```bash
./convert.sh sainik_school_complete_solution_sheet.md
./convert.sh sainik_school_complete_solution_sheet.md custom-output.pdf
./convert.sh sainik_school_complete_solution_sheet.md custom-output.pdf -s styles.css
```

### Method 3: Direct Node command

```bash
node converter.js convert sainik_school_complete_solution_sheet.md
node converter.js convert sainik_school_complete_solution_sheet.md output.pdf -s styles.css
```

## Options

- `-s, --style <css>` - Path to custom CSS stylesheet for PDF styling
- `-d, --draft` - Generate draft version without optimizations

## Features

- ✅ Converts Markdown to PDF
- ✅ Customizable CSS styling
- ✅ A4 paper format (portrait)
- ✅ Automatic output naming
- ✅ Error handling and validation
- ✅ Command-line interface with Commander.js

## CSS Customization

Create a `styles.css` file to customize the PDF appearance:

```css
body {
  font-family: 'Arial', sans-serif;
  font-size: 14px;
  line-height: 1.6;
  color: #333;
}

h1 {
  color: #2c3e50;
  border-bottom: 2px solid #3498db;
  padding-bottom: 10px;
}

h2 {
  color: #34495e;
  margin-top: 20px;
}

code {
  background-color: #ecf0f1;
  padding: 2px 6px;
  border-radius: 3px;
}

pre {
  background-color: #2c3e50;
  color: #ecf0f1;
  padding: 15px;
  border-radius: 5px;
  overflow-x: auto;
}
```

Then use it:

```bash
npm run convert sainik_school_complete_solution_sheet.md -s styles.css
```

## Requirements

- Node.js 12+
- npm 6+

## Dependencies

- `markdown-pdf` - Converts Markdown to PDF
- `commander` - Command-line interface framework

## Troubleshooting

### "File not found" error
Ensure the markdown file path is correct and the file exists in the current directory.

### PDF generation slow
This is normal for the first conversion as phantomjs initializes. Subsequent conversions are faster.

### Custom CSS not applied
Ensure the CSS file path is correct and the file exists.

## License

MIT
