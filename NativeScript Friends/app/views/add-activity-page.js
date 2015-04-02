var vmModule = require("../view-models/add-activity-view-model");
var frameModule = require("ui/frame");
var platformModule = require("platform");
var Everlive = require("../lib/everlive.all.min");
var LocalSettings = require("local-settings");
var viewModel;

function pageNavigatedTo(args) {
    var page = args.object;
    viewModel = new vmModule.AddActivityViewModel();
    page.bindingContext = viewModel
    
    if (platformModule.device.os == "iOS") {
        frameModule.topmost().ios.controller.navigationBarHidden = true;
    }
    
    var userId = LocalSettings.getString(USER_ID);
    if(typeof(userId) === 'undefined' || userId === ""){
        frameModule.topmost().navigate("app/views/main-page");
    }
}

function backButtonClicked(args){
    if (frameModule.topmost().canGoBack) {
        frameModule.topmost().goBack();
    } else {
        frameModule.topmost().navigate("app/views/activities-page");
    }
}

function addActivity() {
    viewModel.addActivity(
        function(){
            frameModule.topmost().navigate("app/views/activities-page");
        },
        function(error){
            alert(JSON.stringify(error));
        }
    );
}

exports.backButtonClicked = backButtonClicked;
exports.pageNavigatedTo = pageNavigatedTo;
exports.addActivity = addActivity;