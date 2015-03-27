var vmModule = require("../view-models/activities-view-model");
var frameModule = require("ui/frame");
var viewModel;

function pageLoaded(args) {
    var page = args.object;
    viewModel = new vmModule.activitiesViewModel();
    page.bindingContext = viewModel;
}

function onActivityTap(args) {
    frameModule.topmost().navigate({
        moduleName: "app/views/activity-page",
        context: viewModel.activities.getItem(args.index)
    });   
}

function addActivity(){
    alert("In Progress...");
}

function logout(args){
    frameModule.topmost().navigate("app/views/main-page");
}

exports.pageLoaded = pageLoaded;
exports.onActivityTap = onActivityTap;
exports.logout = logout;
exports.addActivity = addActivity;