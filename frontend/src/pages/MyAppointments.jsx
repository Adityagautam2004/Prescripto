import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const MyAppointments = () => {
  const {backendURL, token, getDoctorsData} = useContext(AppContext)
  const [appointments, setAppointments] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchAppointments = async () => {
    try {
      const {data} = await axios.get(backendURL + '/api/user/get-appointments', {
        headers: {token}
      })
      if(data.success) {
        setAppointments(data.appointments)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error('Error fetching appointments')
    } finally {
      setLoading(false)
    }
  }
  const cancelAppointment = async (appointmentId) => {
    try {
      const {data} = await axios.post(backendURL + '/api/user/cancel-appointment', {
        appointmentId
      }, {
        headers: {token}
      })
      if(data.success) {
        toast.success(data.message)
        fetchAppointments()
        getDoctorsData()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error('Error canceling appointment')
    }
  }

  useEffect(() => {
    if(token) {
      fetchAppointments()
      getDoctorsData()
    } else {
      setLoading(false)
    }
  }, [token])

  const formatDate = (slotDate) => {
    const [day, month, year] = slotDate.split('-')
    const date = new Date(year, month - 1, day)
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  }

  if(loading) {
    return (
      <div className='flex justify-center items-center h-64'>
        <p className='text-gray-500'>Loading appointments...</p>
      </div>
    )
  }

  if(!token) {
    return (
      <div className='flex justify-center items-center h-64'>
        <p className='text-gray-500'>Please login to view your appointments</p>
      </div>
    )
  }

  return (
    <div>
      <p className='pb-3 mt-12 font-medium text-zinc-700 border-b'>My Appointments</p>
      <div>
        {appointments.length === 0 ? (
          <div className='flex justify-center items-center h-64'>
            <p className='text-gray-500'>No appointments found</p>
          </div>
        ) : (
          appointments.map((appointment, index) => (
            <div className='grid grid-cols-[1fr_3fr] gap-4 sm:flex sm:gap-6 py-2 border-b' key={index}>
              <div>
                <img className='w-32 bg-indigo-50' src={appointment.docData.image} alt={appointment.docData.name} />
              </div>
              <div className='flex-1 text-sm text-zinc-700'>
                <p className='text-neutral-800 font-semibold'>{appointment.docData.name}</p>
                <p>{appointment.docData.speciality}</p>
                <p className='text-zinc-700 font-medium mt-1'>Address:</p>
                <p className='text-xs'>{appointment.docData.address.line1}</p>
                <p className='text-xs'>{appointment.docData.address.line2}</p>
                <p className='text-xs mt-1'>
                  <span className='text-sm text-neutral-700 font-medium'>Date & Time: </span> 
                  {formatDate(appointment.slotDate)} | {appointment.slotTime}
                </p>
                {/* <p className='text-xs mt-1'>
                  <span className='text-sm text-neutral-700 font-medium'>Fee:</span> 
                  ₹{appointment.amount}
                </p>
                <p className='text-xs mt-1'>
                  <span className='text-sm text-neutral-700 font-medium'>Status:</span> 
                  <span className={`ml-1 px-2 py-1 rounded text-xs ${
                    appointment.cancelled ? 'bg-red-100 text-red-800' :
                    appointment.isCompleted ? 'bg-green-100 text-green-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {appointment.cancelled ? 'Cancelled' :
                     appointment.isCompleted ? 'Completed' :
                     'Upcoming'}
                  </span>
                </p> */}
              </div>
              <div></div>
              <div className='flex flex-col gap-2 justify-end'>
                {!appointment.payment && !appointment.cancelled && (
                  <button className='text-sm text-stone-500 text-center sm:min-w-48 py-2 border hover:bg-[#5f6FFF] hover:text-white transition-all duration-300'>
                    Pay Online 
                  </button>
                )}
                {!appointment.cancelled && !appointment.isCompleted && (
                  <button onClick={() => cancelAppointment(appointment._id)} className='text-sm text-stone-500 text-center sm:min-w-48 py-2 border hover:bg-red-500 hover:text-white transition-all duration-300'>
                    Cancel Appointment
                  </button>
                )}
                {appointment.cancelled && (
                 <button className='sm:min-w-48 py-2 border border-red-500 text-red-500 rounded'>
                  Cancelled
                 </button>
                )}
                {appointment.isCompleted && (
                 <button className='sm:min-w-48 py-2 border border-green-500 text-green-500 rounded'>
                  Completed
                 </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default MyAppointments