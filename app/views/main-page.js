var vmModule = require("../view-models/main-view-model");
var frameModule = require("ui/frame");
var platformModule = require("platform");
var viewModule = require("ui/core/view");
var NativeScriptMonitor = require('../lib/NativeScriptMonitor').Monitor;
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
    
    if(MONITOR == null){
        MONITOR = new NativeScriptMonitor({
            productId: '69eb62db3e894e908f47343ee0a109e9',
            version: '1.0'
        });
        
        MONITOR.start();
        
        MONITOR.trackFeature('View.Login');

    }
    
    clearEmailAndPassword();
}

function navigateRegister(args){
    frameModule.topmost().navigate("./views/sign-up-page");
}

function clearEmailAndPassword(){
    viewModel.set("email", "");
    viewModel.set("password", "");
}

function logIn(args){
    viewModel.logIn()
    .then(function() {
        frameModule.topmost().navigate("./views/activities-page");
    }, 
    function(error) {
        alert(error || "Can't log in! Please try again!");
    });
}

exports.navigateRegister = navigateRegister;
exports.pageLoaded = pageLoaded;
exports.logIn = logIn;