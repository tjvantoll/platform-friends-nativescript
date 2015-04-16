# Telerik Analytics NativeScript Monitor

This repository contains a NativeScript module exposing Telerik Analytics functionality. It is based on the standard javascript Analytics Monitor and extending it with NativeScript specific wrappers for capturing device information and reporting data to the Analytics endpoint.

# Device Info

The NativeScript monitor uses the NativeScript [platform module](https://github.com/NativeScript/cross-platform-modules/tree/master/platform) in order to calculate the device's primary monitor resolution and a custom extension to retrieve the device language and user agent.

Here's a sample payload of the device specific information being captured:

```
{
  "screen": "1080x1920",
  "language": "en_US"
}
```

and a sample user agent string sent from the device:

```
Mozilla/5.0 (Linux; Android 4.4.4; Samsung Galaxy S5 - 4.4.4 - API 19 - 1080x1920 Build/KTU84P) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/33.0.0.0 Mobile Safari/537.36
```

# Installation

In order to use the NativeScript monitor we must first create a new Analytics project and retrieve the generated product id.

1. If you haven't installed NativeScript yet, follow the steps outlined in the [official documentation](https://github.com/NativeScript/nativescript-cli)
2. Create a new NativeScript application
  ```
  tns create hello-world
  ```

3. Add the desired platform (android or iOS)
  ```
  tns platform add android
  ```

4. Copy paste the contents of the `NativeScriptMonitor` folder from this git repository repository into the application. Here's how the folder structure should look like:

```
.
├── app
│   ├── app
│   │   ├── app.css
│   │   ├── app.js
│   │   ├── bootstrap.js
│   │   ├── main-page.js
│   │   ├── main-page.xml
│   │   └── NativeScriptMonitor
│   │       ├── tns_modules
│   │       |   └── platform-ext
|   |       |       ├── platform-ext.android.js
|   |       |       └── platform-ext.ios.js  
|   |       ├── package.json
│   │       ├── DeviceInfo.js
|   |       ├── EqatecMonitor.js
|   |       └── NativeScriptMonitor.js
│   └── tns_modules
│       └── ...
└── platforms
    ├── android
    └── ios
```

# Submitting Data

In `main-view-model.js` require the `NativeScriptMonitor.js` file:

```javascript
var NativeScriptMonitor = require('./NativeScriptMonitor').Monitor;
```

and then create an instance of the monitor and start submitting statistics

```javascript
var monitor = new NativeScriptMonitor({
    productId: 'd2531148-f593-4fcc-bb65-8aa8ba1fb218',
    version: '1.2.3'
});

monitor.start();

monitor.trackFeature('MyCategory.MyFeature');
monitor.trackFeatureValue('MyCategory.MyValue', 1000);
monitor.trackException(new Error('some error'), 'some error message');
monitor.trackFeatureStart('MyCategory.MyFeature');
timer.setTimeout(function() {
    monitor.trackFeatureStop('MyCategory.MyFeature');
});

monitor.stop();
```