export const spacing = {
  xxs: 2,
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
  xxxl: 48,
} as const;

export const radii = {
  sm: 10,
  md: 16,
  lg: 22,
  xl: 30,
  pill: 999,
} as const;

export const typography = {
  largeTitle: { fontSize: 34, lineHeight: 41, fontWeight: "700" },
  title: { fontSize: 26, lineHeight: 32, fontWeight: "700" },
  headline: { fontSize: 20, lineHeight: 25, fontWeight: "600" },
  body: { fontSize: 17, lineHeight: 23, fontWeight: "400" },
  callout: { fontSize: 16, lineHeight: 21, fontWeight: "500" },
  subhead: { fontSize: 15, lineHeight: 20, fontWeight: "400" },
  footnote: { fontSize: 13, lineHeight: 18, fontWeight: "400" },
  caption: { fontSize: 12, lineHeight: 16, fontWeight: "600" },
} as const;

export const themes = {
  light: {
    backdropGradient: ["#FDFDFE", "#DCE2EB"],
    textPrimary: "#0E1116",
    textSecondary: "rgba(14, 17, 22, 0.6)",
    textTertiary: "rgba(14, 17, 22, 0.38)",
    tint: "#B45309",
    glassTint: "rgba(255, 255, 255, 0.55)",
    glassFallback: "rgba(255, 255, 255, 0.74)",
    glassFallbackStrong: "rgba(255, 255, 255, 0.88)",
    glassBorder: "rgba(255, 255, 255, 0.92)",
    separator: "rgba(14, 17, 22, 0.08)",
    status: {
      pending: "#B45309",
      inProgress: "#2C63C9",
      resolved: "#15803D",
    },
    severity: ["#8A93A0", "#C99A1E", "#E07C22", "#D2512A", "#BC2E2E"],
  },
  dark: {
    backdropGradient: ["#1C2129", "#08090C"],
    textPrimary: "#FFFFFF",
    textSecondary: "rgba(255, 255, 255, 0.66)",
    textTertiary: "rgba(255, 255, 255, 0.4)",
    tint: "#FFB020",
    glassTint: "rgba(255, 255, 255, 0.1)",
    glassFallback: "rgba(20, 23, 28, 0.6)",
    glassFallbackStrong: "rgba(26, 30, 36, 0.8)",
    glassBorder: "rgba(255, 255, 255, 0.16)",
    separator: "rgba(255, 255, 255, 0.1)",
    status: {
      pending: "#FFB020",
      inProgress: "#5B9BFF",
      resolved: "#30D158",
    },
    severity: ["#7C8794", "#D9A21B", "#F08A24", "#E4612F", "#FF453A"],
  },
} as const;

export type Theme = (typeof themes)[keyof typeof themes];
export type IncidentStatus = keyof Theme["status"];
