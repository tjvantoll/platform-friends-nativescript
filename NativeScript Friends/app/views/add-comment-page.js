var vmModule = require("../view-models/add-comment-view-model");
var frameModule = require("ui/frame");
var platformModule = require("platform");
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

function goBack(){
    if (frameModule.topmost().canGoBack) {
        frameModule.topmost().goBack();
    } else {
        frameModule.topmost().navigate({
            moduleName: "app/views/activity-page",
            context: viewModel.activity
        });
    }
}

function addComment() {
    viewModel.addComment().then(goBack);
}

exports.backButtonClicked = backButtonClicked;
exports.pageNavigatedTo = pageNavigatedTo;
exports.addComment = addComment;