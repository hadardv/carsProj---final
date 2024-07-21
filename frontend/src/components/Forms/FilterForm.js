import React, { useState,useEffect } from 'react';
import Input from './Input'; // Import the Input component you've created
import './FilterForm.css'

function FilterForm({ onApplyFilter }) {
  const [filters, setFilters] = useState({
    battery: '',
    carName: '',
    efficiency: '',
    fastCharge: '',
    priceDE: '',
    range: '',
    topSpeed: '',
    acceleration: '',
    avarageKm: '',
    state: ''
  });
  const [errors, setErrors] = useState({});
  const [states, setStates] = useState([]);

  useEffect(() => {
    async function fetchStates() {
      try {
        const response = await fetch('http://localhost:5000/api/states');
        const data = await response.json();
        setStates(data);
      } catch (error) {
        console.error('Error fetching states:', error);
      }
    }
    fetchStates();
  }, []);

  const handleChange = (field, value) => {
    setFilters(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: null }));
  };

  const validate = () => {
    const newErrors = {};
    if (filters.battery && isNaN(Number(filters.battery))) newErrors.battery = 'Battery must be a number';
    if (filters.efficiency && isNaN(Number(filters.efficiency))) newErrors.efficiency = 'Efficiency must be a number';
    if (filters.fastCharge && isNaN(Number(filters.fastCharge))) newErrors.fastCharge = 'Fast charge must be a number';
    if (filters.priceDE && isNaN(Number(filters.priceDE))) newErrors.priceDE = 'Price must be a number';
    if (filters.range && isNaN(Number(filters.range))) newErrors.range = 'Range must be a number';
    if (filters.topSpeed && isNaN(Number(filters.topSpeed))) newErrors.topSpeed = 'Top speed must be a number';
    if (filters.acceleration && isNaN(Number(filters.acceleration))) newErrors.acceleration = 'Acceleration must be a number';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onApplyFilter(filters);
    }
  };

  console.log(filters)



  return (
    <form className="filter-form" onSubmit={handleSubmit}>
      <Input
        label="Battery (kWh)"
        type="number"
        value={filters.battery}
        onChange={e => handleChange('battery', e.target.value)}
        error={errors.battery}
      />
      <Input
        label="Car Name"
        type="text"
        value={filters.carName}
        onChange={e => handleChange('carName', e.target.value)}
      />
      <Input
        label="Efficienct"
        type="number"
        value={filters.efficiency}
        onChange={e => handleChange('efficiency', e.target.value)}
      />
      <Input
        label="Fast Charge"
        type="number"
        value={filters.fastCharge}
        onChange={e => handleChange('fastCharge', e.target.value)}
      />
      <Input
       label="Max Price"
       type="number"  
       value={filters.priceDE}
       onChange={e => handleChange('priceDE', e.target.value)}
/>
      <Input
        label="Range"
        type="number"
        value={filters.range}
        onChange={e => handleChange('range', e.target.value)}
        />
       <Input
        label="Top Speed"
        type="number"
        value={filters.topSpeed}
        onChange={e => handleChange('topSpeed', e.target.value)}
      />
        <Input
        label="Acceleration 0-100"
        type="number"
        value={filters.acceleration}
        onChange={e => handleChange('acceleration', e.target.value)}
      />
        <Input
        label="Avarage km/year"
        type="number"
        value={filters.avarageKm}
        onChange={e => handleChange('avarageKm', e.target.value)}
      />
      <div className="form-group">
        <label htmlFor="state">State</label>
        <select
          id="state"
          name="state"
          value={filters.state}
          onChange={e => handleChange('state', e.target.value)}
          className="input-field"
        >
          <option value="">Select a state</option>
          {states.map(state => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </select>
      </div>
      <button className="submit-btn" type="submit">סנן</button>
    </form>
  );
}

export default FilterForm;
