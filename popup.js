function submitCallback() {
    var startTimeInput = document.querySelector('#start-time');
    var endTimeInput = document.querySelector('#end-time');
    var startTimeString = startTimeInput.value;
    var endTimeString = endTimeInput.value;

    if (!!startTimeString && !!endTimeString) {
        var splitStatTime = startTimeString.split(':');
        var splitEndTime = endTimeString.split(':');
        var startTime = getTime(splitStatTime[0], splitStatTime[1]);
        var endTime = getTime(splitEndTime[0], splitEndTime[1]);

        if (startTime < endTime) {
            chrome.storage.sync.set({
                startTime: startTimeString,
                endTime: endTimeString
            });
            alert("저장됨!");
            window.close();
        } else {
            alert('시작시간을 끝 시간보다 빠르게 해주세요')
        }
    }
    function getTime(hour, minute) {
        var day = (hour === "00" && minute === "00")? 2 : 1;
        console.log(day)
        return new Date(1970, 1, day, parseInt(hour), parseInt(minute));
    }
}

function setTimeData() {
    chrome.storage.sync.get(function (data) {
        if (!!data && !!data.startTime && !!data.endTime) {
            var startTimeInput = document.querySelector('#start-time');
            var endTimeInput = document.querySelector('#end-time');
            startTimeInput.value = data.startTime;
            endTimeInput.value = data.endTime;
        }
    });
}
document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('#submit').onclick = submitCallback;
    setTimeData();
});

// chrome.extension.onMessage.addListener(function(request, sender) {
//     if (request.action == "getSource") {
//         document.body.innerText = request.source;
//     }
// });
//
// function onWindowLoad() {
//     chrome.tabs.executeScript(null, {
//         file: "getSource.js"
//     }, function() {
//         if (chrome.extension.lastError) {
//             document.body.innerText = 'There was an error injecting script : \n' + chrome.extension.lastError.message;
//         }
//     });
// }
// window.onload = onWindowLoad;