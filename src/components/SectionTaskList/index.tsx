import { JSX, useCallback } from 'react';
import { Text, SectionList, StyleSheet } from 'react-native';
import { TaskItem } from '@/types/task';
import Card from '@/components/Card';

interface SectionListProps {
  dataDone: TaskItem[];
  dataPending: TaskItem[];
  headerComponent?: JSX.Element;
}

const SectionTaskList = ({ dataDone, dataPending, headerComponent }: SectionListProps) => {
  const renderItem = useCallback(({ item }: { item: TaskItem }) => <Card item={item} />, []);
  return (
    <SectionList
      style={styles.container}
      sections={[
        { title: 'Tarefas concluídas', data: dataDone },
        { title: 'Tarefas pendentes', data: dataPending },
      ]}
      keyExtractor={item => item.id}
      contentContainerStyle={{
        paddingBottom: 80,
      }}
      renderItem={renderItem}
      renderSectionHeader={({ section }) => <Text style={styles.title}>{section.title}</Text>}
      ListHeaderComponent={headerComponent}
      removeClippedSubviews
      maxToRenderPerBatch={10}
      initialNumToRender={10}
      windowSize={5}
    />
  );
};

export default SectionTaskList;

const styles = StyleSheet.create({
  container: {
    width: '90%',
    marginHorizontal: 'auto',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 20,
    marginBottom: 10,
  },
});
