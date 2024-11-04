import React from 'react'
import Headers from '../components/Headers'
import SpecialtyMenu from '../components/SpecialtyMenu'
import TopDoctors from '../components/TopDoctors'
import Banner from '../components/Banner'

const Home = () => {
  return (
    <div>
        <Headers />
        <SpecialtyMenu />
        <TopDoctors />
        <Banner />
    </div>
  )
}

export default Home