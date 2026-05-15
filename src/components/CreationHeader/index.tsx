import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Button from '../Button';
import CreationModal from '@/components/CreationModal';
import TransferModal from '../TransferTasksModal';
import useTransfer from '@/hooks/useTransfer';
import useUiModalStore from '@/store/useUiModalStore';

const CreationHeader = () => {
  const modalVisible = useUiModalStore(state => state.createModalVisible);
  const transferModal = useUiModalStore(state => state.transferModalVisible);
  const openModal = useUiModalStore(state => state.openCreateModal);
  const openTransferModal = useUiModalStore(state => state.openTransferModal);
  const { checkGuestTasks, guestTasks } = useTransfer();

  return (
    <View style={styles.header}>
      <View style={styles.addContainer}>
        <Button func={() => openModal()} label={'Nova Tarefa'} />
        {checkGuestTasks() && (
          <Button func={() => openTransferModal()} label={`${guestTasks.length} Tarefas como visitante`} />
        )}
        {transferModal && <TransferModal visible={transferModal} data={guestTasks} />}
      </View>
      {modalVisible && <CreationModal visible={modalVisible} />}
    </View>
  );
};

export default CreationHeader;

const styles = StyleSheet.create({
  header: {
    width: '90%',
    marginHorizontal: 'auto',
  },
  addContainer: {
    width: '100%',
    gap: 10,
    alignItems: 'center',
  },
});
