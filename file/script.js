// 버튼과 body 요소를 가져옵니다.
const themeBtn = document.getElementById('themeBtn');
const body = document.body;

// 버튼 클릭 이벤트 리스너 추가
themeBtn.addEventListener('click', function () {
    // body에 'black-theme' 클래스를 껐다 켰다(toggle) 합니다.
    body.classList.toggle('black-theme');

    // 현재 테마에 따라 버튼 텍스트를 변경합니다.
    if (body.classList.contains('black-theme')) {
        themeBtn.textContent = 'SWITCH TO BLUE';
    } else {
        themeBtn.textContent = 'SWITCH TO BLACK';
    }
});