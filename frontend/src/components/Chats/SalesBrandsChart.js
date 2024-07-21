import React, { useEffect, useState } from 'react';
import { PieChart } from '@mui/x-charts/PieChart';

export default function SalesBrandsChart() {
  const [data, setData] = useState([]);

  const fetchTotalSalesByBrand = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/sales/total-by-brand');
      const result = await response.json();
      const formattedData = result.map((row, index) => ({
        id: index,
        value: row.total_sales,
        label: row.automaker,
      }));
      setData(formattedData);
    } catch (error) {
      console.error('Error fetching total sales by brand:', error);
    }
  };

  useEffect(() => {
    fetchTotalSalesByBrand();
  }, []);

  return (
    <div className="chart-container">
      <PieChart
        series={[
          {
            data,
            highlightScope: { faded: 'global', highlighted: 'item' },
            faded: { innerRadius: 30, additionalRadius: -30, color: 'grey' },
          },
        ]}
        height={400}
      />
    </div>
  );
}
