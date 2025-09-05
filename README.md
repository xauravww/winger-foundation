# 🌟 Winger Foundation Website

> Modern, responsive website for fighting hunger and providing education

## 🚀 Quick Start

### Method 1: Python Server (Recommended)
```bash
# Run the development server with auto-reload
python3 server.py

# Or use the shell script
./run.sh
```

### Features
- **Main Website**: `http://localhost:8000` (automatically opens)
- **Auto-reload**: Changes to HTML, CSS, JS files trigger browser refresh
- **CORS enabled**: For local development
- **ES6 modules**: Full support with proper MIME types

### Method 2: Node.js
```bash
# Install dependencies
npm install

# Start development server
npm start

# Or serve directly
npm run serve
```

### Method 3: Other Options
```bash
# PHP built-in server
php -S localhost:8000

# Node.js http-server
npx http-server -p 8000 -c-1 --cors

# Python simple server
python3 -m http.server 8000
```

## 📁 Project Structure

```
├── css/                    # Modular CSS
│   ├── base/              # Reset, variables, typography
│   ├── components/        # Buttons, forms, notifications
│   ├── layout/           # Header, main layout, footer
│   ├── sections/         # All page sections
│   └── main.css          # Main CSS file
├── js/                    # Modular JavaScript
│   ├── modules/          # Individual modules
│   └── app.js            # Main application
├── assets/               # Images and media
├── index.html            # Main website
├── server.py             # Development server with auto-reload
├── run.sh                # Server launcher script
├── requirements.txt      # Optional Python dependencies
└── README.md             # This file
```

## 🎯 Features

- ✅ **Complete Website** - All 8 sections fully functional
  - 🏠 Home with hero section and stats
  - ℹ️ About Us with mission and values
  - 🍽️ Projects (Kitchen & School programs)
  - 💰 Donation system with Razorpay integration
  - 🤝 Get Involved with volunteer forms
  - 📰 News & Stories with filtering
  - 🖼️ Gallery with lightbox and filtering
  - 📞 Contact with forms and FAQ
- ✅ **Modular Architecture** - Easy to maintain and debug
- ✅ **Responsive Design** - Works on all devices
- ✅ **Modern CSS** - CSS Grid, Flexbox, Custom Properties
- ✅ **ES6 Modules** - Clean, organized JavaScript
- ✅ **Interactive Forms** - Contact, volunteer, newsletter
- ✅ **Accessibility** - WCAG compliant
- ✅ **Performance** - Optimized loading and animations

## 🛠️ Development

### Auto-reload Setup
```bash
# Install watchdog for file watching (optional)
pip install watchdog
```

### Adding New Features
1. Create CSS module in `css/components/` or `css/sections/`
2. Create JS module in `js/modules/`
3. Import in `css/main.css` and `js/app.js`
4. Changes will auto-reload in browser

### Debugging
- Check browser console for module initialization logs
- Use `window.WingerFoundation.app.getModule('name')` to access modules
- Each module has isolated error handling
- Server logs file changes in terminal

## 📱 Browser Support

- Modern browsers with ES6 module support
- CSS Grid and Flexbox support
- CSS Custom Properties support

## 🔧 Customization

### Colors
Edit `css/base/variables.css`:
```css
:root {
  --primary-orange: #ff6b35;
  --secondary-green: #2ecc71;
  /* ... */
}
```

### Layout
Modify `css/layout/main.css` for container sizes and spacing.

### Components
Add new components in `css/components/` and `js/modules/`.

## 📞 Support

- Run `python3 server.py` to start the development server
- Server automatically opens browser to main website
- File changes trigger automatic browser refresh
- Check terminal for server logs and file change notifications

---

**Built with ❤️ for fighting hunger and providing education**