var vmModule = require("../view-models/activities-view-model");
var frameModule = require("ui/frame");
var dialogs = require("ui/dialogs");
var view = require("ui/core/view");

// Event handler for Page "loaded" event attached in sign-up-page.xml
function pageLoaded(args) {
    var page = args.object;
    page.bindingContext = vmModule.activitiesViewModel;
}

exports.pageLoaded = pageLoaded;