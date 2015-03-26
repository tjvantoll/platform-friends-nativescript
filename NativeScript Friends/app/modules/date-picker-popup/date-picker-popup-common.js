var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var dependencyObservable = require("ui/core/dependency-observable");
var proxy = require("ui/core/proxy");
var view = require("ui/core/view");
var DatePickerPopup = (function (_super) {
    __extends(DatePickerPopup, _super);
    function DatePickerPopup() {
        _super.call(this);
    }
    Object.defineProperty(DatePickerPopup.prototype, "year", {
        get: function () {
            return this._getValue(DatePickerPopup.yearProperty);
        },
        set: function (value) {
            this._setValue(DatePickerPopup.yearProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatePickerPopup.prototype, "month", {
        get: function () {
            return this._getValue(DatePickerPopup.monthProperty);
        },
        set: function (value) {
            this._setValue(DatePickerPopup.monthProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatePickerPopup.prototype, "day", {
        get: function () {
            return this._getValue(DatePickerPopup.dayProperty);
        },
        set: function (value) {
            this._setValue(DatePickerPopup.dayProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatePickerPopup.prototype, "maxDate", {
        get: function () {
            return this._getValue(DatePickerPopup.maxDateProperty);
        },
        set: function (value) {
            this._setValue(DatePickerPopup.maxDateProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatePickerPopup.prototype, "minDate", {
        get: function () {
            return this._getValue(DatePickerPopup.minDateProperty);
        },
        set: function (value) {
            this._setValue(DatePickerPopup.minDateProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    DatePickerPopup.yearProperty = new dependencyObservable.Property("year", "DatePickerPopup", new proxy.PropertyMetadata(undefined));
    DatePickerPopup.monthProperty = new dependencyObservable.Property("month", "DatePickerPopup", new proxy.PropertyMetadata(undefined));
    DatePickerPopup.dayProperty = new dependencyObservable.Property("day", "DatePickerPopup", new proxy.PropertyMetadata(undefined));
    DatePickerPopup.maxDateProperty = new dependencyObservable.Property("maxDate", "DatePickerPopup", new proxy.PropertyMetadata(undefined));
    DatePickerPopup.minDateProperty = new dependencyObservable.Property("minDate", "DatePickerPopup", new proxy.PropertyMetadata(undefined));
    return DatePickerPopup;
})(view.View);
exports.DatePickerPopup = DatePickerPopup;
