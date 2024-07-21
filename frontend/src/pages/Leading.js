import React from 'react'
import MainNav from '../shared/Navigation/MainNav'
import Footer from '../shared/footer/Footer'
import Podium from '../components/Podium/Podium'
import SalesYearsChart from '../components/Chats/SalesYearsChart'
import './Leading.css'
import Divider from '@mui/material/Divider';
import SalesBrandsChart from '../components/Chats/SalesBrandsChart'



const Leading = () => {
  return (
    <>
    <MainNav />
    <Podium />
    <div className='upper-chart-header'>
    <h1>מכירות רכבים חשמליים בין השנים 2022-2024</h1>
    </div>
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <Divider style={{ backgroundColor: '#CAF0F8', width: '400px' }} />
    </div>
    <SalesYearsChart />
    <div className='bottom-chart'>
    <h1>החברות המובילות</h1>
    <SalesBrandsChart />
    </div>
    <Footer />
    </>
  )
}

export default Leading