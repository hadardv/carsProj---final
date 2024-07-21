import * as React from 'react';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80%',
  maxHeight: '80vh', 
  overflowY: 'auto', 
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const EditModal = ({ isOpen, onClose, onSubmit, selectedRow }) => {
  const [formData, setFormData] = useState({
    Car_name: '',
    Battery: '',
    Car_name_link: '',
    Efficiency: '',
    Fast_charge: '',
    'Price.DE.': '',
    Range: '',
    Top_speed: '',
    'Acceleration..0.100.': '',
  });

  useEffect(() => {
    if (selectedRow) {
      setFormData(selectedRow);
    }
  }, [selectedRow]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(formData);
    onClose();
  };

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          עריכת רכב
        </Typography>
        <form onSubmit={handleSubmit} noValidate autoComplete="off">
          <TextField
            margin="dense"
            name="Car_name"
            label="Car Name"
            type="text"
            fullWidth
            value={formData.Car_name}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="Battery"
            label="Battery (kWh)"
            type="number"
            fullWidth
            value={formData.Battery}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="Car_name_link"
            label="Car Name Link"
            type="text"
            fullWidth
            value={formData.Car_name_link}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="Efficiency"
            label="Efficiency (Wh/km)"
            type="number"
            fullWidth
            value={formData.Efficiency}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="Fast_charge"
            label="Fast Charge (min)"
            type="number"
            fullWidth
            value={formData.Fast_charge}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="Price.DE."
            label="Price (DE)"
            type="text"
            fullWidth
            value={formData['Price.DE.']}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="Range"
            label="Range (km)"
            type="number"
            fullWidth
            value={formData.Range}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="Top_speed"
            label="Top Speed (km/h)"
            type="number"
            fullWidth
            value={formData.Top_speed}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="Acceleration..0.100."
            label="Acceleration 0-100 (s)"
            type="number"
            fullWidth
            value={formData['Acceleration..0.100.']}
            onChange={handleChange}
          />
          <Button type="submit" color="primary" variant="contained">
            שמור שינויים
          </Button>
        </form>
      </Box>
    </Modal>
  );
};



export default EditModal;
