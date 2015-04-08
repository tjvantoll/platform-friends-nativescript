var vmModule = require("../view-models/main-view-model");
var frameModule = require("ui/frame");
var platformModule = require("platform");
var viewModule = require("ui/core/view");
var viewModel;

// Event handler for Page "loaded" event attached in main-page.xml
function pageLoaded(args) {
    var page = args.object;
    viewModel = new vmModule.MainViewModel();
    page.bindingContext = viewModel;
    
    if (platformModule.device.os == "Android") {
        frameModule.topmost().android.actionBar.hide();
    }
    
    if (platformModule.device.os == "iOS") {
        frameModule.topmost().ios.controller.navigationBarHidden = true;
    }
    
    clearEmailAndPassword();
}

function navigateRegister(args){
    frameModule.topmost().navigate("app/views/sign-up-page");
}

function clearEmailAndPassword(){
    viewModel.set("email", "");
    viewModel.set("password", "");
}

function logIn(args){
    viewModel.logIn();
}

exports.navigateRegister = navigateRegister;
exports.pageLoaded = pageLoaded;
exports.logIn = logIn;