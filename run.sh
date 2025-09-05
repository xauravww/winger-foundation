#!/bin/bash

# Winger Foundation Website Runner
# This script provides multiple ways to run the website

echo "🌟 Winger Foundation Website Runner"
echo "=================================="
echo ""

# Check if Python is available
if command -v python3 &> /dev/null; then
    echo "✅ Python 3 found"
    echo "🚀 Starting development server..."
    echo ""
    python3 server.py
elif command -v python &> /dev/null; then
    echo "✅ Python found"
    echo "🚀 Starting development server..."
    echo ""
    python server.py
else
    echo "❌ Python not found. Please install Python or use one of these alternatives:"
    echo ""
    echo "📋 Alternative Methods:"
    echo "1. Node.js: npx http-server -p 8000 -c-1"
    echo "2. PHP: php -S localhost:8000"
    echo "3. Live Server extension in VS Code"
    echo "4. Any other local web server"
    echo ""
    echo "⚠️  Note: ES6 modules require a web server (not file:// protocol)"
fi