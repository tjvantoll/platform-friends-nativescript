var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};

var observable = require("data/observable");
var observableArray = require("data/observable-array");
var activityItemViewModel = require("./activity-item-view-model");
var Everlive = require("../lib/everlive.all.min");
var imageSource = require("image-source");
var imageCache = require("ui/image-cache");
var view = require("ui/core/view");
var platformModule = require("platform");

var cache = new imageCache.Cache();
//cache.invalid = imageSource.fromFile("~/app/res/avatar.png");
//cache.placeholder = imageSource.fromFile("~/app/res/avatar.png");
cache.maxRequests = 5;

var ActivitiesViewModel = (function (_super){
    
    __extends(ActivitiesViewModel, _super);
    
    function ActivitiesViewModel(source) {
        _super.call(this);
        this._source = source;
        this._activities = new observableArray.ObservableArray(); 
        this.set("isLoading", true);
    }

    Object.defineProperty(ActivitiesViewModel.prototype, "activities", {
        get: function () {

            var that = this;

            var expandExp = {
                "UserId": {
                    "ReturnAs": "User",
                    "Expand": {
                        "Picture": "Picture"
                    }
                },
                "Picture": {
                    "ReturnAs": "Picture",
                    "SingleField": "Uri"
                }
            };


            var data = EVERLIVE.data('Activities');
            
            var query = new Everlive.Query();
            query.orderDesc('CreatedAt');
            
            data.expand(expandExp).get(query).then(function(data) {
               for(var i = 0; i < data.result.length; i++){
                   data.result[i].dateConverter = dateConverter;
                   var activityItem = new activityItemViewModel.ActivityItemViewModel(data.result[i]);

                   data.result[i] = activityItem;
               }

                that._activities.push(data.result); 
            }, function(error) {
               alert("Activities can't be retrieved");
            });      

            return this._activities;        
        },
            enumerable: true,
            configurable: true
    });
    
    return ActivitiesViewModel;
})(observable.Observable);

exports.ActivitiesViewModel = ActivitiesViewModel;

function isValidImageUrl(url) {
    return url && (url.indexOf(".png") !== -1 || url.indexOf(".jpg") !== -1);
}

var dateConverter = {
    toView: function (value, format) {
        var result = format;
        var day = value.getDate();
        result = result.replace("DD", month < 10 ? "0" + day : day);
        var month = value.getMonth() + 1;
        result = result.replace("MM", month < 10 ? "0" + month : month);
        result = result.replace("YYYY", value.getFullYear());
        return result;
    },
    toModel: function (value, format) {
        var ddIndex = format.indexOf("DD");
        var day = parseInt(value.substr(ddIndex, 2));
        var mmIndex = format.indexOf("MM");
        var month = parseInt(value.substr(mmIndex, 2));
        var yyyyIndex = format.indexOf("YYYY");
        var year = parseInt(value.substr(yyyyIndex, 4));
        var result = new Date(year, month - 1, day);
        return result;
    }
}
