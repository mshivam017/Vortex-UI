# To Quick Start
npm install
npm install lucide-react
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
npm install -D @tailwindcss/postcss
npm install -D style-loader css-loader postcss-loader
npm start

# Tailwind Configure
File = tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/**/*.{js,jsx,ts,tsx}",  // Include all your React files
    ],
    theme: {
      extend: {},
    },
    plugins: [],
  }

# CSS import
File = postcss.config.js
// postcss.config.js
module.exports = {
    plugins: {
      '@tailwindcss/postcss': {},
      autoprefixer: {},
    },
  };
  
# index.css 
@tailwind base;
@tailwind components;
@tailwind utilities;
