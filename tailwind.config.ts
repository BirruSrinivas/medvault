import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        teal: "#006D77",
        coral: "#FF6B6B",
        lime: "#83C5BE",
        navy: "#023047",
        cream: "#F8EDEB",
      },
    },
  },
  plugins: [],
};
export default config;