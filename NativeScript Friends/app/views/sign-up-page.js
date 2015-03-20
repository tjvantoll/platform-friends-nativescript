var vmModule = require("../view-models/sign-up-view-model");
var frameModule = require("ui/frame");
var dialogs = require("ui/dialogs");

// Event handler for Page "loaded" event attached in sign-up-page.xml
function pageLoaded(args) {
    var page = args.object;
    page.bindingContext = vmModule.signUpViewModel;
}

function goBack(args) {
    frameModule.topmost().navigate("app/views/main-page");
}

function chooseGender(args) {
    var options = {
        title: "Choose your gender",
        actions: ["Male", "Female"],
    };
    dialogs.action(options).then(function (result) {
        vmModule.signUpViewModel.set("gender", result);
        
    });
}

exports.pageLoaded = pageLoaded;
exports.goBack = goBack;
exports.chooseGender = chooseGender;