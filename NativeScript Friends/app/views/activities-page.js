var vmModule = require("../view-models/activities-view-model");

function pageLoaded(args) {
    
    var page = args.object;
    page.bindingContext = new vmModule.activitiesViewModel;
    
}

exports.pageLoaded = pageLoaded;