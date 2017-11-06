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
            var whiteList = document.querySelector('#white-list').value;

            chrome.storage.sync.set({
                startTime: startTimeString,
                endTime: endTimeString,
                whiteList: whiteList.split('\n').filter(function (t) { return !!t})
            });
            alert("저장됨!");
            window.close();
        } else {
            alert('시작시간을 끝 시간보다 빠르게 해주세요')
        }
    }
    function getTime(hour, minute) {
        var day = (hour === "00" && minute === "00")? 2 : 1;
        return new Date(1970, 1, day, parseInt(hour), parseInt(minute));
    }
}

function setTimeData() {
    chrome.storage.sync.get(function (data) {
        if (!!data && !!data.startTime && !!data.endTime) {
            var startTimeInput = document.querySelector('#start-time');
            var endTimeInput = document.querySelector('#end-time');
            var whiteListInput = document.querySelector('#white-list');

            var whiteList = data.whiteList;

            startTimeInput.value = data.startTime;
            endTimeInput.value = data.endTime;

            for(var i = 0; i < whiteList.length; i++) {
                whiteListInput.value += whiteList[i] + '\n';
            }
        }
    });
}
document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('#submit').onclick = submitCallback;
    setTimeData();
});
