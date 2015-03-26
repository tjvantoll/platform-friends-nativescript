var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var common = require("./date-picker-popup-common");
function onYearPropertyChanged(data) {
    var picker = data.object;
    if (picker.ios) {
        setYearMonthDay(picker.ios, data.newValue, picker.month, picker.day);
    }
}
common.DatePickerPopup.yearProperty.metadata.onSetNativeValue = onYearPropertyChanged;
function onMonthPropertyChanged(data) {
    var picker = data.object;
    if (picker.ios) {
        setYearMonthDay(picker.ios, picker.year, data.newValue, picker.day);
    }
}
common.DatePickerPopup.monthProperty.metadata.onSetNativeValue = onMonthPropertyChanged;
function onDayPropertyChanged(data) {
    var picker = data.object;
    if (picker.ios) {
        setYearMonthDay(picker.ios, picker.year, picker.month, data.newValue);
    }
}
common.DatePickerPopup.dayProperty.metadata.onSetNativeValue = onDayPropertyChanged;
require("utils/module-merge").merge(common, exports);
var DatePickerPopup = (function (_super) {
    __extends(DatePickerPopup, _super);
    function DatePickerPopup() {
        _super.call(this);
        this._ios = new UIDatePicker();
        this._ios.datePickerMode = UIDatePickerMode.UIDatePickerModeDate;
        this._changeHandler = UIDatePickerChangeHandlerImpl.new().initWithOwner(this);
        this._ios.addTargetActionForControlEvents(this._changeHandler, "valueChanged", UIControlEvents.UIControlEventValueChanged);
    }
    Object.defineProperty(DatePickerPopup.prototype, "ios", {
        get: function () {
            return this._ios;
        },
        enumerable: true,
        configurable: true
    });
    return DatePickerPopup;
})(common.DatePickerPopup);
exports.DatePickerPopup = DatePickerPopup;
var UIDatePickerChangeHandlerImpl = (function (_super) {
    __extends(UIDatePickerChangeHandlerImpl, _super);
    function UIDatePickerChangeHandlerImpl() {
        _super.apply(this, arguments);
    }
    UIDatePickerChangeHandlerImpl.new = function () {
        return _super.new.call(this);
    };
    UIDatePickerChangeHandlerImpl.prototype.initWithOwner = function (owner) {
        this._owner = owner;
        return this;
    };
    UIDatePickerChangeHandlerImpl.prototype.valueChanged = function (sender) {
        var calendar = NSCalendar.currentCalendar();
        var comp = calendar.componentsFromDate(NSCalendarUnit.NSHourCalendarUnit | NSCalendarUnit.NSMinuteCalendarUnit, sender.date);
        this._owner._onPropertyChangedFromNative(common.DatePickerPopup.yearProperty, comp.year);
        this._owner._onPropertyChangedFromNative(common.DatePickerPopup.monthProperty, comp.month);
        this._owner._onPropertyChangedFromNative(common.DatePickerPopup.dayProperty, comp.day);
    };
    UIDatePickerChangeHandlerImpl.ObjCExposedMethods = {
        'valueChanged': { returns: interop.types.void, params: [UIDatePicker] }
    };
    return UIDatePickerChangeHandlerImpl;
})(NSObject);
function setYearMonthDay(picker, year, month, day) {
    var calendar = NSCalendar.currentCalendar();
    var comps = new NSDateComponents();
    comps.year = year;
    comps.month = month;
    comps.day = day;
    picker.setDateAnimated(calendar.dateFromComponents(comps), false);
}