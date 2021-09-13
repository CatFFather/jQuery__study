import LocalStorageService from './LocalStorageService.js'; // 로컬 서비스
import { getRefreshToken } from './member.js';
const tokenString = LocalStorageService.getAccessToken();
const refreshToken = LocalStorageService.getRefreshToken();
const myinfo = LocalStorageService.getUserInfo(); // 로컬에 저장해 둔 정보
const req_agent_id = myinfo.member_agent.agent.id; // agent id

function partsRequestService(params) {
    // 요청
    $.ajax({
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'JWT ' + tokenString,
        },
        type: 'post',
        url: `http://app1.in.delphicom.net:9000/api/parts-request`,
        dataType: 'json',
        data: JSON.stringify(params),
        success: function (response) {
            const results = response.data.results;
            console.log(results);
            alert('매칭 성공');
            location.href = 'requestList.html';
        },
        error: function () {
            alert('매칭 요청 실패');
        },
    });
}

/**
 *
 * @param {*} params // 요청할 파라미터
 * @param {*} getList  // 토큰 재갱신 후 부를 함수
 * @returns
 */

// 요청 리스트 불러오기
function getRequestList(params) {
    return $.ajax({
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'JWT ' + tokenString,
        },
        type: 'get',
        url: `http://app1.in.delphicom.net:9000/api/parts-request/carcenter/${req_agent_id}`,
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

export {
    partsRequestService, //부품 요청
    getRequestList, // 요청 리스트 불러오기
};
