import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import SectionTaskList from '@/components/SectionTaskList';
import Chart from '@/components/Chart';
import useAnalytics from '@/hooks/useAnalytics';
import ScreenTitle from '@/components/ScreenTitle';
import ProtectedLayout from '@/components/ProtectedLayout';
import useFilteredList from '@/hooks/useFilteredList';

const Analytics = () => {
  const { getAnalyticsData } = useAnalytics();
  const { getUserTaskList, doneList, pendingList } = useFilteredList();
  return (
    <ProtectedLayout>
      <View style={styles.container}>
        <ScreenTitle title="Estatísticas" />
        <SectionTaskList
          dataDone={doneList}
          dataPending={pendingList}
          headerComponent={
            <>
              <View style={styles.tagsContainer}>
                <Text style={{ ...styles.tag, backgroundColor: '#72aa7b' }}>Concluídas: {doneList.length}</Text>
                <Text style={{ ...styles.tag, backgroundColor: '#E98484' }}>Pendentes: {pendingList.length}</Text>
              </View>
              <Chart data={getAnalyticsData()} total={getUserTaskList().length} />
              <Text style={styles.info}>Relação de tarefas</Text>
            </>
          }
        />
      </View>
    </ProtectedLayout>
  );
};

export default Analytics;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  info: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'white',
    alignSelf: 'center',
    borderBottomColor: 'white',
    borderBottomWidth: 1,
    paddingHorizontal: 50,
    paddingVertical: 10,
  },
  listArea: {
    flex: 1,
    width: '90%',
    marginHorizontal: 'auto',
  },
  tagsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  tag: {
    color: 'white',

    alignSelf: 'center',
    textAlign: 'center',
    marginBottom: 30,
    padding: 10,
    width: 180,
    borderRadius: 10,
    fontSize: 18,
  },
});
