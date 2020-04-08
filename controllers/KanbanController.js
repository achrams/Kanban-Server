const { Kanban } = require('../models')

class KanbanController {

    static show(req, res, next) {
        let userId = req.currentUserId
        Kanban.findAll({ where: { userId: userId } })
            .then((result) => {
                return res.status(200).json({ result })
            })
            .catch((err) => {
                return next(err)
            })
    }

    static add(req, res, next) {
        let userId = req.currentUserId
        let { title, description, tag } = req.body
        let newdata = {
            title,
            description,
            tag,
            userId,
            createdAt: new Date(),
            updatedAt: new Date()
        }
        Kanban.create(newdata)
            .then(result => {
                return res.status(201).json({ result })

            })
            .catch(err => {
                return next({
                    "name": "InternalServer",
                    "msg": "Internal Server Error"
                })
            })
    }
    static update(req, res, next) {
        let id = +req.params.id
        let { title, description, tag } = req.body
        let updatedData = {
            title,
            description,
            tag
        }

        Kanban.findOne({ where: { id: id } })
            .then(data => {
                if (!data) return next({
                    "name": "NotFound",
                    "msg": "Data not found"
                })
                else {
                    Kanban.update(updatedData, { where: { id: data.id } })
                        .then(result => {
                            return res.status(200).json({ result })
                        })
                }
            })
            .catch(err => {
                return next({
                    "name": "InternalServer",
                    "msg": "Internal Server Error"
                })
            })
    }

    static delete(req, res, next) {
        let id = re.params.id
        Kanban.destroy({ where: { id: id } })
            .then((result) => {
                return res.status(201).json({ msg: 'Success Delete' })
            })
            .catch((err) => {
                return next({ name: 'NotFound', msg: 'Data not Found' })
            })
    }
}

module.exports = KanbanController