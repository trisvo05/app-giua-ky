import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TaskPriority } from '../types/task';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';

export function PriorityBadge({ priority }: { priority: TaskPriority }) {
  const style =
    priority === 'Cao'
      ? styles.high
      : priority === 'Trung bình'
      ? styles.medium
      : styles.low;
  return (
    <View style={[styles.badge, style]}>
      <Text style={[styles.text, style]}>{priority}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    alignSelf: 'flex-start',
    borderRadius: 8,
    paddingVertical: 5,
    paddingHorizontal: 9,
  },
  text: { fontFamily: typography.bodyFont, fontSize: 12, fontWeight: '700' },
  high: { backgroundColor: colors.dangerSoft, color: colors.priorityHigh },
  medium: { backgroundColor: colors.warningSoft, color: colors.priorityMedium },
  low: { backgroundColor: colors.successSoft, color: colors.priorityLow },
});
