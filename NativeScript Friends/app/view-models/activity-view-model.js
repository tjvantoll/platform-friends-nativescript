var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};

var LocalSettings = require("local-settings");
var observable = require("data/observable");
var observableArray = require("data/observable-array");
var Everlive = require("../lib/everlive.all.min");

var booleanToVisibilityConverter = {
	toView: function (value, format) {
		return value === true ? "visible" : "collapsed";
	},
	toModel: function (value, format) {
		return value === "visible";
	}
}

var activityViewModel = (function (_super) {
    __extends(activityViewModel, _super);

    function activityViewModel(source) {
        _super.call(this);
        this._activity = new observable.Observable();
        this._comments = new observableArray.ObservableArray(); 
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
                //this.notify({ object: this, eventName: observable.knownEvents.propertyChange, propertyName: "comments", value: this.comments });
            }
        }
    });
    
    Object.defineProperty(activityViewModel.prototype, "comments", {
        get: function () 
        {
            var that = this;
            var commentsData = EVERLIVE.data("Comments");
            
            var query = new Everlive.Query();
            query.where().eq("ActivityId", that._activity.Id);
            query.orderDesc("CreatedAt");
            
            var expandExp = {
                "UserId": {
                    "ReturnAs": "UserName",
                    "SingleField": "DisplayName"
                }
            };
            
            commentsData.expand(expandExp).get(query)
            .then(function(data) {
                if (data && data.count !== 0)
                {
                    that._comments.push(data.result);
                }
            },
            function(error){
                alert(JSON.stringify(error));
            });
            
            return this._comments;
        },
        enumerable: true,
        configurable: true
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

exports.activityViewModel = activityViewModel;