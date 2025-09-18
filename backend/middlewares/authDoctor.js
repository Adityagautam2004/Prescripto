import jwt from 'jsonwebtoken';
import doctorModel from '../models/doctorModel.js';

//doctor authentication middleware
const authDoctor = (req, res, next) => {
    try {
        const { dtoken } = req.headers;
        if (!dtoken) {
            return res.status(401).send({
                message: "Unauthorized",
                success: false,
            });
        }
        const token_decode = jwt.verify(dtoken, process.env.JWT_SECRET);
        if (!req.body) {
            req.body = {};
        }
        req.body.docId = token_decode.id;
        next();
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: "Error authenticating doctor",
            success: false,
            error,
        });
    }
};
export default authDoctor;
