# Simple Calculator Projects

This repository contains two calculator implementations: a web application and a desktop application, both built with React and modern JavaScript technologies.

## 📁 Project Structure

```
├── simple-calculator/              # Web-based calculator (React + Vite)
└── simple-calculator-desktop-app/  # Desktop calculator (Electron + React)
```

## 🌐 Web Calculator (`simple-calculator/`)

A modern, responsive web-based calculator built with React, Vite, and Tailwind CSS.

### Features
- ✅ **Basic Arithmetic**: Addition, subtraction, multiplication, division
- ✅ **Advanced Functions**: Percentage calculations, sign toggle, decimal support
- ✅ **Smart Display**: Fixed-height display with expression history
- ✅ **Error Handling**: Graceful handling of invalid operations
- ✅ **Responsive Design**: Works seamlessly on desktop and mobile
- ✅ **Modern UI**: Clean, dark theme with smooth animations

### Technology Stack
- **Framework**: React 19 with hooks
- **Build Tool**: Vite 7
- **Styling**: Tailwind CSS 4
- **Icons**: Lucide React
- **Language**: JavaScript (JSX)

### Quick Start
```bash
cd simple-calculator
npm install
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) to view the calculator.

### Available Scripts
- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint code quality checks

## 🖥️ Desktop Calculator (`simple-calculator-desktop-app/`)

A native desktop application built with Electron, React, and Tailwind CSS.

### Features
- ✅ **Native Desktop App**: Cross-platform Windows/Mac/Linux support
- ✅ **Fixed Percentage Logic**: Correctly handles expressions like `9/10% = 90`
- ✅ **Comprehensive Documentation**: Fully commented codebase
- ✅ **Desktop Integration**: Proper window management and system integration
- ✅ **Installer Support**: Ready-to-distribute executable files

### Technology Stack
- **Desktop Framework**: Electron 25
- **Frontend**: React 18
- **Styling**: Tailwind CSS 3
- **Build System**: Create React App + Electron Builder
- **Icons**: Lucide React

### Quick Start
```bash
cd simple-calculator-desktop-app
npm install
npm run electron-dev
```

### Available Scripts
- `npm run electron-dev` - Development mode with hot reload
- `npm run build` - Build React app for production
- `npm run dist` - Create executable installer
- `npm run electron` - Run Electron app in production mode

### Installation Options
1. **Installer**: Run `Simple Calculator Setup 1.0.0.exe` from `dist/` folder
2. **Portable**: Run `Simple Calculator.exe` from `dist/win-unpacked/` folder

## 🧮 Calculator Functionality

Both calculators share the same core functionality:

### Basic Operations
- **Addition** (`+`): Add two numbers
- **Subtraction** (`−`): Subtract second number from first
- **Multiplication** (`×`): Multiply two numbers
- **Division** (`÷`): Divide first number by second (with zero-division protection)

### Advanced Features
- **Percentage** (`%`): Context-aware percentage calculations
- **Sign Toggle** (`+/−`): Switch between positive and negative values
- **Decimal Support** (`.`): Full floating-point number support
- **Clear** (`C`): Reset calculator to initial state
- **Backspace** (🗑️): Remove last entered digit
- **Expression Display**: Shows calculation history above main display

### Smart Calculation Logic
- **Chain Operations**: Perform multiple operations in sequence
- **Floating Point Precision**: Automatic rounding to 8 decimal places
- **Error Handling**: "Invalid Format" display for incomplete operations
- **Memory Management**: Proper state management for complex calculations

## 🛠️ Development

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn package manager

### Common Development Tasks

#### Setting up both projects:
```bash
# Install dependencies for web calculator
cd simple-calculator
npm install

# Install dependencies for desktop calculator
cd ../simple-calculator-desktop-app
npm install
```

#### Running both in development:
```bash
# Terminal 1 - Web calculator
cd simple-calculator
npm run dev

# Terminal 2 - Desktop calculator
cd simple-calculator-desktop-app
npm run electron-dev
```

#### Building for production:
```bash
# Web calculator
cd simple-calculator
npm run build

# Desktop calculator
cd simple-calculator-desktop-app
npm run dist
```

## 📱 Browser Support (Web Calculator)

- Chrome 60+
- Firefox 60+
- Safari 12+
- Edge 79+

## 🖥️ Platform Support (Desktop Calculator)

- Windows 10/11
- macOS 10.14+
- Linux (Ubuntu 18.04+)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow existing code style and formatting
- Add comments for complex logic
- Test both web and desktop versions
- Ensure responsive design works across devices
- Update documentation for new features

## 📄 License

This project is open source and available under the MIT License.

## 🔗 Related Links

- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)
- [Electron Documentation](https://www.electronjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

---

**Note**: Both calculators implement the same mathematical logic but are optimized for their respective platforms. The web version focuses on responsive design and fast loading, while the desktop version provides native OS integration and offline functionality.