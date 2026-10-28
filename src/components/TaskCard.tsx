import React, { useRef } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Task } from '../types/task';
import { isOverdue } from '../utils/taskUtils';
import { PriorityBadge } from './PriorityBadge';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';

export function TaskCard({
  task,
  onOpen,
  onToggle,
  onDelete,
}: {
  task: Task;
  onOpen: () => void;
  onToggle: () => void;
  onDelete: () => void;
}) {
  const longPressed = useRef(false);
  return (
    <View style={styles.card}>
      <Pressable
        accessibilityRole="checkbox"
        accessibilityState={{ checked: task.done }}
        accessibilityLabel={`Hoàn thành ${task.title}`}
        onPress={onToggle}
        style={({ pressed }) => [
          styles.checkbox,
          task.done && styles.checked,
          pressed && styles.pressed,
        ]}
      >
        {task.done && <Text style={styles.check}>✓</Text>}
      </Pressable>
      <Pressable
        onPressIn={() => {
          longPressed.current = false;
        }}
        onPress={() => {
          if (!longPressed.current) {
            onOpen();
          }
        }}
        onLongPress={() => {
          longPressed.current = true;
          onDelete();
        }}
        style={({ pressed }) => [styles.content, pressed && styles.pressed]}
      >
        <Text
          style={[styles.title, task.done && styles.done]}
          numberOfLines={2}
        >
          {task.title}
        </Text>
        <Text style={styles.meta}>
          {task.category} · {task.dueDate}
        </Text>
        <View style={styles.badges}>
          <PriorityBadge priority={task.priority} />
          {isOverdue(task) && (
            <View style={styles.overdue}>
              <Text style={styles.overdueText}>Quá hạn</Text>
            </View>
          )}
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderRadius: 17,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
    shadowColor: colors.primaryDark,
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 3 },
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 7,
    borderWidth: 2,
    borderColor: colors.border,
    marginRight: 14,
    marginTop: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checked: { backgroundColor: colors.primary, borderColor: colors.primary },
  check: {
    fontFamily: typography.bodyFont,
    color: colors.surface,
    fontWeight: '800',
  },
  pressed: { opacity: 0.55 },
  content: { flex: 1 },
  title: {
    fontFamily: typography.bodyFont,
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
  },
  done: { textDecorationLine: 'line-through', color: colors.muted },
  meta: {
    fontFamily: typography.bodyFont,
    fontSize: 13,
    color: colors.muted,
    marginTop: 7,
  },
  badges: { flexDirection: 'row', gap: 7, marginTop: 12, flexWrap: 'wrap' },
  overdue: {
    backgroundColor: colors.dangerSoft,
    paddingHorizontal: 9,
    paddingVertical: 5,
    borderRadius: 8,
  },
  overdueText: {
    fontFamily: typography.bodyFont,
    fontSize: 12,
    fontWeight: '700',
    color: colors.danger,
  },
});
