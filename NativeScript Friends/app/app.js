var application = require("application");
application.mainModule = "app/views/activities-page";

/*
 * Define constants which we will use across the application
 */
global.BS_API_KEY = "mmfUiB9IBDxb6mvR";
global.TOKEN_DATA_KEY = "authenticationToken";
global.everlive = (function(){
    var Everlive = require("./lib/everlive.all.min");
    return new Everlive({ apiKey: BS_API_KEY });
})();

application.start();