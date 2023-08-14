import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary-blue": "#003E9A",
        "primary-light-blue": "#23A6F0",
        "primary-gray": "#9FA5B8",
        "primary-light-gray": "#D8DCE8",
      },
    },
  },
  plugins: [],
} satisfies Config;
