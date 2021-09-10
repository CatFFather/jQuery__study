import { requestCancel } from '../../script/service/match.js';

/**
 *
 * @param {*} props  // 여러 props { match_id , getList() }
 */
function cancelModal(props) {
    $('body').append(`
            <div class='modal' data-modal='requestCancel'>
                <article class="modal__article">
                    <header class="modal__cancel__title__wrap">
                        <div style="width: 30px; height: 30px;"></div>
                        <h2>요청 취소</h2>
                        <img class="modal__cancel__closeBtn" src="/imgs/btn_close.png" />
                    </header>
                    <h3 class='modal__cancel__title'>취소 사유를 선택해 주세요.</h3>
                    <div>
                        <div class='radio__wrap'>
                            <label class='radio__label'>
                                <input class="radio__input"type="radio" name="requestCancel" value="요청 실수" checked />
                                요청 실수
                            </label>   
                        </div>
                        <div class='radio__wrap'> 
                            <label class='radio__label'>
                                <input class="radio__input"type="radio" name="requestCancel" value="원하는 부품을 가지고 있지 않음" />
                                원하는 부품을 가지고 있지 않음
                            </label>
                        </div>
                        <div class='radio__wrap'>
                            <label class='radio__label'>
                                <input class="radio__input"type="radio" name="requestCancel" value="배송 관련 문제가 있음" />
                                배송 관련 문제가 있음
                            </label>
                        </div>
                        <div class='radio__wrap'>
                            <label class='radio__label'>
                                <input class="radio__input"type="radio" name="requestCancel" value="서비스 불만족" />
                                서비스 불만족
                            </label>
                        </div>
                    </div>
                    <button class="button__normal" id="requestCencelBtn">확인<button/>
                </article>
            </div>
        `);

    // modal CSS
    $('.modal').css({
        position: 'absolute',
        zIndex: '9999',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        width: '100%',
        height: '100%',
        top: 0,
        left: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    });
    $('.modal__article').css({
        padding: '30px',
        backgroundColor: '#ffffff',
        borderRadius: '15px',
        width: '500px',
        height: '420px',
    });
    $('.modal__cancel__title__wrap').css({
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '30px',
    });
    $('.modal__cancel__closeBtn').css({
        paddingTop: '3px',
        cursor: 'pointer',
    });
    $('.modal__cancel__title').css({
        marginBottom: '30px',
    });

    // modal event
    // x 버튼 클릭 , hover 이벤트 부여
    $('.modal__cancel__closeBtn').on('click', () => {
        $('.modal').remove();
    });
    $('.modal__cancel__closeBtn').hover((e) => {
        if (e.type == 'mouseenter') {
            $('.modal__cancel__closeBtn').css({
                backgroundColor: 'rgba(0, 0, 0, 0.1)',
                borderRadius: '50%',
                transition: '300ms',
            });
        } else if (e.type == 'mouseleave') {
            $('.modal__cancel__closeBtn').css({
                backgroundColor: 'initial',
                transition: '300ms',
            });
        }
    });
    // modal 외곽 클릭시 창 닫기
    $('.modal').on('click', (e) => {
        if (e.target.dataset.modal == 'requestCancel') {
            $('.modal').remove();
        }
    });

    // 확인 버튼 클릭 시 취소 요청
    $('#requestCencelBtn').on('click', async () => {
        console.log('확인버튼 클릭');
        const params = {
            match_id: props.match_id,
            reason: $('input[name=requestCancel]:checked').val(),
        };
        try {
            await requestCancel(params);
            props.getList();
        } catch (e) {
            console.log(e);
        }
    });
}

export { cancelModal };
