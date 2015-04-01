var vmModule = require("../view-models/activity-view-model");
var frameModule = require("ui/frame");
var gestures = require("ui/gestures");
var platformModule = require("platform");
var viewModel;

function pageNavigatedTo(args) {
    var page = args.object;

    viewModel = new vmModule.activityViewModel();
    viewModel.activity = page.navigationContext;
    
    page.bindingContext = viewModel
    
    if (platformModule.device.os === "iOS") {
        frameModule.topmost().ios.controller.navigationBarHidden = true;
    }
}

function backButtonClicked(args){
    goBack();
}

function onSwipe(args){
    if (args.direction === gestures.SwipeDirection.Right) {
        goBack();
    }
}

function goBack(args){
    if (frameModule.topmost().canGoBack) {
        frameModule.topmost().goBack();
    } else {
        frameModule.topmost().navigate("app/views/activities-page");
    }
}

function commentButtonClicked(args){
    
}

function deleteButtonClicked(args){

}

exports.backButtonClicked = backButtonClicked;
exports.commentButtonClicked = commentButtonClicked;
exports.deleteButtonClicked = deleteButtonClicked;
exports.pageNavigatedTo = pageNavigatedTo;
exports.onSwipe = onSwipe;