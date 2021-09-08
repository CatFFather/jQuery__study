// 페이징 처리를 위한 변수 선언
let current_page = 1; // 현재 페이지
let limitButtonCount = 5; // 최대 버튼 갯수
let initCalculator = limitButtonCount - 2; // 버튼의 시작을 계산 할때 사용 (최대 버튼 갯수 - 2)

/**
 *
 * @param {*} pagination // 리스트 호출 후 받아온 페이지 정보
 * @param {*} getList   // 버튼 클릭 시 다시 갱신할 리스트
 */
function commonPagination(pagination, getList) {
    current_page = pagination.current_page; // 현재 페이지 갱신
    const pageBtnCount = Math.ceil(pagination.total_count / pagination.page_size); // 버튼 갯수
    $('#pagination').empty();

    $('#pagination').append(`
        <button class="pageBtn__ect" data-currentPage=${1}><img src="/imgs/chevron-left_fin.png"/></button>
    `);
    $('#pagination').append(`
        <button class="pageBtn__ect" data-currentPage=${current_page - 1}><img src="/imgs/chevron-left.png"/></button>
    `);

    // 조건1. 현재 페이지가 최대 버튼 갯수 보다 작으면 i의 시작은 1,
    // 조건2. 현재 페이지가 최대 버튼 갯수 보다 같거나 클때 i의 시작은 현재 페이지의 - initCalculator
    for (let i = current_page < limitButtonCount ? 1 : current_page >= limitButtonCount ? current_page - initCalculator : ''; i <= pageBtnCount; i++) {
        if ($('.pageBtn__normal').length < limitButtonCount) {
            $('#pagination').append(`
            <button class="pageBtn__normal ${i == current_page ? 'pageBtn__current_page' : ''}" data-currentPage=${i}>${i}</button>
        `);
        }
    }
    $('#pagination').append(`
        <button class="pageBtn__ect" data-currentPage=${current_page + 1}><img src="/imgs/chevron-right.png"/></button>
    `);
    $('#pagination').append(`
        <button class="pageBtn__ect" data-currentPage=${pageBtnCount}><img src="/imgs/chevron-right_fin.png"/></button>
    `);

    // 버튼 이벤트 부여
    $('.pageBtn__ect , .pageBtn__normal').on('click', (e) => {
        if (e.currentTarget.dataset.currentpage <= 0) return;
        if (e.currentTarget.dataset.currentpage > pageBtnCount) return;
        current_page = e.currentTarget.dataset.currentpage;
        getList(current_page);
    });
}
export { commonPagination };
