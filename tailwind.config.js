/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{html,ts,tsx,js,jsx}"
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        vrlab: {
          "primary": "#a991f7",
          "secondary": "#f6d860",
          "accent": "#37cdbe",
          "neutral": "#666666",
          /*"neutral-content": "#ea580c",
          "neutral-focus": "#fdba74",*/
          "base-100": "#666666",
          /*"base-content": "#ea580c",
          "base-focus": "#fdba74"*/
        },
      },
    ],
  },
}

