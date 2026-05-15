import React from 'react';
import { View, Text } from 'react-native';
import { PieChart } from 'react-native-gifted-charts';
import { PieDataType } from '@/types/task';

interface ChartProps {
  data: PieDataType[];
  total: number;
}

const Chart = ({ data, total }: ChartProps) => {
  return (
    <View
      style={{
        alignItems: 'center',
        marginBottom: 50,
      }}>
      <PieChart
        donut
        radius={150}
        innerCircleColor={'#212121'}
        innerRadius={80}
        data={data}
        centerLabelComponent={() => {
          return <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'white', margin: 20 }}>Tarefas: {total}</Text>;
        }}
      />
    </View>
  );
};

export default Chart;
