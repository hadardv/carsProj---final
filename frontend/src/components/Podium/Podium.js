import React from 'react'
import { useState, useEffect } from 'react'
import Card from '../Card/Card'
import './Podium.css'

const Podium = (props) => {
  
  const fetchCarData = async (endpoint) => {
    try {
      const response = await fetch(`http://localhost:5000/api/cars/${endpoint}`);
      return await response.json();
    } catch (error) {
      console.error(`Error fetching ${endpoint} car:`, error);
      return null;
    }
  };

  const [fastestCar, setFastestCar] = useState(null);
  const [lowestAccelerationCar, setLowestAccelerationCar] = useState(null);
  const [mostFastChargeCar, setMostFastChargeCar] = useState(null);
  const [mostEfficientCar, setMostEfficientCar] = useState(null);
  const [biggestBatteryCar, setBiggestBatteryCar] = useState(null);
  const [biggestRangeCar, setBiggestRangeCar] = useState(null);

  useEffect(() => {
    fetchCarData('fastest').then(setFastestCar);
    fetchCarData('lowest-acceleration').then(setLowestAccelerationCar);
    fetchCarData('most-fast-charge').then(setMostFastChargeCar);
    fetchCarData('most-efficient').then(setMostEfficientCar);
    fetchCarData('biggest-battery').then(setBiggestBatteryCar);
    fetchCarData('biggest-range').then(setBiggestRangeCar);
  }, []);

  return (
    <>
      <div className='upper-line'>
        <h1>היעיל ביותר</h1>
        {mostEfficientCar && <Card title={mostEfficientCar.Car_name} description={mostEfficientCar.Efficiency} path={mostEfficientCar.Car_name_link} />}
      </div>
      <div className='second-line'>
        <div className='acceleration'>
          <h1>הזריז</h1>
          {lowestAccelerationCar && <Card title={lowestAccelerationCar.Car_name} description={lowestAccelerationCar['Acceleration..0.100.']} path={lowestAccelerationCar.Car_name_link} />}
        </div>
        <div className='fast'>
          <h1>המהיר</h1>
          {fastestCar && <Card title={fastestCar.Car_name} description={fastestCar.Top_speed} path={fastestCar.Car_name_link} />}
        </div>
      </div>
      <div className='bottom-line'>
        <div className='acceleration'>
          <h1>הטעינה המהירה</h1>
          {mostFastChargeCar && <Card title={mostFastChargeCar.Car_name} description={mostFastChargeCar.Fast_charge} path={mostFastChargeCar.Car_name_link} />}
        </div>
        <div className='fast'>
          <h1>הסוללה הגדולה</h1>
          {biggestBatteryCar && <Card title={biggestBatteryCar.Car_name} description={biggestBatteryCar.Battery} path={biggestBatteryCar.Car_name_link} />}
        </div>
        <div className='acceleration'>
          <h1>הטווח הארוך ביותר</h1>
          {biggestRangeCar && <Card title={biggestRangeCar.Car_name} description={biggestRangeCar.Range} path={biggestRangeCar.Car_name_link} />}
        </div>
      </div>
    </>
  );
}

export default Podium
