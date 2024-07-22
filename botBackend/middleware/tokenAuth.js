import jwt from "jsonwebtoken";

// Token verification to ensure some form of security
export const verifyToken = async (req, res, next) =>{
    try{
        let token = req.header("Authorisation");
        console.log("middleware/auth.js reached");
        

        if (!token) {
            return res.status(403).send("Access Denied")
        };

        if (token.startsWith("Bearer ")){
            token = token.slice(7, token.length).trimLeft();
        };

        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (err){
        res.status(500).json({error: err.message})
        console.log(err , "middleware/auth.js");
    }
};