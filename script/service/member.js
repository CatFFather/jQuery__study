import LocalStorageService from './LocalStorageService.js';
const refreshToken = LocalStorageService.getRefreshToken();

/**
 *
 * @param {*} getPage // 다시 갱신할 api
 */
function getRefreshToken() {
    $.ajax({
        url: `http://app1.in.delphicom.net:9000/api/member/token/refresh`,
        data: { refresh: refreshToken },
        method: 'post',
        dataType: 'json',
    })
        .done((res) => {
            LocalStorageService.setToken({
                access: res.data.access,
                refresh: res.data.refresh,
            });
            location.href = 'error.html';
        })
        .fail((e) => {
            alert('토큰 갱신 실패');
            console.log(e);
        });
}

export {
    getRefreshToken, // 토큰 갱신
};
