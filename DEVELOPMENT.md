# Development Guide

This guide provides detailed instructions for developing, building, testing, and packaging the Live Tailwind Previewer VS Code extension.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16 or higher) - [Download here](https://nodejs.org/)
- **npm** or **yarn** - Comes with Node.js
- **VS Code** - [Download here](https://code.visualstudio.com/)
- **Git** - For version control

## Quick Start

1. **Clone the repository**:

   ```bash
   git clone https://github.com/your-username/live-tailwind-previewer.git
   cd live-tailwind-previewer
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Start development**:
   - Press `F5` to open a new Extension Development Host window

## Development Workflow

### 1. Building the Extension

**Compile TypeScript to JavaScript:**

```bash
npm run compile
```

### 2. Running the Extension

1. Open the project in VS Code
2. Press `F5` to start debugging
3. A new Extension Development Host window will open
4. In the new window, press `Ctrl+Shift+T` to open the preview

Have fun 😊
