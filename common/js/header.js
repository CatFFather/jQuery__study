// SERVICE
import DeviceService from '../../script/service/DeviceService.js';
import LocalStorageService from '../../script/service/LocalStorageService.js';

$(() => {
    // $('#header').load('/common/html/header.html');
    $('#logout').on('click', logout);
});

// 로그아웃
function logout(params) {
    console.log('로그아웃 ');
    if (confirm('로그아웃 하시겠습니까?')) {
        location.href = '../index.html';
    }
}
