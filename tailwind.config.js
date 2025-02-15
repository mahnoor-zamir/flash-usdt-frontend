/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
        "./src/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}"
      ],
  theme: {
    extend: {
      colors: {
        primary: "#8b5cf6", // Purple shade from the image
        dark: "#0a0a0a",
        grayText: "#b3b3b3",
      },
    },
  },
  plugins: [],
};


// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: [
//     "./src/**/*.{js,ts,jsx,tsx,mdx}",
//     "./app/**/*.{js,ts,jsx,tsx,mdx}",
//     "./components/**/*.{js,ts,jsx,tsx,mdx}"
//   ],
//   theme: {
//     extend: {
//       colors: {
//         'ava-dark': '#000000',
//         'ava-gray': '#1A1A1A',
//       },
//       fontFamily: {
//         sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
//       },
//     },
//   },
//   plugins: [],
// }