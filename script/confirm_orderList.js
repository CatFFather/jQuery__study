import { getRequestList } from './service/parts-request.js'; // 요청 리스트 api 호출
import { commonPagination } from '../common/js/pagination.js'; // 페이징 처리
import { cancelModal } from '../common/js/modal.js'; // 요청 취소 모달창
import { formatDate } from './util.js'; // 날짜 포멧

$(() => {
    getConfirm_orderList();
});

// 주문확정
function getConfirm_orderList(current_page) {
    const params = {
        status: 'CONFIRM_ORDER',
        page: current_page ? current_page : 1,
        page_size: 12,
        ordering: 'created',
    };
    getRequestList(params).then((response) => {
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
                        <div class="row7__button__item request__cancel" data-match_id="${request.parts_brok_matches[0].id}">요청취소</div>
                        <div class="divider"></div> 
                        <div class="row7__button__item"><img src="/imgs/icon_part.png">부품견적서</div></div>
                </div>
            `);
        });
        // 페이징 처리
        commonPagination(pagination, getConfirm_orderList);

        // 요청 취소 이벤트 부여 (modal 호출)
        $('.request__cancel').on('click', (e) => {
            const props = {
                match_id: e.currentTarget.dataset.match_id,
                getList: getConfirm_orderList,
            };
            cancelModal(props);
        });
    });
}
