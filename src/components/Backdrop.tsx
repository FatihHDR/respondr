import { StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import { useTheme } from "@/theme/useTheme";

export function Backdrop() {
  const theme = useTheme();

  return (
    <LinearGradient
      colors={theme.backdropGradient}
      start={{ x: 0, y: 0 }}
      end={{ x: 0.6, y: 1 }}
      style={[StyleSheet.absoluteFill, styles.backdrop]}
    />
  );
}

const styles = StyleSheet.create({
  backdrop: {
    pointerEvents: "none",
  },
});
