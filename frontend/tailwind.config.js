/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2563eb', // blue-600
        secondary: '#64748b', // slate-500
        accent: '#10b981', // emerald-500
        danger: '#ef4444', // red-500
        warning: '#f59e0b', // amber-500
        success: '#10b981', // emerald-500
      },
    },
  },
  plugins: [],
};