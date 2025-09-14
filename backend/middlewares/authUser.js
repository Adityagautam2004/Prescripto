import jwt from "jsonwebtoken";


//user authentication middleware
const authUser = (req, res, next) => {
    try {
        const { token } = req.headers;
        if (!token) {
            return res.status(401).send({
                message: "Unauthorized",
                success: false,
            });
        }
        const token_decode = jwt.verify(token, process.env.JWT_SECRET);
        // if(token_decode.id !== req.body.userId){
        //     return res.status(401).send({
        //         message: "Unauthorized",
        //         success: false,
        //     });
        // }
        // Ensure req.body exists before setting userId
        if (!req.body) {
            req.body = {};
        }
        req.body.userId = token_decode.id;
        next();
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: "Error authenticating user",
            success: false,
            error,
        });
    }
};

export default authUser;
