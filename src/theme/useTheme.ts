import { useColorScheme } from "react-native";

import { themes, type Theme } from "@/theme/tokens";

export function useIsDark(): boolean {
  return useColorScheme() === "dark";
}

export function useTheme(): Theme {
  return useIsDark() ? themes.dark : themes.light;
}
