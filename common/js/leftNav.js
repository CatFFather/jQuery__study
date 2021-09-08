import LocalStorageService from '../../script/service/LocalStorageService.js';

$(() => {
    $('.leftNav__img').on('click', goToList);
    $('.leftNav__request__list li').on('click', goToList);

    const path = $(location).attr('pathname');

    if (path.indexOf('requestList') !== -1) {
        $('.leftNav__request__list #REQUEST').css('color', '#db3e07');
    } else if (path.indexOf('confirm_orderList') !== -1) {
        $('.leftNav__request__list #CONFIRM_ORDER').css('color', '#db3e07');
    } else if (path.indexOf('complete_deliveryList') !== -1) {
        $('.leftNav__request__list #COMPLETE_DELIVERY').css('color', '#db3e07');
    } else if (path.indexOf('canceledList') !== -1) {
        $('.leftNav__request__list #CANCELED').css('color', '#db3e07');
    } else if (path.indexOf('request') !== -1) {
        $('.leftNav__request__title').css('color', '#db3e07');
    }
});

function goToList(event) {
    console.log(event);
    if (event.target.className == 'leftNav__img') {
        location.href = 'requestList.html';
    }
    if (event.target.className == 'leftNav__request__title') {
        location.href = 'request.html';
    }
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
