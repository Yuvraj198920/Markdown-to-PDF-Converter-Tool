#!/bin/bash

# Markdown to PDF Converter - Shell Wrapper
# Simple command-line script for converting markdown files to PDF

usage() {
    echo "Usage: $0 <markdown-file> [output-pdf] [-s <css-file>]"
    echo ""
    echo "Examples:"
    echo "  $0 document.md                          # Creates document.pdf"
    echo "  $0 document.md output.pdf               # Creates output.pdf"
    echo "  $0 document.md output.pdf -s styles.css # Uses custom styling"
    exit 1
}

if [ $# -lt 1 ]; then
    usage
fi

INPUT_FILE="$1"
OUTPUT_FILE="${2:-${INPUT_FILE%.md}.pdf}"
STYLE_FILE="$3"

# Check if input file exists
if [ ! -f "$INPUT_FILE" ]; then
    echo "❌ Error: File not found: $INPUT_FILE"
    exit 1
fi

# Build the command
CMD="node converter.js convert \"$INPUT_FILE\" \"$OUTPUT_FILE\""

# Add style option if provided
if [ -n "$STYLE_FILE" ] && [ "$STYLE_FILE" != "-s" ]; then
    CMD="$CMD -s \"$STYLE_FILE\""
elif [ "$3" = "-s" ] && [ -n "$4" ]; then
    CMD="$CMD -s \"$4\""
fi

# Execute the conversion
eval $CMD
