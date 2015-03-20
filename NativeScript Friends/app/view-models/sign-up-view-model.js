var observable = require("data/observable");

var signUpViewModel = new observable.Observable();

signUpViewModel.set("gender", "Gender");

exports.signUpViewModel = signUpViewModel;