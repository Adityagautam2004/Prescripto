import { createContext, useState, useContext } from "react";
import axios from "axios";
import { toast } from 'react-toastify';



export const DoctorContext = createContext();

export const DoctorContextProvider = ( props ) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL
  const [dToken, setDToken] = useState(localStorage.getItem("dToken")? localStorage.getItem('dToken'):'');
  const [appointments, setAppointments] = useState([]);
  const [dashData, setDashData] = useState({});
  const [profileData, setProfileData] = useState({});

  const getAppointments = async (showToast = false) => {
    try {
      const {data} = await axios.get(backendUrl+"/api/doctor/appointments", {
        headers: {
          dToken
        },
      });
      if(data.success){
        setAppointments(data.appointments);
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
      // Update local state immediately for better UX
      setAppointments(prevAppointments => 
        prevAppointments.map(appointment => 
          appointment._id === appointmentId 
            ? { ...appointment, isCompleted: true } 
            : appointment
        )
      );

      const {data} = await axios.post(backendUrl+"/api/doctor/complete-appointment", {
        appointmentId
      }, {
        headers: {
          dToken
        },
      });
      
      if(data.success){
          toast.success(data.message);
          // Refresh data from server to ensure consistency
          getAppointments(true);
        }else{
          toast.error(data.message);
          // Revert the optimistic update if the API call fails
          getAppointments();
        }
    } catch (error) {
      console.log(error);
      toast.error("Failed to complete appointment");
      // Revert the optimistic update if the API call fails
      getAppointments();
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

      const {data} = await axios.post(backendUrl+"/api/doctor/cancel-appointment", {
        appointmentId
      }, {
        headers: {
          dToken
        },
      });
      
      if(data.success){
          toast.success(data.message);
          // Refresh data from server to ensure consistency
          getAppointments(true);
        }else{
          toast.error(data.message);
          // Revert the optimistic update if the API call fails
          getAppointments();
        }
    } catch (error) {
      console.log(error);
      toast.error("Failed to cancel appointment");
      // Revert the optimistic update if the API call fails
      getAppointments();
    }
  }

  const getProfileData = async () => {
    try {
      const {data} = await axios.get(backendUrl+"/api/doctor/profile", {
        headers: {
          dToken
        },
      });
      if(data.success){
        setProfileData(data.profileData);
      }else{
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const toggleAvailability = async (newAvailability) => {
    try {
      if (!profileData || profileData._id === undefined) {
        toast.error("Profile data not available");
        return;
      }
      
      // Toggle the availability using existing update-profile endpoint
      const {data} = await axios.post(backendUrl+"/api/doctor/update-profile", {
        docId: profileData._id,
        available: newAvailability !== undefined ? newAvailability : !profileData.available
      }, {
        headers: {
          dToken
        },
      });
         
        if(data.success){
          toast.success(data.message);
          getProfileData();
        }else{
          toast.error(data.message);
        }
    } catch (error) {
      console.log(error);
      toast.error("Failed to update availability");
    }
  };

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
    getDashboardData,
    profileData,
    getProfileData,
    toggleAvailability
  };
  return (
    <DoctorContext.Provider value={value}>
      {props.children}
    </DoctorContext.Provider>
  );
};

export default DoctorContextProvider;