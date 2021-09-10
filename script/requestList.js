import LocalStorageService from './service/LocalStorageService.js'; // 로컬 서비스
import { commonPagination } from '../common/js/pagination.js'; // 페이징 처리
import { cancelModal } from '../common/js/modal.js'; // 모달창
import { formatDate } from './util.js'; // 날짜 포멧
import { getRefreshToken } from './service/member.js'; // 토큰 재갱신

$(() => {
    getRequestList();
});

// 요청 리스트 불러오기
function getRequestList(current_page) {
    const myinfo = LocalStorageService.getUserInfo(); // 로컬에 저장해 둔 정보
    const req_agent_id = myinfo.member_agent.agent.id; // agent id

    let tokenString = LocalStorageService.getAccessToken();
    const params = {
        status: 'REQUEST',
        page: current_page,
        page_size: 12,
        ordering: 'created',
    };

    $.ajax({
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'JWT ' + tokenString,
        },
        type: 'get',
        url: `http://app1.in.delphicom.net:9000/api/parts-request/carcenter/${req_agent_id}`,
        dataType: 'json',
        data: params,
        success: function (response) {
            const results = response.data.results; // data
            const pagination = response.meta.page; // 페이징
            console.log(results);
            console.log(pagination);

            // 리스트에 데이터 추가
            const request__list = $('.request__list');
            request__list.empty();
            results.forEach((request) => {
                request__list.append(`
                    <div class="request__card">
                        <div class="request__card__row1">
                            <div class="request__card__row1__items">
                                <div class="row1__car-number">${request.car_number}</div>
                                <div class="status status__request">연결중</div>
                            </div>
                            <div class="request__card__row1__items">
                                <div class="row1__request-number">#${request.id}</div>
                                <div class="row1__request-date">${formatDate(request.created)}</div>
                            </div>
                        </div>
                        <div class="request__card__row2">${request.car_model ? request.car_model : '-'}</div>
                        <div class="request__card__row3">${request.insurance.name} ${request.filing_number}</div>
                        <div class="request__card__row4">
                            <div>${request.parts_brok_matches[0].parts_agent.name}</div>
                            <div><img src='/imgs/btn_call.png'/><img src='/imgs/btn_message.png'/></div>
                        </div>
                        <div class="request__card__row5"><span>요청자명</span> <span>${request.created_by_name}</span></div>
                        <div class="request__card__row6"><span>차대번호</span> <span>${request.vehicle_id ? request.vehicle_id : '-'}</span></div>
                        <div class="request__card__row7">
                            <div class='request__cancel' data-match_id="${request.parts_brok_matches[0].id}">요청취소</div>
                        </div>
                    </div>
                `);
            });

            // 페이징 처리
            commonPagination(pagination, getRequestList);

            // 요청 취소 이벤트 부여 (modal 호출)
            $('.request__cancel').on('click', (e) => {
                const props = {
                    match_id: e.currentTarget.dataset.match_id,
                    getList: getRequestList,
                };
                cancelModal(props);
            });
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
