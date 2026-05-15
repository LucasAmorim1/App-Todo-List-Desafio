import { PieDataType } from '@/types/task';
import useFilteredList from './useFilteredList';

const useAnalytics = () => {
  const { doneList, pendingList } = useFilteredList();
  const getAnalyticsData = () => {
    const doneData = { value: doneList.length, color: '#9FD2AD', text: 'Done tasks' };
    const pendingData = { value: pendingList.length, color: '#E98484', text: 'Pending tasks' };
    const data: PieDataType[] = [pendingData, doneData];
    return data;
  };

  return { getAnalyticsData };
};

export default useAnalytics;
