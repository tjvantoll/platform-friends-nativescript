var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};

var observable = require("data/observable");
var Everlive = require("../lib/everlive.all.min");
var dialogs = require("ui/dialogs");
var frameModule = require("ui/frame");
var validationModule = require("../utils/validate");

var SignUpViewModel = (function (_super){
    
    __extends(SignUpViewModel, _super);
    
    function SignUpViewModel(source) {
        _super.call(this);
        this._source = source;
        this._isLoading = false;
        
        //User
        this._username;
        this._password;
        this._info = {
          DisplayName: "",
          Email: "",
          gender: "",
          // birthDate: 0,
          about: ""
        };    
    }
    
   SignUpViewModel.prototype.signUp = function() {
       
        var that = this;

        var el = new Everlive({ apiKey: BS_API_KEY });

        if(validationModule.validate(that._username, [validationModule.minLengthConstraint],"Invalid username") &&
           validationModule.validate(that._password, [validationModule.minLengthConstraint],"Invalid password") &&
           validationModule.validate(that._info.DisplayName, [validationModule.minLengthConstraint],"Invalid name") &&
           validationModule.validate(that._info.Email, [validationModule.minLengthConstraint, validationModule.validEmailConstraint],"Invalid email")
          ){
            
            this.set("isLoading", true);
       
            el.Users.register(
                that._username,
                that._password,
                that._info,
                function(data) {

                    that.set("isLoading", false);

                    //Clear all fields
                    that.set("username", "");
                    that.set("password", "");
                    that.set("name", "");
                    that.set("email", "");
                    that.set("gender", "");
                    // that.set("birthDate", "");
                    that.set("about", "");

                    dialogs.alert({
                      title: "Sign up",
                      message: "Successful",
                      okButtonText: "Go get it!"
                    }).then(function () {
                        frameModule.topmost().navigate("app/views/activities-page");
                    });
                },
                function(error) {         
                    that.set("isLoading", false);
                    alert(JSON.stringify(error));
                });
        }
    };
    
    Object.defineProperty(SignUpViewModel.prototype, "isLoading", {
        get: function () {
            return this._isLoading;
        },
        set: function(value) {
            this._isLoading = value;
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(SignUpViewModel.prototype, "username", {
        get: function () {
            return this._username;
        },
        set: function(value) {
            this._username = value;
        },
        enumerable: true,
        configurable: true
    });
    
    Object.defineProperty(SignUpViewModel.prototype, "password", {
        get: function () {
            return this._password;
        },
        set: function(value) {
            this._password = value;
        },
        enumerable: true,
        configurable: true
    });
    
    Object.defineProperty(SignUpViewModel.prototype, "name", {
        get: function () {
            return this._info.DisplayName;
        },
        set: function(value) {
            this._info.DisplayName = value;
        },
        enumerable: true,
        configurable: true
    });
    
    Object.defineProperty(SignUpViewModel.prototype, "email", {
        get: function () {
            return this._info.Email;
        },
        set: function(value) {
            this._info.Email = value;
        },
        enumerable: true,
        configurable: true
    });
    
    Object.defineProperty(SignUpViewModel.prototype, "gender", {
        get: function () {
            return this._info.gender;
        },
        set: function(value) {
            this._info.gender = value;
        },
        enumerable: true,
        configurable: true
    });
    
    // Object.defineProperty(SignUpViewModel.prototype, "birthDate", {
    //     get: function () {
    //         return this._info.birthDate;
    //     },
    //     set: function(value) {
    //         this._info.birthDate = value;
    //     },
    //     enumerable: true,
    //     configurable: true
    // });
    
    Object.defineProperty(SignUpViewModel.prototype, "about", {
        get: function () {
            return this._info.about;
        },
        set: function(value) {
            this._info.about = value;
        },
        enumerable: true,
        configurable: true
    });
    
    return SignUpViewModel;
})(observable.Observable);

exports.SignUpViewModel = SignUpViewModel;