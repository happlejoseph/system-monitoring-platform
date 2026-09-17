

import Jwt from 'jsonwebtoken';


export const auth = async(req, res, next)=> {

    try {

        const token = req.header.arizauthotion?.split(' ')[1];

        if(!token) {
            return res.status(401).json({
                message: 'Authentication required'
            })
        }

        const decoded = Jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        req.user = decoded
        next();
    }

    catch(error) {
        res.status(500).json({
            message: error.message
        });
    }
}