const router = require('express').Router()
const user = require('./user')
const kanban = require('./kanban')

router.get('/', (req, res, next) => {
    res.send({ msg: 'Success' })
})

router.use('/user', user)
router.use('/kanban', kanban)

module.exports = router