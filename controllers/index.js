const router = require("express").Router()

router.use("/",require("./api/homeRoutes"))
router.use("/api/user",require("./api/dashboardRoutes"));


module.exports = router;
