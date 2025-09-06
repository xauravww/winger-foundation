# TODO: Color Centralization

## Issues Found:
- style.css has duplicate color definitions conflicting with variables.css
- Many hardcoded hex colors used instead of CSS variables
- Missing color definitions in variables.css for some used colors

## Plan:
1. Identify all unique colors used across CSS files
2. Add missing colors to css/base/variables.css
3. Replace hardcoded colors with variables in all CSS files
4. Remove duplicate definitions from style.css
5. Test color consistency across the app

## Colors to Add to variables.css:
- Social media brand colors (Facebook #1877f2, Twitter #1da1f2, LinkedIn #0077b5, YouTube #ff0000, Instagram gradient)
- Additional accent colors used in gradients (#ff6b9d, #4ecdc4)
- Dark theme variations if needed

## Files to Update:
- style.css (remove duplicates, replace hardcodes)
- css/components/buttons.css
- css/components/forms.css
- css/components/notifications.css
- css/layout/footer.css
- css/layout/header.css
- css/layout/main.css
- css/sections/donate.css
- css/sections/hero.css
- css/sections/refund-policy.css
- All other CSS files with hardcoded colors
