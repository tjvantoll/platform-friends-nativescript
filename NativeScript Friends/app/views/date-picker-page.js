//var vmModule = require("../view-models/date-picker-view-model");
var frameModule = require("ui/frame");
var platformModule = require("platform");
var datePickerModule = require("ui/date-picker");
//var datePickerPopupModule = require("../modules/date-picker-popup");
var view = require("ui/core/view");

var page;
// Event handler for Page "loaded" event attached in main-page.xml
function pageLoaded(args) {
    page = args.object;
    //page.bindingContext = vmModule.mainViewModel;
    
    if (platformModule.device.os == "Android") {
        frameModule.topmost().android.actionBar.hide();
    }
}

function onChooseDateButtonClick(args){
    //var datePickerPopup = new datePickerPopupModule.DatePickerPopup();
    var datePicker = new datePickerModule.DatePicker();
    var datePickerContainer = view.getViewById(page, "datePickerContainer");
    datePickerContainer.addChild(datePicker);

    var dialogs = require("ui/dialogs");
    
    var options = {
        message: "Pick date",
        actions: new datePickerModule.DatePicker()
    };
    
    dialogs.action(options).then(function (result) {});
}

exports.onChooseDateButtonClick = onChooseDateButtonClick;
exports.pageLoaded = pageLoaded;