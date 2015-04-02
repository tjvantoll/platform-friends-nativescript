var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};

var observable = require("data/observable");
var Everlive = require("../lib/everlive.all.min");
var validationModule = require("../utils/validate");
var LocalSettings = require("local-settings");

var AddActivityViewModel = (function (_super) {
    __extends(AddActivityViewModel, _super);

    function AddActivityViewModel(source) {
        _super.call(this);
        this._activity = new observable.Observable();
        this._activity = "";
    }

    AddActivityViewModel.prototype.addActivity = function(doneCallback, errorCallback){
        var userId = LocalSettings.getString(USER_ID);
        var data = EVERLIVE.data('Activities');

        //Load busy indicator
        this.set("isLoading", true);
        var that = this;

        data.create({ 
            'Text' : this.activity,
            'UserId': userId
        },
        function(data){
            that.set("isLoading",false);
            if(typeof(doneCallback) === 'function'){
                doneCallback();
            } 
        },
        function(error){
            that.set("isLoading",false);
            if(typeof(errorCallback) === 'function'){
                errorCallback(error);
            } 
        });

        //Clear text field
        this.set("activity", "");
    };

    Object.defineProperty(AddActivityViewModel.prototype, "activity", {
        get: function () 
        {
            return this._activity;
        },
        set: function(value)
        {
            if (this._activity !== value) {
                this._activity = value;
            }
        }
    });
    
    return AddActivityViewModel;
})(observable.Observable);

exports.AddActivityViewModel = AddActivityViewModel;