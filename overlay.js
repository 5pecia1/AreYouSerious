function init() {
    console.log('overlay init');
    var _overwriteCode
        = '<div id="are-you-serious-myModal" class="are-you-serious-modal">\n' +
        '\n' +
        '  <div class="are-you-serious-modal-content">\n' +
        '    <div class="are-you-serious-modal-header">\n' +
        '      <span class="are-you-serious-close">&times;</span>\n' +
        '      <h2>너 진심이냐?</h2>\n' +
        '    </div>\n' +
        '    <div class="are-you-serious-modal-body">\n' +
        '      <p>우리 뇌의 전전두엽 피질의 신경세포 수백만 개는 쉬지 않고 환경을 감시하며 집중해야 할 일들을 골라내는 역할을 하는데, 정보 과잉에 노출되면 이 시스템에 과부하가 걸리게 되는 겁니다. 과부하가 걸리면 뇌는 이른바\' 탈진 상태\'가 되면서 집중력뿐만 아니라 기억력까지 저하된다는 것입니다.</p>\n' +// 출처 : http://news.sbs.co.kr/news/endPage.do?news_id=N1004168575
        '    </div>\n' +
        '    <div class="are-you-serious-modal-footer">\n' +
        '      <h3></h3>\n' +
        '    </div>\n' +
        '  </div>\n' +
        '\n' +
        '</div>';

    document.querySelector('body').innerHTML += _overwriteCode;

    var areYouSeriousModal = document.getElementById('are-you-serious-myModal');
    var areYouSeriousSpan = document.getElementsByClassName("are-you-serious-close")[0];

    areYouSeriousSpan.onclick = function() {
        areYouSeriousModal.style.display = "none";
        console.log('closed')
        chrome.extension.sendMessage({
            action: "closeAction",
            tabId: window.areYouSerious['tabId'],
            url: window.areYouSerious['tabUrl']
        });
    }
}

(function () {
    if (!document.querySelector("#are-you-serious-myModal")) {
        init();
    }
})();
