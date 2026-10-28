import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';

export function ProgressCard({ done, total }: { done: number; total: number }) {
  const percent = total ? Math.round((done / total) * 100) : 0;
  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <Text style={styles.title}>Tiến độ của bạn</Text>
        <Text style={styles.percent}>{percent}%</Text>
      </View>
      <Text style={styles.subtitle}>
        Đã hoàn thành {done}/{total} công việc
      </Text>
      <View style={styles.track}>
        <View style={[styles.fill, { width: `${percent}%` }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.primary,
    borderRadius: 20,
    padding: 20,
    marginBottom: 22,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontFamily: typography.displayFont,
    fontSize: 17,
    color: colors.surface,
    fontWeight: '700',
  },
  percent: {
    fontFamily: typography.displayFont,
    fontSize: 22,
    color: colors.surface,
    fontWeight: '800',
  },
  subtitle: {
    fontFamily: typography.bodyFont,
    fontSize: 13,
    color: colors.onPrimaryMuted,
    marginTop: 5,
    marginBottom: 18,
  },
  track: {
    height: 8,
    backgroundColor: colors.primaryTrack,
    borderRadius: 8,
    overflow: 'hidden',
  },
  fill: { height: 8, backgroundColor: colors.surface, borderRadius: 8 },
});
