/** @type {import('tailwindcss').Config} */

const config = {
  darkMode: ["class"],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        // LinkedIn's color palette
        linkedin: {
          // Blues
          blue: {
            primary: "#0a66c2", // Main LinkedIn blue
            light: "#0073b1",
            dark: "#004182",
            hover: "#004182",
            focus: "#0077b5",
          },
          // Grays
          gray: {
            bg: "#f3f2ef",      // Background color
            border: "#e7e7e7",   // Border color
            medium: "#666666",  // Medium text
            dark: "#292929",    // Dark text/heading
            light: "#e7e7e7",   // Light gray for dividers
            hover: "#dedede",
          },
          // System colors
          system: {
            error: "#d11124",
            success: "#057642",
            warning: "#b24020",
          },
        },
        // Semantic aliases for easier use
        primary: "#0a66c2",     // LinkedIn primary blue
        secondary: "#666666",   // Medium gray for secondary text
        background: "#f3f2ef",  // Light gray background
        text: {
          primary: "#292929",   // Main text color
          secondary: "#666666", // Secondary text color
        },
        border: "#e7e7e7",      // Border color
      },
      fontFamily: {
        // LinkedIn-like font stack
        linkedin: [
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
      },
      // Consistent rounded corners
      borderRadius: {
        linkedin: "4px",
        full: "9999px",
      },
      // Box shadows similar to LinkedIn
      boxShadow: {
        linkedin: "0 0 0 1px rgba(0, 0, 0, 0.08), 0 2px 4px rgba(0, 0, 0, 0.05)",
        "linkedin-hover": "0 0 0 1px rgba(0, 0, 0, 0.08), 0 4px 8px rgba(0, 0, 0, 0.1)",
        "linkedin-button": "0 0 0 1px rgba(0, 0, 0, 0.1), 0 2px 3px rgba(0, 0, 0, 0.2)",
      },
    },
  },
  plugins: [],
};

export default config;

