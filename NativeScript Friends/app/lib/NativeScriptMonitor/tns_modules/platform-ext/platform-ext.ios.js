var device = (function () {
    function device() {
    }
    Object.defineProperty(device, "language", {
        get: function () {
            if (!device._language) {
                alert('NSLocale.currentLocale().preferredLanguages');
                //device._language = NSLocale.currentLocale().preferredLanguages[0];
            }
            return device._language;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(device, "userAgent", {
        get: function () {
            if (!device._userAgent) {
                device._userAgent = new UIWebView().stringByEvaluatingJavaScriptFromString('navigator.userAgent');
            }
            return device._userAgent;
        },
        enumerable: true,
        configurable: true
    });
    return device;
})();

exports.device = device;