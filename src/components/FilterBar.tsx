import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text } from 'react-native';
import { filters, StatusFilter } from '../utils/taskUtils';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';

export function FilterBar({
  value,
  onChange,
}: {
  value: StatusFilter;
  onChange: (value: StatusFilter) => void;
}) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.row}
    >
      {filters.map(filter => (
        <Pressable
          key={filter}
          onPress={() => onChange(filter)}
          style={({ pressed }) => [
            styles.pill,
            value === filter && styles.selected,
            pressed && styles.pressed,
          ]}
        >
          <Text
            style={[styles.label, value === filter && styles.selectedLabel]}
          >
            {filter}
          </Text>
        </Pressable>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  row: { gap: 8, paddingBottom: 4 },
  pill: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderWidth: 1,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 24,
  },
  selected: { backgroundColor: colors.primary, borderColor: colors.primary },
  pressed: { opacity: 0.6 },
  label: {
    fontFamily: typography.bodyFont,
    color: colors.muted,
    fontWeight: '600',
  },
  selectedLabel: { color: colors.surface },
});
