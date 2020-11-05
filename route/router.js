const router = express.Router();

const Index = require('../controller/index')

const index = new Index()
router.get('/', index.index)
router.get('/data/:type', index.getData)

module.exports = router