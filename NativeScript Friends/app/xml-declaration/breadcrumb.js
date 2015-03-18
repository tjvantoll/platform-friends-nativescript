var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};

var stackLayoutModule = require("ui/layouts/stack-layout");
var enums = require("ui/enums");
var labelModule = require("ui/label");
var buttonModule = require("ui/button");

var layout = stackLayoutModule.StackLayout;
layout.orientation = enums.Orientation.horizontal;

var Breadcrumb = (function (_super) {
    __extends(Breadcrumb, _super);
    function Breadcrumb() {
        _super.call(this);
        
        var lButton = new buttonModule.Button();
        lButton.cssClass = "breadcrumb-left-button";
        
        var rButton = new buttonModule.Button();
        rButton.cssClass = "breadcrumb-right-button";

        this.addChild(lButton);
        this.addChild(rButton);
    }
    return Breadcrumb;
})(layout);
exports.Breadcrumb = Breadcrumb;