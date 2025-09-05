#!/usr/bin/env python3
"""
Development server for the Winger Foundation website
Serves static files with basic auto-reload functionality
"""

import http.server
import socketserver
import webbrowser
import os
import sys
from pathlib import Path

class WingerHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    """Custom request handler with auto-reload support"""
    
    def end_headers(self):
        # Add CORS headers for development
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        # Disable caching for development
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        
        # Set proper MIME types
        if self.path.endswith('.js'):
            self.send_header('Content-Type', 'application/javascript')
        elif self.path.endswith('.css'):
            self.send_header('Content-Type', 'text/css')
        elif self.path.endswith('.html'):
            self.send_header('Content-Type', 'text/html; charset=utf-8')
            
        super().end_headers()
    
    def do_GET(self):
        """Handle GET requests with custom routing"""
        # Serve index.html for root path
        if self.path == '/' or self.path == '':
            self.path = '/index.html'
        
        # Handle favicon requests
        if self.path == '/favicon.ico':
            self.send_error(404)
            return
            
        # Inject auto-reload script for HTML files
        if self.path.endswith('.html'):
            try:
                file_path = self.path.lstrip('/')
                if os.path.exists(file_path):
                    with open(file_path, 'r', encoding='utf-8') as f:
                        content = f.read()
                    
                    # Inject simple auto-reload script before closing body tag
                    auto_reload_script = '''
<script>
(function() {
    // Simple auto-reload every 3 seconds when files change
    let reloadTimer;
    
    function scheduleReload() {
        if (reloadTimer) clearTimeout(reloadTimer);
        reloadTimer = setTimeout(() => {
            fetch(window.location.href, { 
                method: 'HEAD',
                cache: 'no-cache'
            }).then(() => {
                // Check if we should reload (simple time-based approach)
                const lastReload = localStorage.getItem('lastReload');
                const now = Date.now();
                if (!lastReload || now - parseInt(lastReload) > 5000) {
                    localStorage.setItem('lastReload', now.toString());
                    // Only reload if document is visible
                    if (!document.hidden) {
                        console.log('🔄 Auto-reload triggered');
                        window.location.reload();
                    }
                }
            }).catch(() => {
                // Server might be restarting, try again
                scheduleReload();
            });
        }, 3000);
    }
    
    // Start checking for updates
    scheduleReload();
    
    // Handle visibility changes
    document.addEventListener('visibilitychange', () => {
        if (!document.hidden) {
            scheduleReload();
        }
    });
    
    console.log('🔄 Auto-reload enabled (checks every 3 seconds)');
})();
</script>'''
                    
                    if '</body>' in content:
                        content = content.replace('</body>', auto_reload_script + '\n</body>')
                    else:
                        content += auto_reload_script
                    
                    self.send_response(200)
                    self.send_header('Content-type', 'text/html; charset=utf-8')
                    self.send_header('Content-length', len(content.encode('utf-8')))
                    self.end_headers()
                    self.wfile.write(content.encode('utf-8'))
                    return
            except Exception as e:
                print(f"Error serving HTML file: {e}")
        
        return super().do_GET()
    
    def log_message(self, format, *args):
        """Custom log format"""
        print(f"{self.address_string()} - - [{self.log_date_time_string()}] {format % args}")

def find_free_port(start_port=8000, max_attempts=10):
    """Find a free port starting from start_port"""
    import socket
    
    for port in range(start_port, start_port + max_attempts):
        try:
            with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
                s.bind(('localhost', port))
                return port
        except OSError:
            continue
    
    raise RuntimeError(f"Could not find a free port in range {start_port}-{start_port + max_attempts}")

def main():
    """Main server function"""
    # Change to the directory containing this script
    script_dir = Path(__file__).parent
    os.chdir(script_dir)
    
    # Check if index.html exists
    if not os.path.exists('index.html'):
        print("❌ Error: index.html not found in current directory")
        sys.exit(1)
    
    # Find a free port
    try:
        PORT = find_free_port()
    except RuntimeError as e:
        print(f"❌ Error: {e}")
        sys.exit(1)
    
    # Create server
    Handler = WingerHTTPRequestHandler
    
    try:
        with socketserver.TCPServer(("", PORT), Handler) as httpd:
            print("🌟 Starting Winger Foundation Development Server...")
            print(f"📁 Serving from: {os.getcwd()}")
            print(f"🌐 Server running at: http://localhost:{PORT}")
            print(f"🏠 Main site: http://localhost:{PORT}")
            print("🔄 Auto-reload enabled (basic implementation)")
            print()
            print("💡 Press Ctrl+C to stop the server")
            print()
            
            # Open browser automatically to main site
            try:
                webbrowser.open(f'http://localhost:{PORT}')
                print("🚀 Browser opened automatically!")
            except Exception as e:
                print(f"⚠️  Could not open browser automatically: {e}")
                print(f"   Please open http://localhost:{PORT} manually")
            
            print(f"✅ Server started successfully on port {PORT}")
            httpd.serve_forever()
            
    except KeyboardInterrupt:
        print("\n🛑 Server stopped by user")
    except Exception as e:
        print(f"❌ Server error: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main()