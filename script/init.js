export default window.goToPath = (path) => {
    // const locationPath = $(location).attr('pathname');
    // console.log(locationPath);
    // locationPath.indexOf('page') !== -1
    alert(path);
    location.href = path;
};

// 모바일 판단 (나중에 웹뷰인지 웹인지 판단도 가능 )
const isMobile = detectMobileDevice(window.navigator.userAgent);
function detectMobileDevice(agent) {
    const mobileRegex = [/Android/i, /iPhone/i, /iPad/i, /iPod/i, /BlackBerry/i, /Windows Phone/i];

    return mobileRegex.some((mobile) => agent.match(mobile));
}
function goToUrl() {
    window.open('https://play.google.com/store/apps/details?id=com.insurparts.repair_shop');
}

$(() => {
    if (isMobile) {
        console.log('current device is mobile');
        // $('body').css('height', 'initial');
        $('body').append(`
            <div class="app__guide__modal">
                <div class="app__guide__wrap">
                    <img src="/imgs/logo_auto_service_center.png"/>
                    <p class="app__guide__info">"회원가입하면 첫이용 </br>
                        10,000원 쿠폰 준대요!"
                    </p>
                    <button class="app__guide__button">앱에서 보기</button>
                    <p class="app__guide__close">괜찮아요. 오늘은 그냥 볼게요.</p>
            </div>`);
        $('.app__guide__button').on('click', goToUrl);
        $('.app__guide__close').on('click', () => {
            $('.app__guide__modal').remove();
        });
    } else {
        console.log('current device is not mobile');
    }
});
