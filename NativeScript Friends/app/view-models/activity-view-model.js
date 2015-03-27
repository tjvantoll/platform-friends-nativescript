var observable = require("data/observable");
var observableArray = require("data/observable-array");
//var Everlive = require("../lib/everlive.all.min");

var _activity;

var activityViewModel = function (source)
{
    this._activity = new observable.Observable();
}

Object.defineProperty(activityViewModel.prototype, "activity", {
    get: function () {
        return this._activity;
    },
    set: function(value) {
        this._activity = value;
        alert(JSON.stringify(this._activity));
    },
    enumerable: true,
    configurable: true
})

exports.activityViewModel = activityViewModel;