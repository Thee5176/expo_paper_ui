const fontConfig = {
  displayLarge: {
    fontFamily: "Roboto",
    fontSize: 57,
    fontWeight: "400" as const,
    letterSpacing: 0,
    lineHeight: 64,
  },
  bodyMedium: {
    fontFamily: "Roboto",
    fontSize: 15, // Matches your base fontSize
    fontWeight: "400" as const,
    letterSpacing: 0.25,
    lineHeight: 20,
  },
  bodyLarge: {
    fontFamily: "Roboto",
    fontSize: 16,
    fontWeight: "400" as const,
    letterSpacing: 0.15,
    lineHeight: 24,
  },
  labelLarge: {
    fontFamily: "Roboto",
    fontSize: 15,
    fontWeight: "600" as const, // Matches your header fontWeight
    letterSpacing: 0.1,
    lineHeight: 20,
  },
} as const;

export default fontConfig;
