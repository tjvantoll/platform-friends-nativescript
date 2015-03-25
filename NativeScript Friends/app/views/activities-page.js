var vmModule = require("../view-models/activities-view-model");
var frameModule = require("ui/frame");
var dialogs = require("ui/dialogs");
var view = require("ui/core/view");
var platformModule = require("platform");

function pageLoaded(args) {
    
    var page = args.object;
    page.bindingContext = new vmModule.activitiesViewModel();
    
    if (platformModule.device.os == "Android") {
        frameModule.topmost().android.actionBar.hide();
    }
    
}

exports.pageLoaded = pageLoaded;