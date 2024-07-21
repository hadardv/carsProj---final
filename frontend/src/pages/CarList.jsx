import React from 'react'
import { useState } from 'react'
import MainNav from '../shared/Navigation/MainNav'
import Footer from '../shared/footer/Footer'
import Data from '../components/Table/Data'
import { Button } from '@mui/material'
import AddCarModal from '../components/Modal/AddCarModal'
import './CarList.css'


const CarList = () => {

  const [isModalOpen,setIsModalOpen] = useState(false);
  const [cars, setCars] = useState([]); 

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleAddCar = async (newCar) => {
    try {
      const response = await fetch('http://localhost:5000/api/cars', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newCar)
      });
      if (response.status !== 201) throw new Error('Failed to add the car');
      setCars([...cars, newCar]); // Update the local state
    } catch (error) {
      console.error("Error adding car:", error);
    }
  };

  return (
    <>
      <MainNav />
      <Data cars={cars} />
      <div className="add-btn-container">
        <Button variant="contained" onClick={handleOpenModal}>
          הוסף רכב
        </Button>
        <AddCarModal isOpen={isModalOpen} onClose={handleCloseModal} onSubmit={handleAddCar} />
      </div>
      <Footer />
    </>
  );
}

export default CarList