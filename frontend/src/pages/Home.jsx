import React from 'react'
import Headers from '../components/Headers'
import SpecialtyMenu from '../components/SpecialtyMenu'
import TopDoctors from '../components/TopDoctors'

const Home = () => {
  return (
    <div>
        <Headers />
        <SpecialtyMenu />
        <TopDoctors />
    </div>
  )
}

export default Home