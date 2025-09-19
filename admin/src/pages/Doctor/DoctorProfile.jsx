import React, { useContext, useState, useEffect } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { AppContext } from "../../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const DoctorProfile = () => {
  const { dToken, profileData, setProfileData, getProfileData, backendUrl, toggleAvailability } = useContext(DoctorContext);
  const { currency } = useContext(AppContext);
  const [isEdit, setIsEdit] = useState(false);
  const [localFees, setLocalFees] = useState('');
  const [localAddressLine1, setLocalAddressLine1] = useState('');
  const [localAddressLine2, setLocalAddressLine2] = useState('');
  const [localAvailable, setLocalAvailable] = useState(false);

  const updateProfile = async () => {
    try {
      // Ensure we have all required data
      if (!profileData || !profileData._id) {
        toast.error("Profile data not available");
        return;
      }
      
      // Send data in the format expected by the backend
      const requestData = {
        docId: profileData._id,  // Include docId which is required by backend
        fees: localFees,
        available: localAvailable,
        // Format address to ensure it's properly structured
        address: {
          line1: localAddressLine1,
          line2: localAddressLine2
        }
      };

      const { data } = await axios.post(
        `${backendUrl}/api/doctor/update-profile`,
        requestData,
        {
          headers: {
            dToken,
          },
        }
      );
      
      if (data.success) {
        setIsEdit(false);
        getProfileData();
        toast.success("Profile updated successfully");
      } else {
        toast.error(data.message || "Failed to update profile");
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to update profile. Please try again.");
    }
  };

  useEffect(() => {
    if (dToken) {
      getProfileData();
    }
  }, [dToken]);

  // Initialize local state when profileData changes
  useEffect(() => {
    if (profileData && profileData._id) {
      setLocalFees(profileData.fees || '');
      setLocalAddressLine1(profileData.address?.line1 || '');
      setLocalAddressLine2(profileData.address?.line2 || '');
      setLocalAvailable(profileData.available || false);
    }
  }, [profileData]);

  // Log isEdit state changes for debugging
  useEffect(() => {
    console.log('isEdit state changed:', isEdit);
  }, [isEdit]);

  return (
    profileData && profileData._id ? (
      <div>
        <div className="flex flex-col gap-4 m-5">
          <div>
            <img
              className="bg-[#5F6FFF] w-full sm:max-w-64 rounded-lg"
              src={profileData.image}
              alt=""
            />
          </div>
          <div className="flex-1 border border-stone-100 rounded-lg p-8 py-7 bg-white">
            {/*------Doc Info : name, degree, experience ----*/}
            <p className="flex items-center gap-2 text-3xl font-medium text-gray-700">
              {profileData.name}
            </p>
            <div className="flex items-center gap-2 mt-1 text-gray-600">
              <p>
                {profileData.degree} - {profileData.speciality}
              </p>
              <button className="py-0.5 px-2 border text-xs rounded-full">
                {profileData.experience}
              </button>
            </div>

            {/* ------Doc About ---- */}

            <div>
              <p className="flex items-center gap-1 text-sm font-medium text-neutral-800 mt-3">
                About:
              </p>
              <p className="text-sm text-gray-600 max-w-[700px] mt-1">
                {profileData.about}
              </p>
            </div>
            <p className="text-gray-600 font-medium mt-4">
              Appointment fee:{" "}
              <span>
                {currency}{" "}
                {isEdit ? (
                  <input
                    type="number"
                    className="border border-gray-300 rounded px-2 py-1 ml-1 w-24"
                    onChange={(e) => {
                      e.stopPropagation();
                      console.log('Fee input changed:', e.target.value);
                      setLocalFees(e.target.value);
                    }}
                    onFocus={(e) => e.stopPropagation()}
                    onClick={(e) => e.stopPropagation()}
                    value={localFees}
                    readOnly={false}
                  />
                ) : (
                  profileData.fees
                )}
              </span>
            </p>
            <div className="flex gap-2 py-2">
              <p>Address:</p>
              <p className="text-sm">
                {isEdit ? (
                  <input
                    type="text"
                    className="border border-gray-300 rounded px-2 py-1 mb-2 w-full"
                    onChange={(e) => {
                      e.stopPropagation();
                      console.log('Address line1 changed:', e.target.value);
                      setLocalAddressLine1(e.target.value);
                    }}
                    onFocus={(e) => e.stopPropagation()}
                    onClick={(e) => e.stopPropagation()}
                    value={localAddressLine1}
                    readOnly={false}
                  />
                ) : (
                  profileData.address.line1
                )}
                <br />
                {isEdit ? (
                  <input
                    type="text"
                    className="border border-gray-300 rounded px-2 py-1 w-full"
                    onChange={(e) => {
                      e.stopPropagation();
                      console.log('Address line2 changed:', e.target.value);
                      setLocalAddressLine2(e.target.value);
                    }}
                    onFocus={(e) => e.stopPropagation()}
                    onClick={(e) => e.stopPropagation()}
                    value={localAddressLine2}
                    readOnly={false}
                  />
                ) : (
                  profileData.address.line2
                )}
              </p>
            </div>

            <div className="flex gap-1 pt-2">
              <input
                onChange={(e) => {
                  const newAvailable = e.target.checked;
                  setLocalAvailable(newAvailable);
                  toggleAvailability(newAvailable);
                }}
                checked={localAvailable}
                type="checkbox"
                name="availability"
                id="availability-checkbox"
                aria-label="Toggle doctor availability"
              />
              <label htmlFor="availability-checkbox">Available</label>
            </div>

            {isEdit ? (
              <button
                onClick={updateProfile}
                className="px-4 py-1 border border-[#5F6FFF] text-sm rounded-full mt-5 hover:bg-[#5F6FFF] transition-all"
              >
                Save
              </button>
            ) : (
              <button
                onClick={() => {
                  console.log('Edit button clicked, setting isEdit to true');
                  setIsEdit(true);
                }}
                className="px-4 py-1 border border-[#5F6FFF] text-sm rounded-full mt-5 hover:bg-[#5F6FFF] transition-all"
              >
                Edit
              </button>
            )}
          </div>
        </div>
      </div>
    ) : (
      <div className="m-5 p-8 text-center text-gray-500">Loading profile data...</div>
    )
  );
};

export default DoctorProfile;
