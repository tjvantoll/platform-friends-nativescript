var vmModule = require("../view-models/activities-view-model");
var frameModule = require("ui/frame");
var view = require("ui/core/view");
var observable = require("data/observable");
var platformModule = require("platform");
var LocalSettings = require("local-settings");

var viewModel;

function pageLoaded(args) {
    var page = args.object;
    viewModel = new vmModule.ActivitiesViewModel();
    page.bindingContext = viewModel;
    
    if (platformModule.device.os === "iOS") {
        frameModule.topmost().ios.controller.navigationBarHidden = true;
    }
}

function onActivityTap(args) {
    frameModule.topmost().navigate({
        moduleName: "app/views/activity-page",
        context: viewModel.activities.getItem(args.index)
    });   
}

function addActivity(){
    frameModule.topmost().navigate("app/views/add-activity-page");
}

function logout(args){
       
    frameModule.topmost().navigate("app/views/main-page");
    
    LocalSettings.setString(TOKEN_DATA_KEY, "");
    LocalSettings.setString(USER_ID, "");
}

exports.pageLoaded = pageLoaded;
exports.onActivityTap = onActivityTap;
exports.logout = logout;
exports.addActivity = addActivity;
