import app = require("teem");
import appsettings = require("./appsettings");
const cors = require('cors');

app.run({
	root: appsettings.root,
	staticRoot: "",
	sqlConfig: appsettings.sqlPool,
	htmlErrorHandler: function (err: any, req: app.Request, res: app.Response, next: app.NextFunction) {
		res.status(err.status || 500);

		if (req.path.indexOf("/api/") >= 0) {
			res.json(err.status == 404 ? "Não encontrado" : (err.message || err.toString()));
		} 
    },
	onInit: function () {
		app.express.use(cors());
	}
});
