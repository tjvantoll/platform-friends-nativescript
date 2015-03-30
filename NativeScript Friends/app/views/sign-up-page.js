var vmModule = require("../view-models/sign-up-view-model");
var frameModule = require("ui/frame");
var dialogs = require("ui/dialogs");
var view = require("ui/core/view");
var platformModule = require("platform");

var viewModel;

// Event handler for Page "loaded" event attached in sign-up-page.xml
function pageLoaded(args) {
    var page = args.object;
    viewModel = new vmModule.SignUpViewModel();
    page.bindingContext = viewModel;    
    
    if (platformModule.device.os == "iOS") {
        frameModule.topmost().ios.controller.navigationBarHidden = true;
    }
    
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
        viewModel.set("gender", result);
        
    });
}

function chooseBirthDate(args) {
    var currentYear = new Date().getFullYear();
    
    var selectedYear = "";
    var selectedMonth = "";
    var selectedDay = "";
    
    var availableYears = [];
    var availableMonths = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ]; 
    
    for(var i = 0; i < 100; i++){
        availableYears.push(String(currentYear - i));
    }
    
    //Select Year
    var options = {
        message: "Year",
        actions: availableYears
    };
    dialogs.action(options).then(function (result) {
        
            selectedYear = result;
        
            //Select Month
            var options = {
                message: "Month",
                actions: availableMonths
            };
            dialogs.action(options).then(function (result) {
                
                selectedMonth = result;
                var selectedMonthId = availableMonths.indexOf(selectedMonth) + 1;
                
                var numberOfDays = new Date(selectedYear, selectedMonthId, 0).getDate();
                
                var availableDays = [];
                
                for(var i = numberOfDays; i > 0; i--){
                    availableDays.push(String(numberOfDays - i + 1));
                }
                
                //Select Day
                var options = {
                    message: "Day",
                    actions: availableDays
                };
                dialogs.action(options).then(function (result) {

                    selectedDay = result;

                    viewModel.set("birthdate", selectedDay + " " + selectedMonth + " " + selectedYear);

                });

            });
        
    });
}


exports.chooseBirthDate = chooseBirthDate;
exports.pageLoaded = pageLoaded;
exports.goBack = goBack;
exports.chooseGender = chooseGender;