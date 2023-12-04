"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app = require("teem");
const appsettings = require("./appsettings");
const cors = require('cors');
app.run({
    root: appsettings.root,
    staticRoot: "",
    sqlConfig: appsettings.sqlPool,
    htmlErrorHandler: function (err, req, res, next) {
        res.status(err.status || 500);
        if (req.path.indexOf("/api/") >= 0) {
            res.json(err.status == 404 ? "Não encontrado" : (err.message || err.toString()));
        }
    },
    onInit: function () {
        app.express.use(cors());
    }
});
//# sourceMappingURL=app.js.map