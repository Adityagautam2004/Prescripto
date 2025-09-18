import { createContext, useState, useContext } from "react";
import axios from "axios";
import { toast } from 'react-toastify';
import { AppContext } from './AppContext';



export const DoctorContext = createContext();

export const DoctorContextProvider = ( props ) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL
  const [dToken, setDToken] = useState(localStorage.getItem("dToken")? localStorage.getItem('dToken'):'');
  const [appointments, setAppointments] = useState([]);
  const [dashData, setDashData] = useState({});

  const getAppointments = async () => {
    try {
      const {data} = await axios.get(backendUrl+"/api/doctor/appointments", {
        headers: {
          dToken
        },
      });
      if(data.success){
        setAppointments(data.appointments);
      }else{
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const getDashboardData = async () => {
    try {
      const {data} = await axios.get(backendUrl+"/api/doctor/dashboard", {
        headers: {
          dToken
        },
      });
      if(data.success){
        setDashData(data.dashData);
      }else{
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const completeAppointment = async (appointmentId) => {
    try {
      const {data} = await axios.post(backendUrl+"/api/doctor/complete-appointment", {
        appointmentId
      }, {
        headers: {
          dToken
        },
      });
      if(data.success){
        toast.success(data.message);
        getAppointments();
      }else{
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const cancelAppointment = async (appointmentId) => {
    try {
      const {data} = await axios.post(backendUrl+"/api/doctor/cancel-appointment", {
        appointmentId
      }, {
        headers: {
          dToken
        },
      });
      if(data.success){
        toast.success(data.message);
        getAppointments();
      }else{
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const value = {
    dToken,
    setDToken,
    backendUrl,
    appointments,
    setAppointments,
    getAppointments,
    completeAppointment,
    cancelAppointment,
    dashData,
    getDashboardData
  };
  return (
    <DoctorContext.Provider value={value}>
      {props.children}
    </DoctorContext.Provider>
  );
};

export default DoctorContextProvider;