# Simple Calculator Desktop App

A desktop calculator application built with Electron + React + JSX + Tailwind CSS.

## Screenshots

![Calculator Interface](./screenshots/calculator-main.png)
*Main calculator interface with modern design*

![Calculator in Action](./screenshots/calculator-demo.gif)
*Calculator performing various calculations*

### Additional Images
- [Installation Process](./screenshots/installation.png)
- [Settings Menu](./screenshots/settings.png)
- [About Dialog](./screenshots/about.png)

## Features

- ✅ **Fixed Percentage Functionality**: Correctly calculates expressions like `9/10% = 90`
- ✅ **Responsive Display**: Fixed height display that prevents size changes during calculations
- ✅ **Comprehensive Documentation**: Fully commented code for better readability
- ✅ **Desktop Integration**: Native Windows application with proper window management

## Installation & Usage

### Option 1: Install the App
1. Run `Simple Calculator Setup 1.0.0.exe` from the `dist` folder
2. Follow the installation wizard
3. Launch "Simple Calculator" from your Start Menu

### Option 2: Portable Version
1. Navigate to `dist/win-unpacked/`
2. Double-click `Simple Calculator.exe` to run directly

## Development

### Prerequisites
- Node.js (v14 or higher)
- npm

### Setup
```bash
npm install
```

### Available Scripts
```bash
npm start              # Start React development server
npm run build          # Build React app for production
npm run electron       # Run Electron app
npm run electron-dev   # Development mode with hot reload
npm run dist           # Build executable (.exe file)
```

### Development Mode
```bash
npm run electron-dev
```
This will start both the React development server and Electron app with hot reload.

## Calculator Functions

- **Basic Operations**: Addition (+), Subtraction (−), Multiplication (×), Division (÷)
- **Percentage**: Contextual percentage calculations
- **Sign Toggle**: Change positive/negative values
- **Decimal Support**: Full decimal number support
- **Clear**: Reset calculator state
- **Backspace**: Remove last digit
- **Memory**: Expression display shows calculation history

## Technical Details

- **Frontend**: React 18 with functional components and hooks
- **Styling**: Tailwind CSS for responsive design
- **Desktop**: Electron for cross-platform desktop app
- **Build**: electron-builder for creating installers and executables

## File Structure

```
simple-calcilator-desktop-app/
├── public/
│   ├── electron.js          # Electron main process
│   └── index.html          # HTML template
├── src/
│   ├── App.jsx             # Main calculator component
│   ├── index.js            # React entry point
│   └── index.css           # Tailwind CSS imports
├── dist/                   # Built executables
│   ├── Simple Calculator Setup 1.0.0.exe  # Installer
│   └── win-unpacked/       # Portable app folder
└── package.json            # Dependencies and scripts
```

## License

This project is open source and available under the MIT License.