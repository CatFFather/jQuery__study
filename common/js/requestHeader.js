import LocalStorageService from '../../script/service/LocalStorageService.js';

$(() => {
    console.log('요청페이지 헤더');
    $('.request__header__title').on('click', goToList);
    const path = $(location).attr('pathname');
    console.log(path);

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
