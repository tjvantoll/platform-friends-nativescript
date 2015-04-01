var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};

var observable = require("data/observable");

var addActivityViewModel = (function (_super) {
    __extends(addActivityViewModel, _super);

    function addActivityViewModel(source) {
        _super.call(this);
        this._activity = new observable.Observable();
    }

    Object.defineProperty(addActivityViewModel.prototype, "activity", {
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
    
    return addActivityViewModel;
})(observable.Observable);

exports.addActivityViewModel = addActivityViewModel;