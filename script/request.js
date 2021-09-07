import LocalStorageService from './service/LocalStorageService.js';
$(() => {
    const autoMatching = $('#autoMatching');
    const selectMatching = $('#selectMatching');
    // 매칭 토글 버튼
    $(autoMatching).on('click', () => {
        autoMatching.removeClass('button__normal__toggle');
        selectMatching.addClass('button__normal__toggle');
    });
    $(selectMatching).on('click', () => {
        autoMatching.addClass('button__normal__toggle');
        selectMatching.removeClass('button__normal__toggle');
    });

    // 차대번호 사진 등록
    const vehicle_id_img = $('#vehicle_id_img');
    vehicle_id_img.on('change', () => {
        const request__row5 = $('.request__row5');
        const imgUrl = window.URL.createObjectURL(vehicle_id_img[0].files[0]);
        console.log(imgUrl);
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
    });

    // 차량사진 등록
    const pictures = $('#pictures');
    pictures.on('change', () => {
        const imgFiles = [...pictures[0].files];
        console.log(imgFiles);
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
            console.log(dataset__key);
            console.log(pictures[0].files);
            const dataTranster = new DataTransfer();
            const files = Array.from(pictures[0].files);
            console.log(files);
            const filterImgFiles = imgFiles.filter((file) => {
                return file.lastModified != dataset__key;
            });
            filterImgFiles.forEach((file) => {
                console.log(file);
                dataTranster.items.add(file);
            });
            console.log(dataTranster);

            pictures[0].files = dataTranster.files;
            console.log(pictures);
        });
    });

    // 매칭 버튼 클릭
    $('.request__row9').on('click', () => {
        console.log('부품사 매칭 요청');
        const car_number = $('#car_number').val();
        const car_model = $('#car_model').val();
        const insurance = $('#insurance').val();
        const filing_number = $('#filing_number').val();
        const warehousing = $('#warehousing').val();
        let match_type = null;
        const autoMatching = $('#autoMatching');
        const selectMatching = $('#selectMatching');
        const vehicle_id_img = $('#vehicle_id_img')[0].files[0];
        const pictures = $('#pictures')[0].files[0];
        console.log('car_number', car_number);
        console.log('car_model', car_model);
        console.log('insurance', insurance);
        console.log('filing_number', filing_number);
        console.log('warehousing', warehousing);
        console.log('autoMatching', autoMatching);
        console.log('selectMatching', selectMatching);
        console.log('vehicle_id_img', vehicle_id_img);
        console.log('pictures', pictures);
        console.log('autoMatchinghasClass', autoMatching.hasClass('button__normal__toggle'));
        console.log('selectMatching', selectMatching.hasClass('button__normal__toggle'));
        if (autoMatching.hasClass('button__normal__toggle') == true) {
            match_type = 'MANUAL';
        } else {
            match_type = 'AUTO';
        }
        console.log(match_type);
        let tokenString = LocalStorageService.getAccessToken();
        let userInfo = LocalStorageService.getUserInfo();
        console.log(userInfo);
        const newWarehousing = new Date(warehousing);
        console.log(newWarehousing);
        const params = {
            car_number: car_number,
            car_model: car_model,
            insurance: insurance,
            filing_number: filing_number,
            warehousing: newWarehousing,
            match_type: match_type,
            req_agent: userInfo.member_agent.agent.id,
            status: 'REQUEST',
        };
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
    });
});
