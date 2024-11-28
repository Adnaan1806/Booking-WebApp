import React, { useContext, useEffect } from 'react'
import { DoctorContext } from '../../context/DoctorContext'

const DoctorAppointment = () => {

const {dToken, appointments, getAppointments} = useContext(DoctorContext)

useEffect(() => {
  if(dToken){
    getAppointments()
  }
}, [dToken])

  return (
    <div>DoctorAppointment</div>
  )
}

export default DoctorAppointment