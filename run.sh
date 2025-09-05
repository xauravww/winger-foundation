#!/bin/bash

# Winger Foundation Development Server Launcher
# This script starts the development server for the Winger Foundation website

echo "🌟 Winger Foundation Development Server"
echo "======================================"

# Check if Python is available
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 is required but not installed."
    echo "   Please install Python 3 and try again."
    exit 1
fi

# Check if server.py exists
if [ ! -f "server.py" ]; then
    echo "❌ server.py not found in current directory."
    echo "   Please run this script from the project root."
    exit 1
fi

# Check if index.html exists
if [ ! -f "index.html" ]; then
    echo "❌ index.html not found in current directory."
    echo "   Please ensure you're in the correct project directory."
    exit 1
fi

# Install watchdog if not present (optional)
if ! python3 -c "import watchdog" 2>/dev/null; then
    echo "💡 Installing watchdog for auto-reload functionality..."
    pip3 install watchdog 2>/dev/null || echo "⚠️  Could not install watchdog - auto-reload will be disabled"
fi

# Start the server
echo "🚀 Starting development server..."
python3 server.py