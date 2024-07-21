import React from 'react'
import MainNav from '../shared/Navigation/MainNav'
import Hero from '../components/Hero/Hero'
import HomeCards from '../components/HomeCards/HomeCards'
import Footer from '../shared/footer/Footer'

const Home = () => {
  return (
    <>
    <MainNav />
    <Hero />
    <HomeCards />
    <Footer />
    </>
  )
}

export default Home