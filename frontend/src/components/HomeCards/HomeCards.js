import React from "react";
import Card from "../Card/Card";
import './HomeCards.css'
import Divider from '@mui/material/Divider';



const HomeCards = () => {
  return (
    <>
    <div className="header-text">
      <h1>השירותים שלנו</h1>
    </div>
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <Divider style={{ backgroundColor: '#CAF0F8', width: '400px' }} />
    </div>
    <div className="container-cards">
            <Card title={"מידע על רכבים"} description={"גישה למאגר ענק של רכבים חשמליים"} path={"/CarList"} />
            <Card  title={"הדגמים המובילים"} description={"צפו בדגמים המוצלחים ביותר בתחום"} path={"/Leading"}/>
      </div>
      </>
  );
};

export default HomeCards