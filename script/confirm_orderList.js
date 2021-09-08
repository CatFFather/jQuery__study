import LocalStorageService from './service/LocalStorageService.js';
import { commonPagination } from '../common/js/pagination.js';

$(() => {
    console.log('confirm_orderList');
    getConfirm_orderList();
});

//
function getConfirm_orderList(current_page) {
    const myinfo = LocalStorageService.getUserInfo();
    const req_agent_id = myinfo.member_agent.agent.id;

    // const reqAgentId = auth.user.agentId;
    let tokenString = LocalStorageService.getAccessToken();
    const params = {
        status: 'CONFIRM_ORDER',
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
            const results = response.data.results;
            const pagination = response.meta.page;
            console.log(results);
            const request__list = $('.request__list');
            request__list.empty();

            results.forEach((request) => {
                request__list.append(`
            <div class="request__card">
                <div class="request__card__row1">
                    <div class="request__card__row1__items">
                        <div class="row1__car-number">${request.car_number}</div>
                        <div class="status status__confirm_order">주문확정</div>
                    </div>
                    <div class="request__card__row1__items">
                        <div class="row1__request-number">#${request.id}</div>
                        <div class="row1__request-date">21.09.02</div>
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
                    <div class="row7__button__item">요청취소</div>
                    <div class="divider"></div> 
                    <div class="row7__button__item"><img src="/imgs/icon_part.png">부품견적서</div></div>
            </div>
                `);
            });
            // 페이징 처리
            commonPagination(pagination, getConfirm_orderList);
        },
        error: function () {
            alert('목록 갱신 실패');
        },
    });
}
