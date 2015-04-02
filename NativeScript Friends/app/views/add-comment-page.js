var vmModule = require("../view-models/add-comment-view-model");
var frameModule = require("ui/frame");
var viewModel;

function pageNavigatedTo(args) {
    var page = args.object;

    viewModel = new vmModule.addCommentViewModel();
    viewModel.activity = page.navigationContext;
    page.bindingContext = viewModel
    
    if (platformModule.device.os === "iOS") {
        frameModule.topmost().ios.controller.navigationBarHidden = true;
    }
}

function backButtonClicked(args){
    goBack();
}

function goBack(args){
    if (frameModule.topmost().canGoBack) {
        frameModule.topmost().goBack();
    } else {
        frameModule.topmost().navigate({
            moduleName: "app/views/activity-page",
            context: viewModel.activity
        });
    }
}

exports.backButtonClicked = backButtonClicked;
exports.pageNavigatedTo = pageNavigatedTo;