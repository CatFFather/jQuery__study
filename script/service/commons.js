import LocalStorageService from './LocalStorageService.js'; // 로컬 서비스
import { getRefreshToken } from './member.js';
const tokenString = LocalStorageService.getAccessToken();
const refreshToken = LocalStorageService.getRefreshToken();

// 공지사항 리스트 불러오기
function getNoticeList(params) {
    return $.ajax({
        headers: {
            Authorization: 'JWT ' + tokenString,
        },
        type: 'get',
        url: `http://app1.in.delphicom.net:9000/api/commons/notice`,
        dataType: 'json',
        data: params,
        success: function (response) {
            return response;
        },
        error: function (error) {
            if (error.status === 401 && error.responseJSON.meta.systemCode === 'token_not_valid' && refreshToken) {
                console.log('토큰 만료');
                getRefreshToken();
            }
        },
    });
}

export { getNoticeList };
