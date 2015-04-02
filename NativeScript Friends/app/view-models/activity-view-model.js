var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};

var LocalSettings = require("local-settings");
var observable = require("data/observable");

var activityViewModel = (function (_super) {
    __extends(activityViewModel, _super);

    function activityViewModel(source) {
        _super.call(this);
        this._activity = new observable.Observable();
    }

    Object.defineProperty(activityViewModel.prototype, "activity", {
        get: function () 
        {
            return this._activity;
        },
        set: function(value)
        {
            if (this._activity !== value) {
                this._activity = value;
                this.notify({ object: this, eventName: observable.knownEvents.propertyChange, propertyName: "activity", value: value });
            }
        }
    });
    
    Object.defineProperty(activityViewModel.prototype, "activityDateFormatted", {
        get: function () 
        {
            var m_names = new Array("JAN", "FEB", "MAR", 
            "APR", "MAY", "JUN", "JUL", "AUG", "SEP", 
            "OCT", "NOV", "DEC");

            var d = new Date(this._activity.CreatedAt);
            var curr_date = d.getDate();
            var curr_month = d.getMonth();
            var curr_year = d.getFullYear();
            var dateString = m_names[curr_month] + " " + curr_date + ", " + curr_year;
            
            return dateString;
        }
    });
    
    Object.defineProperty(activityViewModel.prototype, "userCanDeleteActivity", {
        get: function () 
        {
            var userId = LocalSettings.getString(USER_ID);
            return this._activity.User.Id === userId;
        }
    });
    
    Object.defineProperty(activityViewModel.prototype, "booleanToVisibilityConverter", {
        get: function () 
        {
            return booleanToVisibilityConverter;
        }
    });
    
    activityViewModel.prototype.deleteActivity = function () {
        var that = this;
        
        return new Promise(function (resolve, reject) {
            var activities = EVERLIVE.data("Activities");
            
            activities.destroySingle({ Id: that._activity.Id },
                function(){
                    return resolve();
                },
                function(error){
                    alert(JSON.stringify(error));
                    return reject();
                }
            );
        });
    };
    
    return activityViewModel;
})(observable.Observable);

var booleanToVisibilityConverter = {
	toView: function (value, format) {
		return value === true ? "visible" : "collapsed";
	},
	toModel: function (value, format) {
		return value === "visible";
	}
}

exports.activityViewModel = activityViewModel;