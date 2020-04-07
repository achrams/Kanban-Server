const { verifyToken } = require('../helpers/jwt')
const { User } = require('../models')

const authentication = (req, res, next) => {
    const decoded = verifyToken(req.heaeders.access_token)
    try {
        User.findOne({ where: { id: decoded.id } })
            .then(result => {
                if (result) {
                    req.currentUserId = result.id
                    return next()
                } else {
                    return res.status(404).json({
                        name: "NotFound",
                        errors: [{ message: "User not found" }]
                    })
                }
            })
            .catch(err => {
                return res.status(401).json({
                    name: "Unauthorized",
                    errors: [{ message: "User un authenticated" }]
                })
            })
    } catch (err) {
        return res.status(500).json({
            name: "Internal Server",
            errors: [{ message: "Error" }]
        })
    }
}

module.exports = authentication