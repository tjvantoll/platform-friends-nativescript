var observable = require("data/observable");
var observableArray = require("data/observable-array");
var Everlive = require("../lib/everlive.all.min");

var activitiesViewModel = function (source)
{
    this._activities = new observableArray.ObservableArray();
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

Object.defineProperty(activitiesViewModel.prototype, "activities", {
    get: function () {
        
        var el = new Everlive({ apiKey: BS_API_KEY });
        var that = this;
        
        var expandExp = {
            "UserId": {
                "ReturnAs": "UserName",
                "SingleField": "DisplayName"
            }
        };
        
        var data = el.data('Activities');
        
        data.expand(expandExp).get().then(function(data) {
            
           for(var i = 0; i < data.result.length; i++){
               data.result[i].dateConverter = dateConverter;
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

exports.activitiesViewModel = activitiesViewModel;