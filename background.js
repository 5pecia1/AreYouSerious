var TabsInformation = (function () {
    var instance;

    function createInstance() {
        var object = {};
        return object;
    }

    return {
        getInstance: function () {
            if (!instance) {
                instance = createInstance();
            }
            return instance;
        }
    };
})();

function checkBlackList(tabsInformation, url, tabId) {
    var blockList = ['youtube.com'];

    for (var i = 0; i < blockList.length; i++) {
        if (!!(url.match(new RegExp(blockList[i])))) {
            var currentHour = new Date().getHours();
            var currentMinutes = new Date().getMinutes();

            var currentTime = getTime(currentHour, currentMinutes);
            var startTime = getTime('7', '00');
            var endTime = getTime(9,0);

            if (currentTime.getTime() <= startTime.getTime()
                || currentTime.getTime() >= endTime.getTime()) {
                setOverlay(tabsInformation, url, tabId);
                return true;
            }
        }
    }
    return false;
}

function getTime(hour, minute) {
    var day = (parseInt(hour) === 0 && parseInt(minute) === 0)? 2 : 1;
    return new Date(1970, 1, day, hour, minute);
}

chrome.tabs.onUpdated.addListener( function (tabId, changeInfo, tab) {
    var tabsInformation= TabsInformation.getInstance();
    if (changeInfo.status === 'complete') {
        if (checkBlackList(tabsInformation, getUrl(tab.url), tabId)) {
            return;
        }
        chrome.storage.sync.get(function (data) {
            var whiteList = data.whiteList;
            var url = getUrl(tab.url);
            if (!!whiteList && whiteList.length > 0) {
                for (var i = 0; i < whiteList.length; i++) {
                    if (!!(url.match(new RegExp(whiteList[i])))) {
                        return;
                    }
                }
            }

            if (!!data && !!data.startTime && !!data.endTime) {
                var startTimeString = data.startTime.split(':');
                var endTimeString = data.endTime.split(':');
                var currentHour = new Date().getHours();
                var currentMinutes = new Date().getMinutes();

                var currentTime = getTime(currentHour, currentMinutes);
                var startTime = getTime(startTimeString[0], startTimeString[1]);
                var endTime = getTime(endTimeString[0], endTimeString[1]);

                if (currentTime.getTime() >= startTime.getTime()
                    && currentTime.getTime() <= endTime.getTime()){
                    setOverlay(tabsInformation, url, tabId);
                }
            }
        });
    }
});

function setOverlay(tabsInformation, url, tabId) {
    if (tabsInformation[tabId] === url) {
        delete(tabsInformation[tabId]);
        chrome.tabs.executeScript(tabId, {file: "not-overlay.js"});
        chrome.tabs.executeScript(tabId, {
            code:
            'window.areYouSerious = {tabId: ' + tabId + ',' +
            'tabUrl: "' + url + '"}'
        });
    } else {
        chrome.tabs.insertCSS(tabId, {file: "overlay.css"});
        chrome.tabs.executeScript(tabId, {file: "overlay.js"});
        chrome.tabs.executeScript(tabId, {
            code:
            'window.areYouSerious = {tabId: ' + tabId + ',' +
            'tabUrl: "' + url + '"}'
        });
    }
}


chrome.tabs.onRemoved.addListener( function (tabId, removeInfo) {
    var tabsInformation= TabsInformation.getInstance();
    delete(tabsInformation[tabId]);
});

chrome.extension.onMessage.addListener(function (request, sender) {
    var tabsInformation= TabsInformation.getInstance();
    if (request.action === 'closeAction') {
        tabsInformation[request.tabId] = request.url;
        chrome.tabs.reload(request.tabId);
    } else if (request.action === 'notOverlayAction') {
        tabsInformation[request.tabId] = request.url;
    }
});

function getUrl(url) {
    return url.split("#")[0];
}

console.log("background start");
