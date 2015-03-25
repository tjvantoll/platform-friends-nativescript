var vmModule = require("../view-models/main-view-model");
var frameModule = require("ui/frame");

// Event handler for Page "loaded" event attached in main-page.xml
function pageLoaded(args) {
    var page = args.object;
    page.bindingContext = vmModule.mainViewModel();
}

function navigateRegister(args){
    frameModule.topmost().navigate("app/views/sign-up-page");
}

exports.navigateRegister = navigateRegister;
exports.pageLoaded = pageLoaded;