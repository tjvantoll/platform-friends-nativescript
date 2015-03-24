var observable = require("data/observable");

var signUpViewModel = new observable.Observable();

signUpViewModel.set("gender", "Gender");
signUpViewModel.set("birthdate", "Birth Date");

exports.signUpViewModel = signUpViewModel;