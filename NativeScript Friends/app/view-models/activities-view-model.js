var observable = require("data/observable");
var observableArray = require("data/observable-array");
var everlive = require("../lib/everlive.all.min");

var activitiesViewModel = function (source)
{
    this._activities = new observableArray.ObservableArray(); 
}

Object.defineProperty(activitiesViewModel.prototype, "activities", {
    get: function () {
        var el = new everlive({ apiKey: BS_API_KEY });
        var that = this;
        el.data('Activities').get().then(function(data) {
           that._activities.push(data.result); 
        }, function(error) {
           alert('Error gettings activities[' + error.message + ']');
        });      

        return this._activities;        
    },
        enumerable: true,
        configurable: true
});

exports.activitiesViewModel = activitiesViewModel;