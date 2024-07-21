import React, { useEffect, useState } from 'react';
import { BarChart } from '@mui/x-charts/BarChart';

export default function SalesYearsChart() {
  const [data, setData] = useState({ series: [], xAxis: [] });

  const fetchTotalQuarterlySalesData = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/sales/total-quarterly');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const result = await response.json();
      
      const series = [
        { name: 'Q1', data: [result.q1_2022, result.q1_2023, result.q1_2024] },
        { name: 'Q2', data: [result.q2_2022, result.q2_2023, result.q2_2024] },
        { name: 'Q3', data: [result.q3_2022, result.q3_2023] },
        { name: 'Q4', data: [result.q4_2022, result.q4_2023] },
      ];

      setData({ series, xAxis: ['2022', '2023', '2024'] });
    } catch (error) {
      console.error('Error fetching total quarterly sales data:', error);
    }
  };

  useEffect(() => {
    fetchTotalQuarterlySalesData();
  }, []);

  return (
    <BarChart
      series={data.series}
      height={500}
      xAxis={[{ data: data.xAxis, scaleType: 'band' }]}
      margin={{ top: 20, bottom: 50, left: 90, right: 10 }}
    />
  );
}
