import { createContext, useContext, useRef, type ReactNode, type RefObject } from "react";
import { StyleSheet, View, type ViewInstance } from "react-native";
import { BlurTargetView } from "expo-blur";

const GlassTargetContext = createContext<RefObject<ViewInstance | null> | null>(null);

export function useGlassTarget(): RefObject<ViewInstance | null> | null {
  return useContext(GlassTargetContext);
}

export type GlassTargetProps = {
  children: ReactNode;
  backdrop: ReactNode;
};

export function GlassTarget({ children, backdrop }: GlassTargetProps) {
  const targetRef = useRef<ViewInstance | null>(null);

  return (
    <GlassTargetContext.Provider value={targetRef}>
      <View style={styles.root}>
        <BlurTargetView ref={targetRef} style={styles.backdrop}>
          {backdrop}
        </BlurTargetView>
        {children}
      </View>
    </GlassTargetContext.Provider>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  backdrop: {
    ...StyleSheet.absoluteFill,
    pointerEvents: "none",
  },
});
