var vmModule = require("../view-models/activities-view-model");
var frameModule = require("ui/frame");

function pageLoaded(args) {
    
    var page = args.object;
    page.bindingContext = new vmModule.activitiesViewModel();;
}

function logout(args){
    frameModule.topmost().navigate("app/views/main-page");
}

exports.pageLoaded = pageLoaded;
exports.logout = logout;