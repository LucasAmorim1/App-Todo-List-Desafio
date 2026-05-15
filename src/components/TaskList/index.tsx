import { useCallback } from 'react';
import { FlatList } from 'react-native';
import { TaskItem } from '@/types/task';
import Card from '@/components/Card';
import EmptyList from '@/components/EmptyList';

interface ListProps {
  data: TaskItem[];
  collapsed?: boolean;
  filterApplied: boolean;
}

const TaskList = ({ data, collapsed, filterApplied }: ListProps) => {
  const renderItem = useCallback(({ item }: { item: TaskItem }) => <Card item={item} />, []);
  return (
    <FlatList
      style={{ flex: 1 }}
      data={collapsed ? [] : data}
      keyExtractor={item => item.id.toString()}
      contentContainerStyle={{
        paddingBottom: 80,
      }}
      ListEmptyComponent={
        filterApplied ? (
          <EmptyList text={'Lista de tarefas vazia, clique em "Nova Tarefa" para criar sua primeira tarefa!'} />
        ) : (
          <EmptyList text={'Nenhum resultado encontrado'} />
        )
      }
      renderItem={renderItem}
      removeClippedSubviews
      maxToRenderPerBatch={10}
      initialNumToRender={10}
      windowSize={5}
    />
  );
};

export default TaskList;
