#!/usr/bin/env python3
"""
Simple HTTP Server for Winger Foundation Website
Supports ES6 modules and proper MIME types
"""

import http.server
import socketserver
import webbrowser
import os
from pathlib import Path

class CustomHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        # Add CORS headers for local development
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        
        # Set proper MIME types for ES6 modules
        if self.path.endswith('.js'):
            self.send_header('Content-Type', 'application/javascript')
        elif self.path.endswith('.css'):
            self.send_header('Content-Type', 'text/css')
        elif self.path.endswith('.html'):
            self.send_header('Content-Type', 'text/html')
            
        super().end_headers()

def run_server(port=8000):
    """Run the development server"""
    
    # Change to the directory containing this script
    os.chdir(Path(__file__).parent)
    
    print(f"🌟 Starting Winger Foundation Development Server...")
    print(f"📁 Serving from: {os.getcwd()}")
    print(f"🌐 Server running at: http://localhost:{port}")
    print(f"🏠 Main site: http://localhost:{port}/index.html")
    print(f"🧪 All sections test: http://localhost:{port}/test-all-sections.html")
    print(f"🎨 Footer demo: http://localhost:{port}/footer-demo.html")
    print(f"📱 Simple test: http://localhost:{port}/test-modular.html")
    print(f"📖 Documentation: http://localhost:{port}/README-MODULAR.md")
    print(f"\n💡 Press Ctrl+C to stop the server\n")
    
    try:
        with socketserver.TCPServer(("", port), CustomHTTPRequestHandler) as httpd:
            # Try to open browser automatically
            try:
                webbrowser.open(f'http://localhost:{port}/test-all-sections.html')
                print("🚀 Browser opened automatically!")
            except:
                print("🔧 Please open your browser manually")
            
            print(f"✅ Server started successfully on port {port}")
            httpd.serve_forever()
            
    except KeyboardInterrupt:
        print("\n🛑 Server stopped by user")
    except OSError as e:
        if "Address already in use" in str(e):
            print(f"❌ Port {port} is already in use. Trying port {port + 1}...")
            run_server(port + 1)
        else:
            print(f"❌ Error starting server: {e}")

if __name__ == "__main__":
    run_server()