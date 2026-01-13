# 🌍 Flaggr

Interactive flag exploration app. Learn world geography by filtering countries based on flag colors and symbols.

[Live Demo](https://flaggr.pages.dev/)

## Features

- 🎨 Filter by 8 representative colors
- ⭐ Filter by 8 symbol types (stars, moons, crosses, etc.)
- 🗺️ Interactive map with smooth animations
- 🌐 11 languages supported (including RTL)
- 🌓 Light/Dark theme
- 📱 Responsive design (desktop, tablet, mobile)

## Tech Stack

- **Framework**: [Astro](https://astro.build/) + React + TypeScript
- **Map**: [MapLibre GL JS](https://maplibre.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI**: [shadcn/ui](https://ui.shadcn.com/)
- **Hosting**: [Cloudflare Pages](https://pages.cloudflare.com/)

## Local Development

```bash
# Install dependencies
npm install

# Copy flag SVGs
npm run setup:flags

# Start dev server
npm run dev
```

## Project Structure

```
src/
├── components/     # React components
├── config/         # Colors, symbols, languages config
├── data/           # Country data (JSON)
├── hooks/          # Custom React hooks
├── layouts/        # Astro layouts
├── lib/            # Utilities
├── pages/          # Routes (11 languages)
├── types/          # TypeScript definitions
└── utils/          # Filter functions

public/
├── data/           # GeoJSON boundary data
├── flags/          # Flag SVGs (setup:flags)
└── styles/         # Map styles (light/dark)
```

## Credits

- Flag SVGs: [country-flag-icons](https://github.com/catamphetamine/country-flag-icons)
- Country boundaries: [Natural Earth](https://www.naturalearthdata.com/)
- Map tiles: [OpenFreeMap](https://openfreemap.org/) / [OpenStreetMap](https://www.openstreetmap.org/copyright)
- Icons: [Lucide](https://lucide.dev/)

## License

MIT

---

**Note**: This is a personal hobby project. Not actively maintained. Feel free to fork!
