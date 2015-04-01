var vmModule = require("../view-models/activities-view-model");
var frameModule = require("ui/frame");
var view = require("ui/core/view");
var observable = require("data/observable");
var platformModule = require("platform");

var viewModel;
var isAndroid = true;

function pageLoaded(args) {
    var page = args.object;
    viewModel = new vmModule.ActivitiesViewModel();
    page.bindingContext = viewModel;
    
    //Hide activity indicator when the ListView items loading begin
    var listView = view.getViewById(page, "activitiesView");
    listView.on("itemLoading", function (args) {
        viewModel.set("isLoading",false);
        
    });
    
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
}

exports.pageLoaded = pageLoaded;
exports.onActivityTap = onActivityTap;
exports.logout = logout;
exports.addActivity = addActivity;
