var vmModule = require("../view-models/activity-view-model");
var frameModule = require("ui/frame");

function pageLoaded(args) {
    var page = args.object;
    page.bindingContext = new vmModule.activityViewModel();
}

function pageNavigatedTo(args) {
    var page = args.object;
    page.bindingContext = page.navigationContext;
    alert(JSON.stringify(page));
}

function backButtonClicked(args){
    frameModule.topmost().navigate("app/views/main-page");
}

exports.pageLoaded = pageLoaded;
exports.backButtonClicked = backButtonClicked;