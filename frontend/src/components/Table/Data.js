import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Table from './Table';
import FilterForm from '../Forms/FilterForm'

const Data = () => {
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState({
    battery: '',
    carName: '',
    efficiency: '',
    fastCharge: '',
    priceDE: '',
    range: '',
    topSpeed: '',
    acceleration: ''
  });

  useEffect(() => {
    axios.get('http://localhost:5000/api/data', { params: filters })
      .then(response => {
        const filteredData = response.data.filter(car => {
        const filterPriceDE = Number(filters.priceDE);
        const carPriceDE = Number(car['Price.DE.']);
          return (!filters.battery || car.Battery === Number(filters.battery)) &&
                 (!filters.carName || car.Car_name.toLowerCase().includes(filters.carName.toLowerCase())) &&
                 (!filters.efficiency || car.Efficiency === Number(filters.efficiency)) &&
                 (!filters.fastCharge || car.Fast_charge === Number(filters.fastCharge)) &&
                 (!filters.priceDE || carPriceDE <= filterPriceDE) &&
                 (!filters.range || car.Range === Number(filters.range)) &&
                 (!filters.topSpeed || car.Top_speed === Number(filters.topSpeed)) &&
                 (!filters.acceleration || car['Acceleration..0.100.'] === Number(filters.acceleration));
        });
        setData(filteredData); 
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, [filters]);
  console.log("Rows to be passed to EnhancedTable:", data);

  const handleApplyFilter = (newFilters) => {
    setFilters(newFilters);
  };
  return (
    <div>
      <FilterForm onApplyFilter={handleApplyFilter} />
      <Table initialRows={data} />
    </div>
  );
};

export default Data;
