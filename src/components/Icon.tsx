import type { ColorValue } from "react-native";
import { SymbolView, type SymbolViewProps } from "expo-symbols";

export type IconName = {
  ios: string;
  android: string;
  web: string;
};

export type IconProps = {
  name: IconName;
  size?: number;
  tintColor?: ColorValue;
  weight?: "regular" | "medium" | "semibold" | "bold";
};

export function Icon({ name, size = 20, tintColor, weight = "semibold" }: IconProps) {
  return (
    <SymbolView
      name={name as SymbolViewProps["name"]}
      size={size}
      tintColor={tintColor}
      weight={weight}
    />
  );
}
