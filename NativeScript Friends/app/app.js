var application = require("application");
application.mainModule = "app/views/add-activity-page";

/*
 * Define constants which we will use across the application
 */
global.BS_API_KEY = "mmfUiB9IBDxb6mvR";
global.TOKEN_DATA_KEY = "authenticationToken";

application.start();