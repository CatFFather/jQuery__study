$(() => {
    $('.header__item').on('click', goToPage);
});

// 로그아웃
function logout(params) {
    if (confirm('로그아웃 하시겠습니까?')) {
        location.href = '../index.html';
    }
}

// 메뉴선택, 로고 선택 시 해당 페이지 이동
function goToPage(event) {
    console.log(event);
    if (event.currentTarget.id == 'LOGOUT') {
        logout();
    } else if (event.currentTarget.id == 'NOTICE') {
        location.href = 'noticeList.html';
    }
}
