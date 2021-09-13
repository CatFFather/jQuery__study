import LocalStorageService from './service/LocalStorageService.js';

import { getInsuranceList } from './service/standard.js';
import { getAgentPartsAutocomplete } from './service/agent.js';
import { partsRequestService } from './service/parts-request.js';
import { fileUpload } from './service/file.js';

let vehicle_id_imgFile = []; // 사진 업로드 시 파라미터로 넘길 차대번호 사진
let carImgFiles = []; // 사진 업로드 시 파라미터로 넘길 차량 사진
let vehicle_id_imgURL = null; // 차대번호 업로드 후 URL
let pictureURL = []; // 차량사진 업로드 후 URL
let agent_parts = null; // 부품업체 아이디

$(() => {
    // 사고차량 입고일자 오늘 날짜로 default 값으로 지정
    document.getElementById('warehousing').valueAsDate = new Date();

    // 1. 매칭 토글 버튼
    const autoMatching = $('#autoMatching'); // 업체 선택 방식 버튼 element (자동매칭 버튼)
    const selectMatching = $('#selectMatching'); // 업체 선택 방식 버튼 element (직접선택 버튼)
    const request__row4 = $('.request__row4');
    $(autoMatching).on('click', () => {
        autoMatching.removeClass('button__normal__toggle');
        selectMatching.addClass('button__normal__toggle');
        $('#agent_parts__wrap').remove();
        agent_parts = null;
    });
    $(selectMatching).on('click', () => {
        autoMatching.addClass('button__normal__toggle');
        selectMatching.removeClass('button__normal__toggle');
        $('#agent_parts__wrap').remove();
        agent_parts = null;
        // 업체명 검색 autocomplete 추가
        request__row4.append(`
        <div class="input__wrap" id="agent_parts__wrap">
            <input class="input__normal color__red" type="text" placeholder="업체명을 검색해주세요." id='agent_parts'>
        </div>
        `);
        $('#agent_parts').on('keyup', agentPartsAutocomplete);
    });

    // 2. 보험사 기준정보 받아오기
    getInsuranceList().then((response) => {
        const select__wrap = $('.select__wrap');
        const results = response.data;
        results.forEach((result) => {
            select__wrap.append(`
            <option value=${result.id}>${result.name}</option>
            `);
        });
    });

    // 3. 차대번호 사진 등록
    const vehicle_id_img = $('#vehicle_id_img');
    vehicle_id_img.on('change', setVehicleImg);

    // 4. 차량사진 등록
    const pictures = $('#pictures');
    pictures.on('change', setPictures);

    // 5. 매칭 버튼 클릭 -->부품 요청 함수 호출
    $('.request__row9').on('click', partsRequest);
});

// 1. 직접선택 시 Autocomplete
function agentPartsAutocomplete() {
    const keyword = $('#agent_parts').val();
    if (!keyword) return;
    const filter = {
        keyword: keyword,
        activate: 'ACTIVE',
    };
    getAgentPartsAutocomplete(filter).then((response) => {
        const results = response.data;
        if (results.length > 0) {
            $('.autocomplete__wrap').remove();
            $('#agent_parts__wrap').append(`<div class="autocomplete__wrap"></div>`);
            results.forEach((result) => {
                $('.autocomplete__wrap').append(`
                <div class="autocomplete__item">
                    <span class="autocomplete__name" data-name=${result.name} data-id=${result.id}>
                        ${keywordColor(keyword, result)}
                    </span>
                    <span class="autocomplete__address">${result.agent_parts.address}</span>
                </div>`);
            });
            $('.autocomplete__name').on('click', (e) => {
                console.log(e);
                $('#agent_parts').val(e.target.dataset.name);
                agent_parts = e.target.dataset.id;
                console.log(agent_parts);
                $('.autocomplete__wrap').remove();
            });
        }
        // else {
        //     // $('.autocomplete__wrap').remove();
        // }
    });
}
// 2. autocomplete keyword 색 변경
function keywordColor(keyword, agentInfo) {
    const newKeyword = agentInfo.name.replaceAll(
        keyword,
        `<span class="autocomplete__item color__red" data-name=${agentInfo.name} data-id=${agentInfo.id}>${keyword}</span>`
    );
    return newKeyword;
}

// 3. 차대번호 사진 등록
function setVehicleImg() {
    const vehicle_id_img = $('#vehicle_id_img');
    console.log(vehicle_id_img[0].files[0]);
    vehicle_id_imgFile.push(vehicle_id_img[0].files[0]);
    const request__row5 = $('.request__row5');
    const imgUrl = window.URL.createObjectURL(vehicle_id_imgFile[0]);
    $('.request__preview__img__root').remove();
    request__row5.append(`
    <div class="request__preview__img__root">
        <div class="request__preview__img__wrap">
            <img class="request__preview__img" src="${imgUrl}"/>
            <img class='img__delete__btn' src="/imgs/btn_delete_bg.png"/>
        </div>
    </div>`);
    // 삭제 버튼 기능
    const img__delete__btn = $('.img__delete__btn');
    img__delete__btn.on('click', () => {
        $('.request__preview__img__root').remove();
        vehicle_id_imgFile = [];
    });
}

// 4. 차량사진 등록
function setPictures() {
    const pictures = $('#pictures');
    carImgFiles = [...pictures[0].files];
    console.log(carImgFiles);
    const car__pictures__wrap = $('.car__pictures__wrap');
    const request__row7 = $('.request__row7');
    request__row7.html(`<span class="car__pictures__count">${carImgFiles.length}</span> / 20`);

    $('.car__pictures__preview__img__wrap').remove();

    carImgFiles.forEach((imgFile, index) => {
        const imgUrl = window.URL.createObjectURL(imgFile);
        car__pictures__wrap.append(`
            <div class="car__pictures__preview__img__wrap" data-key=${imgFile.lastModified}>
                <img class="car__pictures__preview__img" src="${imgUrl}"/>
                <img class='car__pictures__img__delete__btn' data-key=${imgFile.lastModified} src="/imgs/btn_delete_bg.png"/>
            </div>
        `);
    });

    // 삭제 버튼 기능
    const car__pictures__img__delete__btn = $('.car__pictures__img__delete__btn');

    car__pictures__img__delete__btn.on('click', (event) => {
        const dataset__key = event.target.dataset.key;
        [...$('.car__pictures__preview__img__wrap')].forEach((wrap, index) => {
            if (dataset__key == wrap.dataset.key) {
                wrap.remove();
                carImgFiles = carImgFiles.filter((imgFile) => {
                    return imgFile != carImgFiles[index];
                });
            }
        });
        request__row7.html(`<span class="car__pictures__count">${carImgFiles.length}</span> / 20`);
    });
}
// 5. 이미지 업로드
function imgUpload(imgs, type) {
    const formData = new FormData();
    formData.append('files', imgs);
    formData.append('files_type', type);
    return fileUpload(formData);
}

// 6. 부품 요청
async function partsRequest() {
    console.log('부품사 매칭 요청');
    const car_number = $('#car_number').val(); // 사고차 번호
    const car_model = $('#car_model').val(); // 차종
    const insurance = $('#insurance').val(); // 보험사
    const filing_number = $('#filing_number').val(); // 접수번호
    const warehousing = $('#warehousing').val(); // 사고차량 입고일자
    let match_type = null; // 업체 선택 방식
    const autoMatching = $('#autoMatching'); // 업체 선택 방식 버튼 element (자동매칭 버튼)

    // match_type 분기
    if (autoMatching.hasClass('button__normal__toggle') == true) {
        match_type = 'MANUAL';
    } else {
        match_type = 'AUTO';
    }

    // 차대번호 사진 있는지 확인
    if (vehicle_id_imgFile.length > 0) {
        try {
            const uploadResult = await imgUpload(vehicle_id_imgFile[0], 'VEHICLE');
            vehicle_id_imgURL = uploadResult.data.files;
            console.log(vehicle_id_imgURL);
        } catch (e) {
            console.log(e);
        }
    }
    // 차량사진 있는지 확인
    if (carImgFiles.length > 0) {
        for (const picture of carImgFiles) {
            try {
                const uploadResult = await imgUpload(picture, 'PARTS_REQ');
                pictureURL.push(uploadResult.data.files[0]);
            } catch (e) {
                console.log(e);
            }
        }
    }
    // 차량사진 URL을 param 타입으로 만들어주기
    let newPictureURL = null;
    if (pictureURL.length > 0) {
        newPictureURL = pictureURL.map((img, index) => {
            return { image: img };
        });
    }

    // 유저정보 가져오기
    let userInfo = LocalStorageService.getUserInfo();
    // Date 타입 param에 맞추기 (시간 필요)
    const newWarehousing = new Date(warehousing);
    const params = {
        agent_parts: agent_parts ? { id: agent_parts } : null,
        car_number: car_number,
        car_model: car_model,
        insurance: insurance,
        filing_number: filing_number,
        warehousing: newWarehousing,
        match_type: match_type,
        req_agent: userInfo.member_agent.agent.id,
        status: 'REQUEST',
        vehicle_id_img: vehicle_id_imgURL && vehicle_id_imgURL[0] && vehicle_id_imgURL[0],
        pictures: newPictureURL,
    };
    if (params.agent_parts == null) {
        delete params.agent_parts;
    }
    // 부품 요청
    partsRequestService(params);
}
