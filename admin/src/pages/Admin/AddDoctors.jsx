import React, { useContext, useState } from "react";
import { assets } from "../../assets/assets";
import { AdminContext } from "../../context/AdminContext";
import { toast } from "react-toastify";
import axios from "axios";

const AddDoctors = () => {

    const [docImg , setDocImg] = useState(false);
    const [name , setName] = useState("");
    const [email , setEmail] = useState("");
    const [password , setPassword] = useState("");
    const [experience , setExperience] = useState("1 year");
    const [speciality , setSpeciality] = useState("General physician");
    const [about , setAbout] = useState("");
    const [fees , setFees   ] = useState("");
    const [degree , setDegree] = useState("");
    const [address1 , setAddress1] = useState("");
    const [address2 , setAddress2] = useState("");

    const {backendUrl , aToken }=useContext(AdminContext)

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        try{
            if(!docImg){
                toast.error("Please upload doctor image");
                return;
            }
            const formData = new FormData();
            formData.append("image", docImg);
            formData.append("name", name);
            formData.append("email", email);
            formData.append("password", password);
            formData.append("experience", experience);
            formData.append("speciality", speciality);
            formData.append("about", about);
            formData.append("fees", Number(fees));
            formData.append("degree", degree);
            formData.append("address", JSON.stringify({line1:address1,line2:address2}));
            const {data}= await axios.post(`${backendUrl}/api/admin/add-doctor`, formData, {
                headers: {
                    aToken
                }
            })
            if(data.success){
                toast.success("Doctor added successfully");
                setName("");
                setEmail("");
                setPassword("");
                setExperience("1 year");
                setSpeciality("General physician");
                setAbout("Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.");
                setFees("");
                setDegree("MBBS");
                setAddress1("47th Cross, Richmond");
                setAddress2("Circle, Ring Road, London");
                setDocImg(false);
            }
        }catch(err){
            console.log(err);
            toast.error("Error adding doctor");
            return;
        }
    }

  return (
    <form onSubmit={onSubmitHandler} className="m-5 w-full">
      <p className="mb-3 text-lg font-medium">Add Doctor</p>
      <div className="bg-white px-8 py-8 border border-gray-300 rounded w-full max-w-4xl max-h-[80vh] overflow-y-scroll">
        <div className="flex items-center gap-4 mb-8 text-gray-500 ">
          <label htmlFor="doc-img">
            <img
              className="w-16 bg-gray-100 rounded-full cursor-pointer"
              src={docImg ? URL.createObjectURL(docImg) : assets.upload_area}
              alt=""
            />
          </label>
          <input hidden onChange={(e) => setDocImg(e.target.files[0])} type="file" id="doc-img" />
          <p>
            Upload doctor <br /> picture
          </p>
        </div>
        <div className="flex flex-col lg:flex-row items-start gap-10 text-gray-600">
          <div className="w-full lg:flex-1 flex flex-col gap-4">
            <div className="flex-1 flex flex-col gap-1">
              <p>Doctor Name</p>
              <input onChange={(e) => setName(e.target.value)} value={name} className="border border-gray-300 rounded px-3 py-2" type="text" placeholder="Name" required />
            </div>
            <div className="flex-1 flex flex-col gap-1">
              <p>Doctor Email</p>
              <input onChange={(e) => setEmail(e.target.value)} value={email} className="border border-gray-300 rounded px-3 py-2" type="email" placeholder="Email" required />
            </div>
            <div className="flex-1 flex flex-col gap-1">
              <p>Doctor Password</p>
              <input onChange={(e) => setPassword(e.target.value)} value={password} className="border border-gray-300 rounded px-3 py-2" type="password" placeholder="Password" required />
            </div>
            <div className="flex-1 flex flex-col gap-1">
              <p>Experience</p>
              <select onChange={(e) => setExperience(e.target.value)} value={experience} className="border border-gray-300 rounded px-3 py-2" name="experience" >
                <option value="">Select Experience</option>
                <option value="1 Year">1 Year</option>
                <option value="2 Years">2 Years</option>
                <option value="3 Years">3 Years</option>
                <option value="4 Years">4 Years</option>
                <option value="5 Years">5 Years</option>
                <option value="6 Years">6 Years</option>
                <option value="7 Years">7 Years</option>
                <option value="8 Years">8 Years</option>
                <option value="9 Years">9 Years</option>
                <option value="10 Years">10 Years</option>
              </select>
            </div>
            <div className="flex-1 flex flex-col gap-1">
              <p>Fees</p>
              <input onChange={(e) => setFees(e.target.value)} value={fees} className="border border-gray-300 rounded px-3 py-2" type="number" placeholder="Fees" required />
            </div>
          </div>
          <div className="w-full lg:flex-1 flex flex-col gap-4">
            <div className="flex-1 flex flex-col gap-1">
              <p>Speciality</p>
              <select onChange={(e) => setSpeciality(e.target.value)} value={speciality} className="border border-gray-300 rounded px-3 py-2" name="speciality" >
                <option value="">Select Speciality</option>
                <option value="General physician">General physician</option>
                <option value="Gynecologist">Gynecologist</option>
                <option value="Dermatologist">Dermatologist</option>
                <option value="Pediatrician">Pediatrician</option>
                <option value="Neurologist">Neurologist</option>
                <option value="Gastroenterologist">Gastroenterologist</option>
              </select>
            </div>
            <div className="flex-1 flex flex-col gap-1">
              <p>Education</p>
              <input onChange={(e) => setDegree(e.target.value)} value={degree} className="border border-gray-300 rounded px-3 py-2" type="text" placeholder="Education" required />
            </div>
            <div className="flex-1 flex flex-col gap-1">
              <p>Address</p>
              <input onChange={(e) => setAddress1(e.target.value)} value={address1} className="border border-gray-300 rounded px-3 py-2" type="text" placeholder="Address 1" required />
              <input onChange={(e) => setAddress2(e.target.value)} value={address2} className="border border-gray-300 rounded px-3 py-2" type="text" placeholder="Address 2" required />
            </div>
          </div>
        </div>
        <div>
          <p className="mt-4 mb-2">About Doctor</p>
          <textarea
            onChange={(e) => setAbout(e.target.value)}
            value={about}
            className="w-full px-4 pt-2 border border-gray-300 rounded"
            name=""
            rows="5"
            placeholder="Write About Doctor"
            required
          ></textarea>
        </div>
        <button type="submit" className="cursor-pointer bg-[#5F6FFF] px-10 py-3 mt-4 text-white rounded-full">Add Doctor</button>
      </div>
    </form>
  );
};

export default AddDoctors;
