$(() => {
    $('.request__header__title').on('click', goToList);

    // 각각 메뉴 pathname 을 이용하여 색칠해주기
    const path = $(location).attr('pathname');
    if (path.indexOf('requestList') !== -1) {
        $('.request__header__title__wrap #REQUEST').append(`<div class="title__border"></div>`);
    } else if (path.indexOf('confirm_orderList') !== -1) {
        $('.request__header__title__wrap #CONFIRM_ORDER').append(`<div class="title__border"></div>`);
    } else if (path.indexOf('complete_deliveryList') !== -1) {
        $('.request__header__title__wrap #COMPLETE_DELIVERY').append(`<div class="title__border"></div>`);
    } else if (path.indexOf('canceledList') !== -1) {
        $('.request__header__title__wrap #CANCELED').append(`<div class="title__border"></div>`);
    }
});

// 각각 필터 선택 시 해당 페이지 이동
function goToList(event) {
    console.log(event);
    if (event.target.id == 'REQUEST') {
        location.href = 'requestList.html';
    } else if (event.target.id == 'CONFIRM_ORDER') {
        location.href = 'confirm_orderList.html';
    } else if (event.target.id == 'COMPLETE_DELIVERY') {
        location.href = 'complete_deliveryList.html';
    } else if (event.target.id == 'CANCELED') {
        location.href = 'canceledList.html';
    }
}
