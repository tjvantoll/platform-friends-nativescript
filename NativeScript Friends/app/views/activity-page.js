var vmModule = require("../view-models/activity-view-model");
var frameModule = require("ui/frame");
var platformModule = require("platform");
var viewModel;

function pageNavigatedTo(args) {
    var page = args.object;
    //viewModel.set("activity", activity)
    viewModel = new vmModule.activityViewModel();
    viewModel.activity = page.navigationContext;
    page.bindingContext = viewModel
    
    if (platformModule.device.os == "iOS") {
        frameModule.topmost().ios.controller.navigationBarHidden = true;
    }
}

function backButtonClicked(args){
    frameModule.topmost().navigate("app/views/activities-page");
}

exports.backButtonClicked = backButtonClicked;
exports.pageNavigatedTo = pageNavigatedTo;