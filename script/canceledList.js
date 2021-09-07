import LocalStorageService from './service/LocalStorageService.js';

$(() => {
    console.log('canceledList');
    getRequestList();
    $('.request__header__title').on('click', getRequestList);
});

function getRequestList(event, status, page, page_size) {
    console.log(event);
    const myinfo = LocalStorageService.getUserInfo();
    const req_agent_id = myinfo.member_agent.agent.id;

    // const reqAgentId = auth.user.agentId;
    let tokenString = LocalStorageService.getAccessToken();
    const params = {
        status: event && event.target.id ? event.target.id : 'CANCELED',
        page: 1,
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
            console.log(results);
            const request__list = $('.request__list');
            request__list.empty();

            results.forEach((request) => {
                request__list.append(`
            <div class="request__card">
                <div class="request__card__row1">
                    <div class="request__card__row1__items">
                        <div class="row1__car-number">${request.car_number}</div>
                        <div class="status status__cancel">취소</div>
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
                <div class="request__card__row7"><div>삭제</div></div>
            </div>
                `);
            });
        },
        error: function () {
            alert('목록 갱신 실패');
        },
    });
}
