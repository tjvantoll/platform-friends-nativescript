var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};

var observable = require("data/observable");

var AddActivityViewModel = (function (_super) {
    __extends(AddActivityViewModel, _super);

    function AddActivityViewModel(source) {
        _super.call(this);
        this._activity = new observable.Observable();
    }

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