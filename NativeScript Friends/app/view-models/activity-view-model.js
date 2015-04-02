var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};

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
    
    activityViewModel.prototype.deleteActivity = function () {
        var activities = EVERLIVE.data("Activities");
        activities.destroySingle({ Id: this.activity.Id },
            function(){
                alert("Activity successfully deleted.");
            },
            function(error){
                alert(JSON.stringify(error));
            }
        );
    };
    
    return activityViewModel;
})(observable.Observable);

exports.activityViewModel = activityViewModel;