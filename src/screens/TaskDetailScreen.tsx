import React, { useEffect } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import { useTasks } from '../context/TaskContext';
import { PriorityBadge } from '../components/PriorityBadge';
import { AppButton } from '../components/AppButton';
import { isOverdue } from '../utils/taskUtils';
import { timeLabel } from '../utils/dateUtils';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';

type Props = NativeStackScreenProps<RootStackParamList, 'TaskDetail'>;

function Field({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

export function TaskDetailScreen({ route, navigation }: Props) {
  const { tasks, loading, toggleTask } = useTasks();
  const task = tasks.find(item => item.id === route.params?.taskId);
  useEffect(() => {
    if (!loading && !task) {
      navigation.popToTop();
    }
  }, [loading, task, navigation]);
  if (!task) {
    return <SafeAreaView style={styles.screen} />;
  }

  return (
    <SafeAreaView style={styles.screen} edges={['bottom']}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.hero}>
          <Text style={styles.title}>{task.title}</Text>
          <View style={styles.badges}>
            <PriorityBadge priority={task.priority} />
            <View style={[styles.status, task.done && styles.statusDone]}>
              <Text
                style={[styles.statusText, task.done && styles.statusTextDone]}
              >
                {task.done ? 'Đã hoàn thành' : 'Chưa hoàn thành'}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.card}>
          <Field label="Ghi chú" value={task.note || 'Không có ghi chú'} />
          <Field label="Danh mục" value={task.category} />
          <Field label="Mức ưu tiên" value={task.priority} />
          <Field label="Hạn hoàn thành" value={task.dueDate} />
          <Field
            label="Trạng thái hoàn thành"
            value={task.done ? 'Đã hoàn thành' : 'Chưa hoàn thành'}
          />
          <Field
            label="Trạng thái quá hạn"
            value={isOverdue(task) ? 'Quá hạn' : 'Không quá hạn'}
          />
        </View>
        <View style={[styles.timeCard, isOverdue(task) && styles.timeOverdue]}>
          <Text
            style={[styles.timeText, isOverdue(task) && styles.timeTextOverdue]}
          >
            {timeLabel(task.dueDate)}
          </Text>
        </View>
        <View style={styles.actions}>
          <AppButton
            label="Sửa"
            variant="outline"
            onPress={() => navigation.navigate('TaskForm', { taskId: task.id })}
          />
          <AppButton
            label={
              task.done ? 'Đánh dấu chưa hoàn thành' : 'Đánh dấu hoàn thành'
            }
            onPress={() => toggleTask(task.id)}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  content: { padding: 20, paddingBottom: 36 },
  hero: {
    backgroundColor: colors.surface,
    borderRadius: 20,
    padding: 22,
    marginBottom: 15,
  },
  title: {
    fontFamily: typography.displayFont,
    fontSize: 25,
    fontWeight: '700',
    color: colors.text,
  },
  badges: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 15 },
  status: {
    backgroundColor: colors.primarySoft,
    paddingHorizontal: 9,
    paddingVertical: 5,
    borderRadius: 8,
  },
  statusDone: { backgroundColor: colors.successSoft },
  statusText: {
    fontFamily: typography.bodyFont,
    fontSize: 12,
    fontWeight: '700',
    color: colors.primary,
  },
  statusTextDone: { color: colors.success },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 20,
    paddingHorizontal: 20,
  },
  field: {
    paddingVertical: 15,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
  },
  label: {
    fontFamily: typography.bodyFont,
    fontSize: 13,
    color: colors.muted,
    marginBottom: 5,
  },
  value: {
    fontFamily: typography.bodyFont,
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  timeCard: {
    backgroundColor: colors.primarySoft,
    padding: 18,
    borderRadius: 15,
    marginTop: 15,
  },
  timeOverdue: { backgroundColor: colors.dangerSoft },
  timeText: {
    fontFamily: typography.displayFont,
    color: colors.primary,
    fontSize: 17,
    fontWeight: '700',
  },
  timeTextOverdue: { color: colors.danger },
  actions: { gap: 10, marginTop: 22 },
});
