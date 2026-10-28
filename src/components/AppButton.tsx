import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';

export function AppButton({
  label,
  onPress,
  variant = 'primary',
  disabled = false,
}: {
  label: string;
  onPress: () => void;
  variant?: 'primary' | 'outline' | 'danger';
  disabled?: boolean;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        variant === 'outline' && styles.outline,
        variant === 'danger' && styles.danger,
        (pressed || disabled) && styles.dim,
      ]}
    >
      <Text
        style={[
          styles.label,
          variant === 'outline' && styles.outlineLabel,
          variant === 'danger' && styles.dangerLabel,
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    minHeight: 50,
    borderRadius: 15,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
  },
  outline: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  danger: { backgroundColor: colors.dangerSoft },
  dim: { opacity: 0.5 },
  label: {
    fontFamily: typography.bodyFont,
    fontSize: 15,
    fontWeight: '700',
    color: colors.surface,
    textAlign: 'center',
  },
  outlineLabel: { color: colors.primary },
  dangerLabel: { color: colors.danger },
});
