// SERVICE
import DeviceService from './service/DeviceService.js'; // .js 빼먹으면 오류 발생함★★★★★
import LocalStorageService from './service/LocalStorageService.js';

$(() => {
    console.log('document load success');
    // 로딩 완료시 디바이스 등록
    DeviceService.regist();

    // 로그인 로직
    $('.button__wrap').on('click', login);
    $('.input__normal').on('keypress', (event) => {
        if (event.keyCode == 13) {
            login();
        }
    });
});

// 로그인 로직
function login() {
    const id = $('input[name=id]').val();
    const pw = $('input[name=pw]').val();
    console.log(id);
    console.log(pw);

    $.ajax({
        type: 'post',
        url: 'http://app1.in.delphicom.net:9000/api/member/login',
        dataType: 'json',
        data: {
            device_id: localStorage.getItem('UUID'),
            target: 'TARGET_CARCENTER',
            id: id,
            password: pw,
        },
        success: function (response) {
            const results = response.data;
            console.log(results);
            LocalStorageService.setToken({
                access: response.data.access,
                refresh: response.data.refresh,
            });
        },
        error: function () {
            alert('로그인 실패');
        },
    }).then(() => {
        let tokenString = LocalStorageService.getAccessToken();
        $.ajax({
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'JWT ' + tokenString,
            },
            type: 'get',
            url: 'http://app1.in.delphicom.net:9000/api/member/my',
            dataType: 'json',
            success: function (response) {
                const results = response.data;
                console.log(results);
                LocalStorageService.setUserInfo(results);
                location.href = 'pages/requestList.html';
            },
            error: function () {
                alert('로그인 실패');
            },
        });
    });
}
