const router = require('express').Router()
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')
const KabanController = require('../controllers/KanbanController')

router.use(authentication)
router.get('/', KabanController.show)
router.post('/', KabanController.add)
router.put('/:id', authorization, KabanController.update)
router.delete('/:id', authorization, KabanController.delete)

module.exports = router