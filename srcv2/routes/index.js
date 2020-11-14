const {Router} = require('express');
const router = Router();

router.use(require('./get/index'))
router.use(require('./post/index'))
router.use(require('./put/index'))

module.exports = router; 