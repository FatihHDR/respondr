import { useEffect, useState, type ReactNode } from "react";
import {
  AccessibilityInfo,
  Platform,
  StyleSheet,
  View,
  type StyleProp,
  type ViewStyle,
} from "react-native";
import { BlurView, type BlurTint } from "expo-blur";
import { GlassView, isGlassEffectAPIAvailable } from "expo-glass-effect";

import { useGlassTarget } from "@/components/GlassTarget";
import { useIsDark, useTheme } from "@/theme/useTheme";

export type GlassVariant = "clear" | "regular";

export type GlassSurfaceProps = {
  children?: ReactNode;
  style?: StyleProp<ViewStyle>;
  variant?: GlassVariant;
  tintColor?: string;
  interactive?: boolean;
};

const BLUR_INTENSITY: Record<GlassVariant, number> = {
  regular: 60,
  clear: 24,
};

export function GlassSurface({
  children,
  style,
  variant = "regular",
  tintColor,
  interactive = false,
}: GlassSurfaceProps) {
  const theme = useTheme();
  const isDark = useIsDark();
  const blurTarget = useGlassTarget();
  const [nativeGlass, setNativeGlass] = useState(false);
  const [reduceTransparency, setReduceTransparency] = useState(false);

  useEffect(() => {
    if (Platform.OS !== "ios") {
      setNativeGlass(false);
      return;
    }
    try {
      setNativeGlass(isGlassEffectAPIAvailable());
    } catch {
      setNativeGlass(false);
    }
  }, []);

  useEffect(() => {
    let mounted = true;
    AccessibilityInfo.isReduceTransparencyEnabled()
      .then((enabled) => {
        if (mounted) setReduceTransparency(enabled);
      })
      .catch(() => undefined);
    return () => {
      mounted = false;
    };
  }, []);

  if (reduceTransparency) {
    return (
      <View
        style={[
          styles.base,
          {
            backgroundColor: theme.glassFallbackStrong,
            borderColor: theme.glassBorder,
            borderWidth: StyleSheet.hairlineWidth,
          },
          style,
        ]}
      >
        {children}
      </View>
    );
  }

  if (nativeGlass) {
    return (
      <GlassView
        style={[styles.base, style]}
        glassEffectStyle={variant}
        isInteractive={interactive}
        tintColor={tintColor ?? theme.glassTint}
      >
        {children}
      </GlassView>
    );
  }

  const blurTint: BlurTint =
    Platform.OS === "ios"
      ? isDark
        ? "systemThinMaterialDark"
        : "systemThinMaterialLight"
      : isDark
        ? "dark"
        : "light";

  const blurTargetProp = Platform.OS === "android" ? (blurTarget ?? undefined) : undefined;

  return (
    <BlurView
      intensity={BLUR_INTENSITY[variant]}
      tint={blurTint}
      blurMethod={Platform.OS === "android" ? "dimezisBlurView" : undefined}
      blurTarget={blurTargetProp}
      style={[
        styles.base,
        { borderColor: theme.glassBorder, borderWidth: StyleSheet.hairlineWidth },
        style,
      ]}
    >
      {children}
    </BlurView>
  );
}

const styles = StyleSheet.create({
  base: {
    overflow: "hidden",
  },
});
