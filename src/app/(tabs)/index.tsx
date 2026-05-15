import React from 'react';
import { StyleSheet, View } from 'react-native';
import TaskList from '@/components/TaskList';
import EditModal from '@/components/EditModal';
import FilterHeader from '@/components/FilterHeader';
import CreationHeader from '@/components/CreationHeader';
import useFilteredList from '@/hooks/useFilteredList';
import ScreenTitle from '@/components/ScreenTitle';
import useUiModalStore from '@/store/useUiModalStore';

const Home = () => {
  const { search, filter, setSearch, setFilter, filteredList } = useFilteredList();
  const editModalVisible = useUiModalStore(state => state.editModalVisible);

  return (
    <View style={styles.container}>
      <ScreenTitle title={'Lista To Do'} />
      <FilterHeader filter={filter} setFilter={setFilter} setSearch={setSearch} />
      <CreationHeader />
      <View style={styles.listArea}>
        <TaskList data={filteredList} filterApplied={!search && !filter} />
      </View>
      {editModalVisible && <EditModal visible={editModalVisible} />}
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'white',
    margin: 20,
  },
  listArea: {
    flex: 1,
    width: '90%',
    marginHorizontal: 'auto',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: 20,
  },
});
