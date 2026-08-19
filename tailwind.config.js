/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        jet: {
          dark: '#0B0F19',
          card: '#131B2E',
          'card-hover': '#1A243D',
          border: '#23304D',
          primary: '#6366F1', // Indigo accent
          'primary-hover': '#4F46E5',
          secondary: '#8B5CF6', // Purple
          emerald: '#10B981', // Net salary success green
          amber: '#F59E0B',  // INPS warning amber
          rose: '#EF4444',   // IRPEF fiscal red
          cyan: '#06B6D4',   // Benefit blue-cyan
          text: '#F3F4F6',
          muted: '#9CA3AF',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'glow-primary': '0 0 25px -5px rgba(99, 102, 241, 0.25)',
        'glow-emerald': '0 0 25px -5px rgba(16, 185, 129, 0.25)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      }
    },
  },
  plugins: [],
}
