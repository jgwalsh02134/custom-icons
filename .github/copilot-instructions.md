# Copilot Instructions: custom-icons

A static site showcasing custom SVG icon collections across themed galleries. This is a pure frontend project with no build step or dependencies.

## Architecture

**Multi-page static site** with consistent header/footer structure:
- Entry pages (`index.html`, `gallery.html`, `web-dev-images.html`, `professional-icons.html`, `my-site.html`)
- Shared styling via [`assets/styles.css`](assets/styles.css) (CSS variables, responsive grid)
- Shared behavior via [`assets/site.js`](assets/site.js) (mobile nav toggle, lazy-loading fallback, active link highlighting)
- Icon assets stored in `assets/icons_copy/` (subdirectories by theme)

**Key architectural decision:** Each HTML page is standalone with identical header/nav structure, allowing independent updates while maintaining consistency through CSS/JS.

## Patterns & Conventions

### HTML Structure
- All pages follow header → main → content pattern with semantic markup
- Skip-link (`<a class="skip-link" href="#main">`) for accessibility
- Active navigation link marked with `aria-current="page"` attribute
- Responsive nav toggle button (hidden on desktop, visible on mobile)

Example from [gallery.html](gallery.html#L10-L18):
```html
<nav class="navbar" id="primary-nav" aria-label="Primary">
  <ul>
    <li><a href="gallery.html" aria-current="page">Gallery</a></li>
  </ul>
</nav>
```

### CSS Design System
- CSS custom properties in `:root` define all colors: `--bg`, `--surface`, `--text`, `--muted`, `--primary`, `--border`, `--card`, `--focus`, `--success`
- Responsive design uses `minmax()` grids and `clamp()` for typography
- Mobile breakpoint at `720px`
- Accessibility built-in: focus states, skip-link, semantic HTML

Example icon grid from [styles.css](assets/styles.css):
```css
.icon-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); }
```

### JavaScript Patterns
- IIFE pattern to avoid global scope pollution (see [site.js](assets/site.js))
- Progressive enhancement: lazy-loading uses `data-src` fallback when `loading="lazy"` not supported
- Mobile nav uses `classList.toggle()` with `aria-expanded` state management

When adding interactivity:
1. Wrap in IIFE
2. Use `dataset` for progressive enhancement data
3. Update `aria-*` attributes for accessibility

## Development Workflow

**No build/dev server required.** Open HTML files directly in browser or use a simple HTTP server:
```bash
python3 -m http.server 8000
```

**Adding a new page:**
1. Copy existing HTML structure (e.g., from [`index.html`](index.html))
2. Update `<title>` and page content
3. Ensure nav links point to all pages
4. Mark current page with `aria-current="page"`
5. Add SVG icons to `assets/icons_copy/` subdirectory

**Adding icons:**
- Place SVG files in appropriate subdirectory under `assets/icons_copy/`
- Reference via `<img src="assets/icons_copy/[subdir]/icon.svg">` or inline `<svg>` element
- Use `alt` text for img tags (e.g., `alt="USA Icon"`)

## Integration Points

- **Icon assets:** `assets/icons_copy/` (organized by theme: project1, etc.)
- **Styling:** Single CSS file sourced by all pages (no per-page stylesheets)
- **JavaScript:** Single `site.js` with no external dependencies
- **Deployment:** GitHub Pages (live at `jgwalsh02134.github.io/custom-icons/`)

## Key Files to Reference

- [assets/styles.css](assets/styles.css) — Typography, layout, color system, responsive behavior
- [assets/site.js](assets/site.js) — Client-side interactivity pattern
- [index.html](index.html) — Full page template with all components
- [README.md](README.md) — Project purpose and icon attribution

