import React, { useMemo, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import { useTasks } from '../context/TaskContext';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import { ProgressCard } from '../components/ProgressCard';
import { FilterBar } from '../components/FilterBar';
import { TaskCard } from '../components/TaskCard';
import { EmptyState } from '../components/EmptyState';
import { AppButton } from '../components/AppButton';
import { selectTasks, SortMode, StatusFilter } from '../utils/taskUtils';

type Props = NativeStackScreenProps<RootStackParamList, 'TaskList'>;

export function TaskListScreen({ navigation }: Props) {
  const {
    tasks,
    loading,
    error,
    toggleTask,
    deleteTask,
    deleteCompleted,
    retryLoad,
  } = useTasks();
  const [filter, setFilter] = useState<StatusFilter>('Tất cả');
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState<SortMode>('date');
  const completed = tasks.filter(task => task.done).length;
  const visible = useMemo(
    () => selectTasks(tasks, filter, query, sort),
    [tasks, filter, query, sort],
  );

  const confirmDelete = (id: string, title: string) =>
    Alert.alert('Xoá công việc', `Bạn có chắc muốn xoá "${title}"?`, [
      { text: 'Huỷ', style: 'cancel' },
      { text: 'Xoá', style: 'destructive', onPress: () => deleteTask(id) },
    ]);
  const confirmCompleted = () =>
    Alert.alert(
      'Xoá việc đã hoàn thành',
      `Bạn có chắc muốn xoá ${completed} công việc đã hoàn thành?`,
      [
        { text: 'Huỷ', style: 'cancel' },
        { text: 'Xoá', style: 'destructive', onPress: deleteCompleted },
      ],
    );

  if (loading) {
    return (
      <SafeAreaView style={styles.center}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.loading}>Đang tải công việc...</Text>
      </SafeAreaView>
    );
  }
  if (error && tasks.length === 0) {
    return (
      <SafeAreaView style={styles.center}>
        <Text style={styles.error}>{error}</Text>
        <AppButton label="Thử lại" onPress={retryLoad} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.screen} edges={['top', 'bottom']}>
      <FlatList
        data={visible}
        keyExtractor={item => item.id}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={
          <>
            <Text style={styles.heading}>Kế hoạch của tôi</Text>
            <Text style={styles.subtitle}>
              Sắp xếp hôm nay, nhẹ nhàng cho ngày mai.
            </Text>
            <ProgressCard done={completed} total={tasks.length} />
            {error && <Text style={styles.error}>{error}</Text>}
            <TextInput
              value={query}
              onChangeText={setQuery}
              placeholder="Tìm kiếm công việc..."
              placeholderTextColor={colors.muted}
              style={styles.search}
              accessibilityLabel="Tìm kiếm công việc"
            />
            <FilterBar value={filter} onChange={setFilter} />
            <View style={styles.toolbar}>
              <Text style={styles.section}>Công việc</Text>
              <Pressable
                onPress={() =>
                  setSort(value => (value === 'date' ? 'priority' : 'date'))
                }
                style={({ pressed }) => [
                  styles.sort,
                  pressed && styles.pressed,
                ]}
              >
                <Text style={styles.sortText}>
                  Sắp xếp: {sort === 'date' ? 'Hạn gần nhất' : 'Ưu tiên'}
                </Text>
              </Pressable>
            </View>
          </>
        }
        renderItem={({ item }) => (
          <TaskCard
            task={item}
            onOpen={() =>
              navigation.navigate('TaskDetail', { taskId: item.id })
            }
            onToggle={() => toggleTask(item.id)}
            onDelete={() => confirmDelete(item.id, item.title)}
          />
        )}
        ListEmptyComponent={
          <EmptyState
            filtered={filter !== 'Tất cả' || query.trim().length > 0}
          />
        }
        ListFooterComponent={
          <View style={styles.footer}>
            <AppButton
              label="Xoá việc đã hoàn thành"
              variant="danger"
              disabled={completed === 0}
              onPress={confirmCompleted}
            />
          </View>
        }
      />
      <View style={styles.action}>
        <AppButton
          label="+ Thêm việc"
          onPress={() => navigation.navigate('TaskForm')}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
    padding: 24,
    backgroundColor: colors.background,
  },
  loading: { fontFamily: typography.bodyFont, color: colors.muted },
  error: {
    fontFamily: typography.bodyFont,
    color: colors.danger,
    textAlign: 'center',
    marginBottom: 12,
  },
  listContent: {
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 12,
    flexGrow: 1,
  },
  heading: {
    fontFamily: typography.displayFont,
    fontSize: 28,
    fontWeight: '700',
    color: colors.text,
  },
  subtitle: {
    fontFamily: typography.bodyFont,
    fontSize: 14,
    color: colors.muted,
    marginTop: 5,
    marginBottom: 24,
  },
  search: {
    fontFamily: typography.bodyFont,
    height: 50,
    borderRadius: 14,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    color: colors.text,
    paddingHorizontal: 16,
    marginBottom: 18,
    fontSize: 15,
  },
  toolbar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
    marginTop: 21,
    marginBottom: 13,
  },
  section: {
    fontFamily: typography.displayFont,
    fontSize: 19,
    fontWeight: '700',
    color: colors.text,
  },
  sort: { paddingVertical: 8, paddingLeft: 8 },
  sortText: {
    fontFamily: typography.bodyFont,
    fontSize: 12,
    color: colors.primary,
    fontWeight: '700',
  },
  pressed: { opacity: 0.5 },
  footer: { paddingTop: 12, paddingBottom: 10 },
  action: {
    backgroundColor: colors.background,
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 8,
  },
});
