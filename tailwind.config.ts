import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          green: {
            50: "var(--color-green-50)",
            100: "var(--color-green-100)",
            200: "var(--color-green-200)",
            300: "var(--color-green-300)",
            400: "var(--color-green-400)",
            500: "var(--color-green-500)",
            600: "var(--color-green-600)",
            700: "var(--color-green-700)",
            800: "var(--color-green-800)",
            900: "var(--color-green-900)"
          },
          gold: {
            50: "var(--color-gold-50)",
            100: "var(--color-gold-100)",
            200: "var(--color-gold-200)",
            300: "var(--color-gold-300)",
            400: "var(--color-gold-400)",
            500: "var(--color-gold-500)",
            600: "var(--color-gold-600)",
            700: "var(--color-gold-700)"
          }
        },
        surface: {
          page: "var(--color-surface-page)",
          card: "var(--color-surface-card)",
          muted: "var(--color-surface-muted)",
          line: "var(--color-surface-line)"
        },
        admin: {
          page: "var(--color-admin-surface-page)",
          card: "var(--color-admin-surface-card)",
          sidebar: "var(--color-admin-surface-sidebar)",
          line: "var(--color-admin-surface-line)"
        },
        ink: {
          primary: "var(--color-text-primary)",
          secondary: "var(--color-text-secondary)",
          muted: "var(--color-text-muted)",
          inverse: "var(--color-text-inverse)",
          admin: "var(--color-admin-text-primary)"
        },
        status: {
          success: "var(--color-success-text)",
          warning: "var(--color-warning-text)",
          error: "var(--color-error-text)",
          info: "var(--color-info-text)"
        },
        semantic: {
          successBg: "var(--color-success-bg)",
          successBorder: "var(--color-success-border)",
          warningBg: "var(--color-warning-bg)",
          warningBorder: "var(--color-warning-border)",
          errorBg: "var(--color-error-bg)",
          errorBorder: "var(--color-error-border)",
          infoBg: "var(--color-info-bg)",
          infoBorder: "var(--color-info-border)"
        }
      },
      fontFamily: {
        sans: ["var(--font-family-sans)"],
        arabic: ["var(--font-family-arabic)"]
      },
      fontSize: {
        hero: "var(--font-size-hero-fluid)",
        h1: "var(--font-size-h1-fluid)",
        h2: "var(--font-size-h2-fluid)",
        h3: "var(--font-size-h3-fluid)",
        h4: "var(--font-size-h4-fluid)",
        lead: "var(--font-size-lead)",
        body: "var(--font-size-body)",
        sm: "var(--font-size-sm)",
        xs: "var(--font-size-xs)",
        caption: "var(--font-size-caption)"
      },
      boxShadow: {
        focus: "var(--shadow-focus)",
        "focus-error": "var(--shadow-focus-error)",
        public1: "var(--elevation-1)",
        public2: "var(--elevation-2)",
        public3: "var(--elevation-3)",
        public4: "var(--elevation-4)",
        admin1: "var(--admin-elevation-1)",
        admin2: "var(--admin-elevation-2)",
        admin3: "var(--admin-elevation-3)"
      },
      borderRadius: {
        sm: "var(--radius-sm)",
        md: "var(--radius-md)",
        lg: "var(--radius-lg)",
        xl: "var(--radius-xl)",
        xl2: "var(--radius-2xl)",
        xl3: "var(--radius-3xl)"
      },
      maxWidth: {
        "container-sm": "var(--container-sm)",
        "container-md": "var(--container-md)",
        "container-lg": "var(--container-lg)",
        "container-xl": "var(--container-xl)",
        "container-admin": "var(--container-admin)"
      },
      spacing: {
        18: "4.5rem"
      }
    }
  },
  plugins: [],
};

export default config;
