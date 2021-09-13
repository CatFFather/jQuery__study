import LocalStorageService from './LocalStorageService.js'; // 로컬 서비스
const tokenString = LocalStorageService.getAccessToken();
const refreshToken = LocalStorageService.getRefreshToken();

// 부폼 요청때 직접선택 시 부품업체 Autocomplete
function getAgentPartsAutocomplete(filter) {
    return $.ajax({
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'JWT ' + tokenString,
        },
        type: 'get',
        url: `http://app1.in.delphicom.net:9000/api/agent/parts/autocomplete`,
        dataType: 'json',
        data: filter,
        success: function (response) {
            return response.data;
        },
        error: function (e) {
            $('.autocomplete__wrap').remove();
            if (error.status === 401 && error.responseJSON.meta.systemCode === 'token_not_valid' && refreshToken) {
                console.log('토큰 만료');
                getRefreshToken();
            }
        },
    });
}

export { getAgentPartsAutocomplete };
