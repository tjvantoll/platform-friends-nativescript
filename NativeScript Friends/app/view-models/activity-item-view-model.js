var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};

var observable = require("data/observable");
var imageSource = require("image-source");

var ActivityItemViewModel = (function (_super){
    
    __extends(ActivityItemViewModel, _super);
    
    function ActivityItemViewModel(source) {
        _super.call(this);
        this._source = source;
        if (this._source) {
            var property;
            for (property in this._source) {
                this.set(property, this._source[property]);
            }
        }
    }

    Object.defineProperty(ActivityItemViewModel.prototype, "pictureImageSource", {
        get: function () {
            var that = this;
            if (this._source && !this._pictureImageSource) {
               imageSource.fromUrl(that._source.Picture).then(function (result) {
                    that._pictureImageSource = result;
                    that.notify({ object: that, eventName: observable.knownEvents.propertyChange, propertyName: "pictureImageSource", value: that._pictureImageSource });
                });
            }
            return this._pictureImageSource;
        }
    });
    
    Object.defineProperty(ActivityItemViewModel.prototype, "userName", {
        get: function () {
            if (this._source) {
                this._userName = this._source.User.DisplayName;
                this.notify({ object: this, eventName: observable.knownEvents.propertyChange, propertyName: "userName", value: this._userName });
            }
            return this._userName;        
        }
    });
    
    Object.defineProperty(ActivityItemViewModel.prototype, "avatarImageSource", {
        get: function () {
            var that = this;
            var url = this._source.User.Picture === null ? null : this._source.User.Picture.Uri;
            
            if (!url) {
                this._avatarImageSource = null;
            } else if (this._source && !this._avatarImageSource) {
               imageSource.fromUrl(url).then(function (result) {
                    that._avatarImageSource = result;
                    that.notify({ object: that, eventName: observable.knownEvents.propertyChange, propertyName: "avatarImageSource", value: that._avatarImageSource });
                });
            }
            
            return this._avatarImageSource;
        }
    });
    
    return ActivityItemViewModel;
})(observable.Observable);

exports.ActivityItemViewModel = ActivityItemViewModel;