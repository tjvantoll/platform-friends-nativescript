var frameModule = require("ui/frame");
var vmModule = require("../view-models/main-view-model");
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
    
    if(monitor == null){
        monitor = new NativeScriptMonitor({
            //productId: 'b81e6d9466854e4fa4a28784660f6641',
            productId: 'e5f1a86ba2aa4793a6fca40e921975c9',
            version: '1.2.3.6'
        });
        
        monitor.start();
        
        monitor.trackFeature('MyCategory.MyFeature');
        monitor.trackFeatureValue('MyCategory.MyFeature', 100);
        
        monitor.stop();
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