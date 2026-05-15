import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Input } from '@/components/Input';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import SquareButton from '@/components/SquareButton';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FilterModal from '../FilterModal';
import { FilterType } from '@/types/task';
import useUiModalStore from '@/store/useUiModalStore';

interface FilterHeaderProps {
  setSearch: (text: string) => void;
  filter: FilterType;
  setFilter: (status: FilterType) => void;
}

const FilterHeader = ({ setSearch, filter, setFilter }: FilterHeaderProps) => {
  const filterModal = useUiModalStore(state => state.filterModalVisible);
  const openFilter = useUiModalStore(state => state.openFilterModal);
  const getActiveFilterBadge = () => {
    if (filter) {
      return (
        <View style={{ ...styles.filterApplied, backgroundColor: filter === 'Concluído' ? '#9FD2AD' : '#C47F7F' }} />
      );
    }
    return;
  };
  return (
    <View style={styles.header}>
      <View style={styles.searchContainer}>
        <View style={{ width: '80%' }}>
          <Input.Root onChangeText={text => setSearch(text)} placeholder="Pesquisar">
            <Input.Icon icon={<FontAwesome name="search" size={16} color="#808080" />} position="right" />
          </Input.Root>
        </View>
        <SquareButton
          func={() => openFilter()}
          floatingIcon={getActiveFilterBadge()}
          icon={<MaterialIcons name="filter-alt" size={24} color="white" />}
        />
      </View>
      {filterModal && <FilterModal filter={filter} setFilter={setFilter} visible={filterModal} />}
    </View>
  );
};

export default FilterHeader;

const styles = StyleSheet.create({
  header: {
    width: '90%',
    marginHorizontal: 'auto',
  },
  searchContainer: {
    width: '100%',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  filterApplied: {
    position: 'absolute',
    top: -5,
    right: -5,
    height: 18,
    width: 18,
    borderRadius: '50%',
  },
});
