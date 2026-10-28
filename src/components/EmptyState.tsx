import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';

export function EmptyState({ filtered }: { filtered: boolean }) {
  return (
    <View style={styles.box}>
      <Text style={styles.symbol}>✓</Text>
      <Text style={styles.title}>
        {filtered ? 'Không tìm thấy công việc' : 'Chưa có công việc nào'}
      </Text>
      <Text style={styles.body}>
        {filtered
          ? 'Thử từ khoá hoặc bộ lọc khác nhé.'
          : 'Bắt đầu bằng cách thêm việc đầu tiên của bạn.'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    padding: 28,
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 18,
    marginTop: 8,
  },
  symbol: {
    fontFamily: typography.displayFont,
    fontSize: 30,
    color: colors.primary,
    backgroundColor: colors.primarySoft,
    width: 56,
    height: 56,
    textAlign: 'center',
    textAlignVertical: 'center',
    borderRadius: 28,
    overflow: 'hidden',
  },
  title: {
    fontFamily: typography.displayFont,
    fontSize: 17,
    fontWeight: '700',
    color: colors.text,
    marginTop: 15,
  },
  body: {
    fontFamily: typography.bodyFont,
    fontSize: 14,
    color: colors.muted,
    textAlign: 'center',
    marginTop: 6,
  },
});
