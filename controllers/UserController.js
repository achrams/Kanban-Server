const { compare } = require('../helpers/bcrypt')
const { generateToken } = require('../helpers/jwt')
const { User } = require('../models')
class UserController {
    static register(req, res, next) {
        let { email, password, verifypassword } = req.body
        console.log({ email, password, verifypassword });
        if (password == verifypassword) {
            User.create({
                    email: email,
                    password: password,
                    createdAt: new Date(),
                    updatedAt: new Date()
                })
                .then((data) => {
                    console.log(data)
                    let payload = { id: data.id, email: data.email }
                    let access_token = generateToken(payload)
                    return res.status(200).json({
                        id: data.id,
                        email: data.email,
                        access_token
                    })
                })
                .catch((err) => {
                    return next(err)
                })
        } else return next({
            name: 'BadRequest',
            msg: 'Verify password missmatch'
        })
    }

    static login(req, res, next) {
        let { email, password } = req.body
        User.findOne({ where: { email: email } })
            .then((data) => {
                if (data) {
                    let decrypted = compare(password, data.password)
                    if (decrypted) {
                        let payload = { id: data.id, email: data.email }
                        let access_token = generateToken(payload)
                        return res.status(200).json({
                            id: data.id,
                            email: data.email,
                            access_token
                        })
                    } else return next({ name: 'BadRequest', msg: 'Wrong email/password' })

                } else return next({ name: 'BadRequest', msg: 'Wrong email/password' })
            })
            .catch((err) => {
                return next({ name: 'NotFound', msg: 'User Not found' })
            })
    }
}

module.exports = UserController