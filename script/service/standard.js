import LocalStorageService from './LocalStorageService.js'; // 로컬 서비스
import { getRefreshToken } from './member.js';

const tokenString = LocalStorageService.getAccessToken(); // 토큰
const refreshToken = LocalStorageService.getRefreshToken();

// 보험사 기준정보 받아오기
function getInsuranceList() {
    return $.ajax({
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'JWT ' + tokenString,
        },
        type: 'get',
        url: `http://app1.in.delphicom.net:9000/api/standard/insurance-company?able=true`,
        dataType: 'json',
        success: function (response) {
            return response.data;
        },
        error: function (error) {
            if (error.status === 401 && error.responseJSON.meta.systemCode === 'token_not_valid' && refreshToken) {
                console.log('토큰 만료');
                getRefreshToken();
            }
        },
    });
}

export { getInsuranceList };
