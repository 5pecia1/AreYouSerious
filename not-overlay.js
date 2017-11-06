function init() {
    console.log("not overlay init")
    chrome.extension.sendMessage({
        action: "notOverlayAction",
        tabId: window.areYouSerious['tabId'],
        url: window.areYouSerious['tabUrl']
    });
}

init();