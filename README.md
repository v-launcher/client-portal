# React + Vite PWA

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules, configured as a Progressive Web App (PWA).

## GitHub Pages Deployment

This PWA is automatically deployed to GitHub Pages using GitHub Actions. The app is available at: [https://v-launcher.github.io/client-portal/](https://v-launcher.github.io/client-portal/)

### Deployment Process

1. On every push to the `main` branch, a GitHub Actions workflow builds the app
2. The built files are automatically deployed to GitHub Pages
3. The PWA includes service worker caching for offline functionality

## Development

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

### Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint

## Chrome Extension

This repository includes a Chrome extension that allows external web pages to communicate with the Client Portal PWA. The extension is located in the `chrome-extension/` folder.

### Features
- Listens for external messages from authorized web pages
- Supports multiple message types (`ping`, `getData`, `sendData`)
- Secure communication with pre-defined domains
- **Auto-update support** with `update.xml` manifest

### Installation
1. Open Chrome and go to `chrome://extensions/`
2. Enable "Developer mode"
3. Click "Load unpacked" and select the `chrome-extension` folder
4. The extension will be ready to receive messages

### Auto-Updates
The extension includes an `update.xml` file for automatic updates when hosted:
- Update manifest is deployed to GitHub Pages at `/chrome-extension/update.xml`
- Extension checks for updates automatically when `update_url` is configured
- Replace `{extension-id}` placeholder in `update.xml` with actual extension ID after installation

See the [Chrome Extension README](chrome-extension/README.md) for detailed usage instructions.

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
