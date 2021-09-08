import LocalStorageService from './service/LocalStorageService.js';

$(() => {
    var currentPage = 1;
    let pageSize = 15;
    console.log('confirm_orderList');
    getRequestList();
    $('.request__header__title').on('click', getRequestList);

    function getRequestList(event, status) {
        console.log(event);
        const myinfo = LocalStorageService.getUserInfo();
        const req_agent_id = myinfo.member_agent.agent.id;

        // const reqAgentId = auth.user.agentId;
        let tokenString = LocalStorageService.getAccessToken();

        const params = {
            status: event && event.target.id ? event.target.id : 'CONFIRM_ORDER',
            page: currentPage,
            page_size: 12,
            ordering: 'created',
        };
        console.log(params);
        let totalCount = 200;
        console.log('button count : ', Math.ceil(totalCount / pageSize));
        setPageBtn(Math.ceil(totalCount / pageSize));
        // $.ajax({
        //     headers: {
        //         'Content-Type': 'application/json',
        //         Authorization: 'JWT ' + tokenString,
        //     },
        //     type: 'get',
        //     url: `http://app1.in.delphicom.net:9000/api/parts-request/carcenter/${req_agent_id}`,
        //     dataType: 'json',
        //     data: params,
        //     success: function (response) {
        //         const results = response.data.results;
        //         console.log(results);
        //         const request__list = $('.request__list');
        //         request__list.empty();

        //         results.forEach((request) => {
        //             request__list.append(`
        //         <div class="request__card">
        //             <div class="request__card__row1">
        //                 <div class="request__card__row1__items">
        //                     <div class="row1__car-number">${request.car_number}</div>
        //                     <div class="status status__confirm_order">주문확정</div>
        //                 </div>
        //                 <div class="request__card__row1__items">
        //                     <div class="row1__request-number">#${request.id}</div>
        //                     <div class="row1__request-date">21.09.02</div>
        //                 </div>
        //             </div>
        //             <div class="request__card__row2">${request.car_model ? request.car_model : '-'}</div>
        //             <div class="request__card__row3">${request.insurance.name} ${request.filing_number}</div>
        //             <div class="request__card__row4">
        //                 <div>${request.parts_brok_matches[0].parts_agent.name}</div>
        //                 <div><img src='/imgs/btn_call.png'/><img src='/imgs/btn_message.png'/></div>
        //             </div>
        //             <div class="request__card__row5"><span>요청자명</span> <span>${request.created_by_name}</span></div>
        //             <div class="request__card__row6"><span>차대번호</span> <span>${request.vehicle_id ? request.vehicle_id : '-'}</span></div>
        //             <div class="request__card__row7">
        //                 <div class="row7__button__item">요청취소</div>
        //                 <div class="divider"></div>
        //                 <div class="row7__button__item"><img src="/imgs/icon_part.png">부품견적서</div></div>
        //         </div>
        //             `);
        //         });
        //     },
        //     error: function () {
        //         alert('목록 갱신 실패');
        //     },
        // });
    }

    function movePage(page) {}

    function setPageBtn(pageCount) {
        var maxButton = 5;
        var temp = 1;
        $('#pagination').empty();
        if (currentPage != 1) $('#pagination').append(`<div class="prev"/>`);
        while (temp < pageCount) {
            var button = `<div class="sq ${temp == currentPage ? 'current' : ''}" param="${temp}" id=${temp} >${temp}</div>`;
            $('#pagination').append(button);
            temp++;
        }
        $('#pagination').append(`<div class="after"/>`);

        $('.sq').on('click', (e) => {
            console.log(e.currentTarget.id);

            currentPage = e.currentTarget.id;
            getRequestList();
        });

        $('.prev').on('click', (e) => {
            console.log('prev : ');

            currentPage = currentPage - 1;
            getRequestList();
        });

        $('.after').on('click', (e) => {
            console.log(e.currentTarget.id);

            currentPage += 1;
            getRequestList();
        });
    }
});

// function pagination(buttonClick) {
//     buttons = <div id="pagination"></div>;

//     $('.sq').on('click', (e) => {
//         buttonClick();
//     });
//     return buttons;
// }
