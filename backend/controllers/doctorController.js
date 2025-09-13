import doctorModel from "../models/doctorModel.js";

const changeAvailibility = async (req, res) =>{
    try {
        const {docId}=req.body

        const docData=await doctorModel.findById(docId)
        await doctorModel.findByIdAndUpdate(docId,{
            available:!docData.available
        })
        res.json({
            success: true,
            message: "Availibility updated"
        })
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: "Internal server error"
        })
    }
}

const doctorList = async (req, res) =>{
    try {
        const doctors = await doctorModel.find({}).select(["-password","-email"]);
        res.json({
            success: true,
            message: "Doctor list",
            doctors
        })
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: "Internal server error"
        })
    }
}

export {
    changeAvailibility,
    doctorList
}



