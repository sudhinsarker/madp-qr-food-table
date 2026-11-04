/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      ...{"colors":{"primary":"#245C45","background":"#F7F5EF","surface":"#FFFFFF","ink":"#202B25","muted":"#5D6860","border":"#D8DED5","pending":"#825500","pending-surface":"#FFF1CD","error":"#AD342D"},"fontSize":{"body":"16px","metadata":"13px","heading":"32px"},"spacing":{"unit":"8px","phone-inset":"20px","desktop-inset":"32px","control":"12px"},"borderRadius":{"control":"8px","status":"6px"}},
      fontFamily: {
        sans: ["DM Sans", "Inter", "ui-sans-serif", "system-ui", "-apple-system", "Segoe UI", "Roboto", "sans-serif"],
        display: ["Lora", "Georgia", "serif"],
        ...{"body":"DM Sans, sans-serif","heading":"Lora, serif"},
      },
    },
  },
  plugins: [],
};
