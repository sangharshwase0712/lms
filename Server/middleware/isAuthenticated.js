const jwt= require('jsonwebtoken');

const isAuthenticated = (req, res, next) => {
    try{
        const token = req.cookies.token || req.header('Authorization').replace('Bearer ', '');
        if(!token){
            return  res.status(401).json({ 
                success: false,
                message: 'No token, authorization denied' });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
       if(!decoded){
        return res.status(401).json({ 
            success: false,
            message: 'Token is not valid' });
       }
       req.id = decoded.userId;
       next();
    } catch (error) {
        console.error('Authentication error:', error.message);
        res.status(500).json({ 
            success: false,
            message: 'Server Error' });
    }
}

module.exports = isAuthenticated;