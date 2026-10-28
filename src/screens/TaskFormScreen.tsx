import React, { useEffect, useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import { categories, priorities, TaskCategory, TaskPriority } from '../types/task';
import { useTasks } from '../context/TaskContext';
import { formatDate, validateDueDate } from '../utils/dateUtils';
import { AppButton } from '../components/AppButton';
import { colors } from '../theme/colors';

type Props = NativeStackScreenProps<RootStackParamList, 'TaskForm'>;

export function TaskFormScreen({ route, navigation }: Props) {
  const { tasks, loading, addTask, updateTask } = useTasks();
  const taskId = route.params?.taskId;
  const existing = taskId ? tasks.find(item => item.id === taskId) : undefined;
  const [title, setTitle] = useState(existing?.title ?? '');
  const [note, setNote] = useState(existing?.note ?? '');
  const [category, setCategory] = useState<TaskCategory>(existing?.category ?? 'Học tập');
  const [priority, setPriority] = useState<TaskPriority>(existing?.priority ?? 'Trung bình');
  const [dueDate, setDueDate] = useState(existing?.dueDate ?? formatDate(new Date()));
  const [titleError, setTitleError] = useState<string | undefined>();
  const [dateError, setDateError] = useState<string | undefined>();

  useEffect(() => { if (taskId && !loading && !existing) { navigation.popToTop(); } }, [taskId, loading, existing, navigation]);

  function save() {
    const cleanTitle = title.trim();
    const nextTitleError = !cleanTitle ? 'Vui lòng nhập tên công việc.' : cleanTitle.length > 50 ? 'Tên công việc tối đa 50 ký tự.' : undefined;
    const nextDateError = validateDueDate(dueDate, Boolean(taskId));
    setTitleError(nextTitleError);
    setDateError(nextDateError);
    if (nextTitleError || nextDateError) { return; }
    const input = { title: cleanTitle, note: note.trim(), category, priority, dueDate };
    if (taskId) { updateTask(taskId, input); } else { addTask(input); }
    navigation.goBack();
  }

  if (taskId && !existing) { return <SafeAreaView style={styles.screen} />; }

  return <SafeAreaView style={styles.screen} edges={['bottom']}>
    <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <Text style={styles.intro}>{taskId ? 'Cập nhật kế hoạch của bạn' : 'Thêm một việc vào kế hoạch'}</Text>
        <Text style={styles.label}>Tên công việc <Text style={styles.required}>*</Text></Text>
        <TextInput value={title} onChangeText={value => { setTitle(value); if (titleError) { setTitleError(undefined); } }} placeholder="Ví dụ: Hoàn thành bài tập" placeholderTextColor={colors.muted} style={[styles.input, titleError && styles.invalid]} accessibilityLabel="Tên công việc" />
        {titleError && <Text style={styles.error}>{titleError}</Text>}
        <Text style={styles.label}>Ghi chú</Text>
        <TextInput value={note} onChangeText={setNote} placeholder="Thêm thông tin nếu cần..." placeholderTextColor={colors.muted} multiline textAlignVertical="top" style={[styles.input, styles.note]} accessibilityLabel="Ghi chú" />
        <Text style={styles.label}>Danh mục</Text>
        <View style={styles.options}>{categories.map(value => <Pressable key={value} onPress={() => setCategory(value)} style={({ pressed }) => [styles.option, category === value && styles.optionSelected, pressed && styles.pressed]}><Text style={[styles.optionText, category === value && styles.optionTextSelected]}>{value}</Text></Pressable>)}</View>
        <Text style={styles.label}>Mức ưu tiên</Text>
        <View style={styles.options}>{priorities.map(value => <Pressable key={value} onPress={() => setPriority(value)} style={({ pressed }) => [styles.option, priority === value && styles.optionSelected, pressed && styles.pressed]}><Text style={[styles.optionText, priority === value && styles.optionTextSelected]}>{value}</Text></Pressable>)}</View>
        <Text style={styles.label}>Hạn hoàn thành <Text style={styles.required}>*</Text></Text>
        <TextInput value={dueDate} onChangeText={value => { setDueDate(value); if (dateError) { setDateError(undefined); } }} placeholder="dd/mm/yyyy" placeholderTextColor={colors.muted} keyboardType="numeric" maxLength={10} style={[styles.input, dateError && styles.invalid]} accessibilityLabel="Hạn hoàn thành" />
        {dateError && <Text style={styles.error}>{dateError}</Text>}
        <Text style={styles.hint}>Định dạng: dd/mm/yyyy</Text>
        <View style={styles.save}><AppButton label="Lưu công việc" onPress={save} /></View>
      </ScrollView>
    </KeyboardAvoidingView>
  </SafeAreaView>;
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  flex: { flex: 1 },
  content: { paddingHorizontal: 20, paddingTop: 18, paddingBottom: 36 },
  intro: { fontSize: 21, fontWeight: '800', color: colors.text, marginBottom: 22 },
  label: { fontSize: 14, fontWeight: '700', color: colors.text, marginTop: 17, marginBottom: 9 },
  required: { color: colors.danger },
  input: { minHeight: 50, paddingHorizontal: 15, borderWidth: 1, borderColor: colors.border, borderRadius: 13, backgroundColor: colors.surface, color: colors.text, fontSize: 15 },
  note: { height: 105, paddingTop: 13 },
  invalid: { borderColor: colors.danger },
  error: { fontSize: 12, color: colors.danger, marginTop: 6 },
  options: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  option: { borderWidth: 1, borderColor: colors.border, backgroundColor: colors.surface, paddingHorizontal: 14, paddingVertical: 11, borderRadius: 12 },
  optionSelected: { borderColor: colors.primary, backgroundColor: colors.primarySoft },
  optionText: { color: colors.muted, fontSize: 14, fontWeight: '600' },
  optionTextSelected: { color: colors.primary },
  pressed: { opacity: 0.6 },
  hint: { color: colors.muted, fontSize: 12, marginTop: 7 },
  save: { marginTop: 28 },
});
