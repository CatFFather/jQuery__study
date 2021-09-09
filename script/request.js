import LocalStorageService from './service/LocalStorageService.js';
const tokenString = LocalStorageService.getAccessToken(); // 토큰

let agent_parts = null; // 부품업체 아이디

$(() => {
    const autoMatching = $('#autoMatching');
    const selectMatching = $('#selectMatching');
    // 1. 매칭 토글 버튼
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
        $('#agent_parts').on('keyup', getAgentPartsAutocomplete);
    });

    // 2. 보험사 기준정보 받아오기
    getInsuranceList();

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
function getAgentPartsAutocomplete(params) {
    const keyword = $('#agent_parts').val();
    if (!keyword) return;
    const filter = {
        keyword: keyword,
        activate: 'ACTIVE',
    };
    $.ajax({
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'JWT ' + tokenString,
        },
        type: 'get',
        url: `http://app1.in.delphicom.net:9000/api/agent/parts/autocomplete`,
        dataType: 'json',
        data: filter,
        success: function (response) {
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
            } else {
                $('.autocomplete__wrap').remove();
            }
        },
        error: function (e) {
            $('.autocomplete__wrap').remove();
        },
    });
}
// autocomplete keyword 색 변경
function keywordColor(keyword, agentInfo) {
    const newKeyword = agentInfo.name.replaceAll(
        keyword,
        `<span class="autocomplete__item color__red" data-name=${agentInfo.name} data-id=${agentInfo.id}>${keyword}</span>`
    );
    return newKeyword;
}

// 2. 보험사 기준정보 받아오기
function getInsuranceList() {
    const select__wrap = $('.select__wrap');
    $.ajax({
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'JWT ' + tokenString,
        },
        type: 'get',
        url: `http://app1.in.delphicom.net:9000/api/standard/insurance-company?able=true`,
        dataType: 'json',
        success: function (response) {
            const results = response.data;
            results.forEach((result) => {
                select__wrap.append(`
                <option value=${result.id}>${result.name}</option>
                `);
            });
        },
        error: function () {
            alert('보험사 기준정보 get 실패');
        },
    });
}

// 3. 차대번호 사진 등록
function setVehicleImg() {
    const vehicle_id_img = $('#vehicle_id_img');
    const request__row5 = $('.request__row5');
    const imgUrl = window.URL.createObjectURL(vehicle_id_img[0].files[0]);
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
        console.log(img__delete__btn);
        $('.request__preview__img__root').remove();
    });
}

// 4. 차량사진 등록
function setPictures() {
    const pictures = $('#pictures');
    const imgFiles = [...pictures[0].files];
    const car__pictures__wrap = $('.car__pictures__wrap');
    const request__row7 = $('.request__row7');
    request__row7.empty();
    request__row7.append(`<span class="car__pictures__count">${pictures[0].files.length}</span> / 20`);

    $('.car__pictures__preview__img__wrap').remove();

    imgFiles.forEach((imgFile, index) => {
        const imgUrl = window.URL.createObjectURL(imgFile);
        car__pictures__wrap.append(`
            <div class="car__pictures__preview__img__wrap" data-key=${imgFile.lastModified}>
                <img class="car__pictures__preview__img" src="${imgUrl}"/>
                <img class='car__pictures__img__delete__btn' data-key=${imgFile.lastModified} src="/imgs/btn_delete_bg.png"/>
            </div>
        `);
    });

    // 삭제 버튼 기능(보완 필요--> files 값이 안바뀜 )
    const car__pictures__img__delete__btn = $('.car__pictures__img__delete__btn');

    car__pictures__img__delete__btn.on('click', (event) => {
        const dataset__key = event.target.dataset.key;
        [...$('.car__pictures__preview__img__wrap')].forEach((wrap) => {
            if (dataset__key == wrap.dataset.key) {
                console.log(wrap);
                wrap.remove();
            }
        });
        // console.log(dataset__key);
        // console.log(pictures[0].files);
        // const dataTranster = new DataTransfer();
        // const files = Array.from(pictures[0].files);
        // console.log(files);
        // const filterImgFiles = imgFiles.filter((file) => {
        //     return file.lastModified != dataset__key;
        // });
        // filterImgFiles.forEach((file) => {
        //     console.log(file);
        //     dataTranster.items.add(file);
        // });
        // console.log(dataTranster);

        // pictures[0].files = dataTranster.files;
        // console.log(pictures);
    });
}
// 5. 이미지 업로드
function imgUpload(imgs, type) {
    const formData = new FormData();
    formData.append('files', imgs);
    formData.append('files_type', type);
    return $.ajax({
        headers: {
            Authorization: 'JWT ' + tokenString,
        },
        type: 'post',
        url: `http://app1.in.delphicom.net:9000/api/files/upload`,
        dataType: 'json',
        data: formData,
        contentType: false, // FormData 보낼 때 false로 보내줘야함
        processData: false, // FormData 보낼 때 false로 보내줘야함
        success: function (response) {
            const result = response.data.files;
            return result;
        },
        error: function () {
            alert('사진 업로드 실패');
        },
    });
}

// 6. 부품 요청
async function partsRequest() {
    console.log('부품사 매칭 요청');
    const car_number = $('#car_number').val();
    const car_model = $('#car_model').val();
    const insurance = $('#insurance').val();
    const filing_number = $('#filing_number').val();
    const warehousing = $('#warehousing').val();
    let match_type = null;
    const autoMatching = $('#autoMatching');
    const selectMatching = $('#selectMatching');
    const vehicle_id_img = $('#vehicle_id_img')[0].files;
    const pictures = $('#pictures')[0].files;
    let vehicle_id_imgURL = null; // 차대번호 업로드 후 URL
    let pictureURL = []; // 차량사진 업로드 후 URL

    // match_type 분기
    if (autoMatching.hasClass('button__normal__toggle') == true) {
        match_type = 'MANUAL';
    } else {
        match_type = 'AUTO';
    }

    // 차대번호 사진 있는지 확인
    if (vehicle_id_img.length > 0) {
        try {
            const uploadResult = await imgUpload(vehicle_id_img[0], 'VEHICLE');
            vehicle_id_imgURL = uploadResult.data.files;
            console.log(vehicle_id_imgURL);
        } catch (e) {
            console.log(e);
        }
    }
    // 차량사진 있는지 확인
    if (pictures.length > 0) {
        for (const picture of pictures) {
            try {
                const uploadResult = await imgUpload(picture, 'PARTS_REQ');
                pictureURL.push(uploadResult.data.files[0]);
            } catch (e) {
                console.log(e);
            }
        }
        console.log(pictureURL);
    }
    // 차량사진 URL을 param 타입으로 만들어주기
    let newPictureURL = null;
    if (pictureURL.length > 0) {
        newPictureURL = pictureURL.map((img, index) => {
            return { image: img };
        });
    }
    console.log(newPictureURL);

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
