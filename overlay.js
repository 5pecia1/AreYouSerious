var _overwriteCode
    = '<div id="myModal" class="modal">\n' +
    '\n' +
    '  <div class="modal-content">\n' +
    '    <div class="modal-header">\n' +
    '      <span class="close">&times;</span>\n' +
    '      <h2>너 진심이냐?</h2>\n' +
    '    </div>\n' +
    '    <div class="modal-body">\n' +
    '      <p>우리 뇌의 전전두엽 피질의 신경세포 수백만 개는 쉬지 않고 환경을 감시하며 집중해야 할 일들을 골라내는 역할을 하는데, 정보 과잉에 노출되면 이 시스템에 과부하가 걸리게 되는 겁니다. 과부하가 걸리면 뇌는 이른바\' 탈진 상태\'가 되면서 집중력뿐만 아니라 기억력까지 저하된다는 것입니다.</p>\n' +// 출처 : http://news.sbs.co.kr/news/endPage.do?news_id=N1004168575
    '    </div>\n' +
    '    <div class="modal-footer">\n' +
    '      <h3></h3>\n' +
    '    </div>\n' +
    '  </div>\n' +
    '\n' +
    '</div>';

document.querySelector('body').innerHTML += _overwriteCode;

var modal = document.getElementById('myModal');
var span = document.getElementsByClassName("close")[0];

span.onclick = function() {
    modal.style.display = "none";
}
