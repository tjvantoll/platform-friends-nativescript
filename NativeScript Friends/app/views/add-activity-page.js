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
    frameModule.topmost().navigate("app/views/activities-page");
}

function addActivity(args){
      
    var el = new Everlive({ apiKey: BS_API_KEY, token: LocalSettings.getString(TOKEN_DATA_KEY) });
    var userId = LocalSettings.getString(USER_ID);
    var data = el.data('Activities');
    
    //Load busy indicator
    viewModel.set("isLoading", true);
    
    data.create({ 
        'Text' : viewModel.activity,
        'UserId': userId
    },
        function(data){
            viewModel.set("isLoading",false);
            backButtonClicked();
        },
        function(error){
            viewModel.set("isLoading",false);
            alert(JSON.stringify(error));
        });
    
    //Clear text field
    viewModel.set("activity", "");
}

exports.backButtonClicked = backButtonClicked;
exports.pageNavigatedTo = pageNavigatedTo;
exports.addActivity = addActivity;