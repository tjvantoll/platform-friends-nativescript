var vmModule = require("../view-models/main-view-model");
var frameModule = require("ui/frame");
var platformModule = require("platform");
var viewModule = require("ui/core/view");

// Event handler for Page "loaded" event attached in main-page.xml
function pageLoaded(args) {
    var page = args.object;
    page.bindingContext = new vmModule.MainViewModel();
    
    if (platformModule.device.os == "Android") {
        frameModule.topmost().android.actionBar.hide();
        frameModule.topmost().android.cachePagesOnNavigate = true;
    }
    
    if (platformModule.device.os == "iOS") {
        frameModule.topmost().ios.controller.navigationBarHidden = true;
    }
    
    //Hide the keyboard on load
    // viewModule.getViewById( page, "username" ).dismissSoftInput();
}

function navigateRegister(args){
    frameModule.topmost().navigate("app/views/sign-up-page");
}

// function login(args){
//     frameModule.topmost().navigate("app/views/activities-page");
// }

exports.navigateRegister = navigateRegister;
exports.pageLoaded = pageLoaded;