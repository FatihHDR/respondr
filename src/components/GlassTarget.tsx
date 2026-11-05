import { createContext, useContext, useRef, type ReactNode, type RefObject } from "react";
import type { StyleProp, ViewInstance, ViewStyle } from "react-native";
import { BlurTargetView } from "expo-blur";

const GlassTargetContext = createContext<RefObject<ViewInstance | null> | null>(null);

export function useGlassTarget(): RefObject<ViewInstance | null> | null {
  return useContext(GlassTargetContext);
}

export type GlassTargetProps = {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
};

export function GlassTarget({ children, style }: GlassTargetProps) {
  const targetRef = useRef<ViewInstance | null>(null);

  return (
    <GlassTargetContext.Provider value={targetRef}>
      <BlurTargetView ref={targetRef} style={style}>
        {children}
      </BlurTargetView>
    </GlassTargetContext.Provider>
  );
}
