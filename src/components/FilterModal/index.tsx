import React, { useState } from 'react';
import { View, Modal, StyleSheet, Pressable, Text } from 'react-native';
import Switch from '@/components/Switch';
import Button from '@/components/Button';
import { FilterType } from '@/types/task';
import useUiModalStore from '@/store/useUiModalStore';

interface FilterModalProps {
  visible: boolean;
  filter: FilterType;
  setFilter: (filter: FilterType) => void;
}
const FilterModal = ({ visible, filter, setFilter }: FilterModalProps) => {
  const [filterValue, setFilterValue] = useState<FilterType>(filter);
  const closeModal = useUiModalStore(state => state.closeFilterModal);
  const apply = () => {
    if (filterValue === undefined) return;
    setFilter(filterValue);
    closeModal();
  };
  const clearFilter = () => {
    setFilter(undefined);
    closeModal();
  };
  return (
    <Modal transparent visible={visible} animationType="fade" statusBarTranslucent>
      <Pressable style={styles.background} onPress={() => closeModal()}>
        <View style={styles.container} onStartShouldSetResponder={() => true}>
          <Text style={styles.title}>Filtrar por:</Text>
          <Switch
            firstOption="Concluído"
            secondOption="Pendente"
            value={filterValue}
            func={value => setFilterValue(value)}
          />
          <Button func={() => apply()} label={'Aplicar Filtro'} />
          {filterValue && <Button func={() => clearFilter()} label={'Remover Filtro'} />}
        </View>
      </Pressable>
    </Modal>
  );
};

export default FilterModal;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: '#333333',
    width: '80%',
    borderRadius: 15,
    padding: 30,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
    marginTop: 20,
  },
});
