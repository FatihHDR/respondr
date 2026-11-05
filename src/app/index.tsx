import { Platform, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { GlassContainer } from "expo-glass-effect";

import { Backdrop } from "@/components/Backdrop";
import { GlassSurface } from "@/components/GlassSurface";
import { GlassTarget } from "@/components/GlassTarget";
import { Icon, type IconName } from "@/components/Icon";
import { radii, spacing, typography, type IncidentStatus } from "@/theme/tokens";
import { useTheme } from "@/theme/useTheme";

const ICONS = {
  report: { ios: "camera.fill", android: "photo_camera", web: "photo_camera" },
  map: { ios: "map.fill", android: "map", web: "map" },
  alerts: { ios: "bell.fill", android: "notifications", web: "notifications" },
  settings: { ios: "gearshape.fill", android: "settings", web: "settings" },
  pin: { ios: "location.fill", android: "location_on", web: "location_on" },
} satisfies Record<string, IconName>;

const ACTIONS: { id: string; icon: IconName }[] = [
  { id: "report", icon: ICONS.report },
  { id: "map", icon: ICONS.map },
  { id: "alerts", icon: ICONS.alerts },
  { id: "settings", icon: ICONS.settings },
];

const STATUS_LABEL: Record<IncidentStatus, string> = {
  pending: "Pending",
  inProgress: "In Progress",
  resolved: "Resolved",
};

const INCIDENTS: {
  id: string;
  title: string;
  address: string;
  severity: number;
  status: IncidentStatus;
}[] = [
  {
    id: "1",
    title: "Pothole, ~40 cm deep",
    address: "Main St · 120 m",
    severity: 4,
    status: "inProgress",
  },
  { id: "2", title: "Streetlight out", address: "Ward 4 · 340 m", severity: 2, status: "pending" },
  {
    id: "3",
    title: "Broken sidewalk slab",
    address: "Oak Ave · 610 m",
    severity: 3,
    status: "resolved",
  },
];

export default function Index() {
  const theme = useTheme();

  const actions = ACTIONS.map((action) => (
    <GlassSurface key={action.id} interactive style={styles.action}>
      <Icon name={action.icon} size={22} tintColor={theme.textPrimary} />
    </GlassSurface>
  ));

  return (
    <View style={styles.root}>
      <GlassTarget style={styles.backdrop}>
        <Backdrop />
      </GlassTarget>
      <SafeAreaView style={styles.safe} edges={["top", "bottom"]}>
        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <Text style={[typography.largeTitle, { color: theme.textPrimary }]}>Respondr</Text>
            <Text style={[typography.subhead, { color: theme.textSecondary }]}>
              Report civic issues. Track them to resolution.
            </Text>
          </View>

          <GlassSurface style={styles.hero}>
            <View style={styles.heroTop}>
              <Text style={[typography.caption, styles.tracked, { color: theme.textTertiary }]}>
                OPEN NEAR YOU
              </Text>
              <Icon name={ICONS.pin} size={15} tintColor={theme.tint} />
            </View>
            <Text style={[typography.largeTitle, { color: theme.textPrimary }]}>12</Text>
            <Text style={[typography.footnote, { color: theme.textSecondary }]}>
              <Text style={{ color: theme.status.inProgress }}>3 in progress</Text>
              {"  ·  9 pending"}
            </Text>
          </GlassSurface>

          <Text
            style={[
              typography.caption,
              styles.sectionLabel,
              styles.tracked,
              { color: theme.textTertiary },
            ]}
          >
            ACTIONS
          </Text>
          {Platform.OS === "ios" ? (
            <GlassContainer spacing={16} style={styles.actionRow}>
              {actions}
            </GlassContainer>
          ) : (
            <View style={styles.actionRow}>{actions}</View>
          )}

          <Text
            style={[
              typography.caption,
              styles.sectionLabel,
              styles.tracked,
              { color: theme.textTertiary },
            ]}
          >
            NEARBY INCIDENTS
          </Text>
          <GlassSurface style={styles.list}>
            {INCIDENTS.map((incident, index) => {
              const severityColor = theme.severity[incident.severity - 1];
              const statusColor = theme.status[incident.status];

              return (
                <View key={incident.id}>
                  {index > 0 ? (
                    <View style={[styles.separator, { backgroundColor: theme.separator }]} />
                  ) : null}
                  <View style={styles.row}>
                    <View style={styles.severity}>
                      <View
                        style={[
                          StyleSheet.absoluteFill,
                          { backgroundColor: severityColor, opacity: 0.18 },
                        ]}
                      />
                      <Text style={[typography.caption, { color: severityColor }]}>
                        {incident.severity}
                      </Text>
                    </View>
                    <View style={styles.rowText}>
                      <Text
                        numberOfLines={1}
                        style={[typography.callout, { color: theme.textPrimary }]}
                      >
                        {incident.title}
                      </Text>
                      <Text style={[typography.footnote, { color: theme.textTertiary }]}>
                        {incident.address}
                      </Text>
                    </View>
                    <View style={[styles.chip, { borderColor: statusColor }]}>
                      <Text style={[typography.caption, { color: statusColor }]}>
                        {STATUS_LABEL[incident.status]}
                      </Text>
                    </View>
                  </View>
                </View>
              );
            })}
          </GlassSurface>
        </ScrollView>
      </SafeAreaView>
    </View>
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
  safe: {
    flex: 1,
  },
  content: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xxl,
  },
  header: {
    marginTop: spacing.sm,
    marginBottom: spacing.lg,
    gap: spacing.xxs,
  },
  hero: {
    borderRadius: radii.xl,
    padding: spacing.xl,
    gap: spacing.xs,
  },
  heroTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  sectionLabel: {
    marginTop: spacing.xxl,
    marginBottom: spacing.md,
  },
  tracked: {
    letterSpacing: 0.8,
  },
  actionRow: {
    flexDirection: "row",
    gap: spacing.md,
  },
  action: {
    flex: 1,
    height: 64,
    borderRadius: radii.lg,
    alignItems: "center",
    justifyContent: "center",
  },
  list: {
    borderRadius: radii.xl,
    overflow: "hidden",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
  },
  severity: {
    width: 34,
    height: 34,
    borderRadius: radii.sm,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  rowText: {
    flex: 1,
    gap: 1,
  },
  chip: {
    borderWidth: 1,
    borderRadius: radii.pill,
    paddingHorizontal: spacing.sm,
    paddingVertical: 3,
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    marginLeft: spacing.lg + 34 + spacing.md,
  },
});
