# VeriScan - Product Authenticity Detection System

## Overview
VeriScan is a comprehensive product authenticity verification system designed to detect and prevent counterfeit products using advanced scanning and verification technologies.

## Project Structure
```
fake_product_detection/
├── components/
│   ├── Navbar.tsx          # Navigation component
│   └── Scanner.tsx         # Product scanner interface
├── App.tsx                 # Main application component
├── index.tsx               # Application entry point
├── index.html              # HTML template
├── types.ts                # TypeScript type definitions
├── metadata.json           # Project metadata
├── package.json            # Node dependencies
├── tsconfig.json           # TypeScript configuration
├── vite.config.ts          # Vite build configuration
└── README.md               # This file
```

## Features
- Product authentication scanning
- Real-time verification interface
- Component-based architecture
- TypeScript support
- Modern build system with Vite

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn package manager

### Installation
1. Install dependencies:
```bash
npm install
```

2. Configure environment:
- Copy `.env.local` and update with your API keys if needed

### Development
Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Build
Create a production build:
```bash
npm run build
```

## Technology Stack
- **Frontend**: React with TypeScript
- **Build Tool**: Vite
- **Type Safety**: TypeScript

## Component Architecture

### Navbar
Navigation component that provides the main navigation interface for the application.

### Scanner
Product scanner component that handles the core functionality of scanning and verifying product authenticity.

## Configuration Files
- `tsconfig.json`: TypeScript compiler options
- `vite.config.ts`: Vite build and dev server configuration
- `package.json`: Project dependencies and scripts
- `metadata.json`: Project metadata and version info
https://fake-product-detection-1-yovs.onrender.com
## License
All rights reserved.
