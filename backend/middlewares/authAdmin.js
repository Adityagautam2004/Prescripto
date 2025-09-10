import jwt from "jsonwebtoken";

//admin authentication middleware
const authAdmin = (req, res, next) => {
    try {
        const { atoken } = req.headers;
        if (!atoken) {
            return res.status(401).send({
                message: "Unauthorized",
                success: false,
            });
        }
        const token_decode = jwt.verify(atoken, process.env.JWT_SECRET);
        if(token_decode !== (process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD)){
            return res.status(401).send({
                message: "Unauthorized",
                success: false,
            });
        }
        next();
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: "Error authenticating admin",
            success: false,
            error,
        });
    }
};

export default authAdmin;
