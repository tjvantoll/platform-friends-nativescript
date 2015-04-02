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
var LocalSettings = require("local-settings");

var MainViewModel = (function (_super){
    
    __extends(MainViewModel, _super);
    
    function MainViewModel(source) {
        _super.call(this);
        this._source = source;
        this._isLoading = false;
        
        //User
        this._email;
        this._password;   
        
        EVERLIVE = new Everlive({ apiKey: BS_API_KEY, token: LocalSettings.getString(TOKEN_DATA_KEY) });
    }
    
   MainViewModel.prototype.logIn = function() {
       
        var that = this;

        if(validationModule.validate(that._email, [validationModule.minLengthConstraint,validationModule.validEmailConstraint],"Invalid email") &&
           validationModule.validate(that._password, [validationModule.minLengthConstraint],"Invalid password")){
            
            this.set("isLoading", true);
       
            EVERLIVE.Users.login(that._email, that._password, 
            function (data) {
                if(typeof(data.result) !== 'undefined' && typeof(data.result.principal_id) !== 'undefined' && typeof(data.result.access_token) !== 'undefined'){
                    //Store in local storage
                    LocalSettings.setString(TOKEN_DATA_KEY, data.result.access_token);
                    LocalSettings.setString(USER_ID, data.result.principal_id);
                    frameModule.topmost().navigate("app/views/activities-page");
                }
                else{
                    alert("Can't log in! Please try again!");
                }
            },
            function(error){
                alert(error.message || "Can't log in! Please try again!");
            });
        }
    };
    
    Object.defineProperty(MainViewModel.prototype, "isLoading", {
        get: function () {
            return this._isLoading;
        },
        set: function(value) {
            this._isLoading = value;
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(MainViewModel.prototype, "email", {
        get: function () {
            return this._email;
        },
        set: function(value) {
            this._email = value;
        },
        enumerable: true,
        configurable: true
    });
    
    Object.defineProperty(MainViewModel.prototype, "password", {
        get: function () {
            return this._password;
        },
        set: function(value) {
            this._password = value;
        },
        enumerable: true,
        configurable: true
    });
    
    return MainViewModel;
})(observable.Observable);

exports.MainViewModel = MainViewModel;
