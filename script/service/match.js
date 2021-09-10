import LocalStorageService from './LocalStorageService.js'; // 로컬 서비스

let tokenString = LocalStorageService.getAccessToken();

function requestCancel(params) {
    console.log('params', params);
    return $.ajax({
        headers: {
            Authorization: 'JWT ' + tokenString,
        },
        type: 'POST',
        url: `http://app1.in.delphicom.net:9000/api/match/${params.match_id}/cancel`,
        dataType: 'json',
        data: {
            match_id: params.match_id,
            reason: params.reason,
        },
        success: function (response) {
            alert('요청이 취소 되었습니다.');
            // 모달 닫기
            $('.modal').remove();
        },
        error: function (error) {
            let refreshToken = LocalStorageService.getRefreshToken();
            if (error.status === 401 && error.responseJSON.meta.systemCode === 'token_not_valid' && refreshToken) {
                console.log('토큰 만료');
                getRefreshToken(getRequestList);
            }
        },
    });
}

export {
    requestCancel, // 요청 취소 api
};
