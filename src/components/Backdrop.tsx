import { StyleSheet, View } from "react-native";

import { useTheme } from "@/theme/useTheme";

const GLOW = 560;

export function Backdrop() {
  const theme = useTheme();

  return (
    <View
      style={[
        StyleSheet.absoluteFill,
        { backgroundColor: theme.background, pointerEvents: "none" },
      ]}
    >
      <View style={[styles.glow, styles.topRight, { backgroundColor: theme.backdropGlow }]} />
      <View style={[styles.glow, styles.bottomLeft, { backgroundColor: theme.backdropShade }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  glow: {
    position: "absolute",
    width: GLOW,
    height: GLOW,
    borderRadius: GLOW / 2,
    opacity: 0.16,
  },
  topRight: {
    top: -GLOW * 0.5,
    right: -GLOW * 0.38,
  },
  bottomLeft: {
    bottom: -GLOW * 0.46,
    left: -GLOW * 0.32,
  },
});
