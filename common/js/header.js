$(() => {
    $('#logout').on('click', logout);
});

// 로그아웃
function logout(params) {
    if (confirm('로그아웃 하시겠습니까?')) {
        location.href = '../index.html';
    }
}
