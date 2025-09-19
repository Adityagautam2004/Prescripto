import { createContext, useState } from "react";
import axios from "axios";
import { toast } from 'react-toastify';

export const AdminContext = createContext();

export const AdminContextProvider = (props) => {
  const [aToken, setAToken] = useState(localStorage.getItem("aToken")? localStorage.getItem('aToken'):(""));
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [dashData, setDashData] = useState(false);

  const backendUrl = import.meta.env.VITE_BACKEND_URL

  const getAllDoctors = async () => {
    try {
      const {data} = await axios.post(backendUrl+"/api/admin/all-doctors",{}, {
        headers: {
          aToken
        },
      });
      if(data.success){
        setDoctors(data.doctors);
      }else{
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const changeAvailibility = async (docId) => {
    try {
      const {data} = await axios.post(backendUrl+"/api/admin/change-availibility",{
        docId
      }, {
        headers: {
          aToken
        },
      });
      if(data.success){
        toast.success(data.message);
        getAllDoctors();
      }else{
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const getAllAppointments = async (showToast = false) => {
    try {
      const {data} = await axios.get(backendUrl+"/api/admin/appointments", {
        headers: {
          aToken
        },
      });
      if(data.success){
        setAppointments(data.appointments);
        // Only show success toast when explicitly requested (not during initial load)
        if (showToast) {
          toast.success(data.message || "Appointments loaded successfully");
        }
      }else{
        toast.error(data.message || "Failed to load appointments");
      }
    } catch (error) {
      console.log(error);
      toast.error("Error loading appointments. Please try again.");
    }
  }

  const cancelAppointment = async (appointmentId) => {
    try {
      // Update local state immediately for better UX
      setAppointments(prevAppointments => 
        prevAppointments.map(appointment => 
          appointment._id === appointmentId 
            ? { ...appointment, cancelled: true } 
            : appointment
        )
      );

      const {data} = await axios.post(backendUrl+"/api/admin/cancel-appointment",{
        appointmentId
      }, {
        headers: {
          aToken
        },
      });
      
      if(data.success){
          toast.success(data.message);
          // Refresh data from server to ensure consistency
          getAllAppointments(true);
        }else{
          toast.error(data.message);
          // Revert the optimistic update if the API call fails
          getAllAppointments();
        }
    } catch (error) {
      console.log(error);
      toast.error("Failed to cancel appointment");
      // Revert the optimistic update if the API call fails
      getAllAppointments();
    }
  }

  const getDashData = async () => {
    try {
      const {data} = await axios.get(backendUrl+"/api/admin/dashboard", {
        headers: {
          aToken
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

  const value = {
    aToken,
    setAToken,
    backendUrl,
    getAllDoctors,
    doctors,
    changeAvailibility,
    getAllAppointments,
    appointments, setAppointments,
    cancelAppointment,
    getDashData,
    dashData
  };
  return (
    <AdminContext.Provider value={value}>
      {props.children}
    </AdminContext.Provider>
  );
};

export default AdminContextProvider;
