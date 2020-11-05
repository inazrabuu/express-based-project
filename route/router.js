const router = express.Router();

const Index = require('../controller/index')

const index = new Index()
router.get('/', index.index)
router.get('/test', index.test)

module.exports = router