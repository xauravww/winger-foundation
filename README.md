# 🌟 Winger Foundation Website

> Modular, responsive website for fighting hunger and providing education

## 🚀 Quick Start

### Method 1: Python Server (Recommended)
```bash
# Run the custom Python server
python3 server.py

# Or use the shell script
./run.sh
```

### Test All Sections
- **Full Website**: `http://localhost:8000/index.html`
- **All Sections Test**: `http://localhost:8000/test-all-sections.html`
- **Simple Test**: `http://localhost:8000/test-modular.html`

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
│   ├── layout/           # Header, main layout
│   ├── sections/         # Hero, cards, animations
│   └── main.css          # Main CSS file
├── js/                    # Modular JavaScript
│   ├── modules/          # Individual modules
│   └── app.js            # Main application
├── assets/               # Images and media
├── index.html            # Main website
├── test-modular.html     # Simple test page
├── server.py             # Development server
└── README-MODULAR.md     # Detailed documentation
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

### Adding New Features
1. Create CSS module in `css/components/` or `css/sections/`
2. Create JS module in `js/modules/`
3. Import in `css/main.css` and `js/app.js`

### Debugging
- Check browser console for module initialization logs
- Use `window.WingerFoundation.app.getModule('name')` to access modules
- Each module has isolated error handling

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

For detailed documentation, see [README-MODULAR.md](README-MODULAR.md)

---

**Built with ❤️ for fighting hunger and providing education**