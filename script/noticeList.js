import { getNoticeList } from './service/commons.js';
import { formatDate } from './util.js';
import { commonPagination } from '../common/js/pagination.js'; // 페이징 처리

$(() => {
    getList();
});

function getList(current_page) {
    const params = {
        target: '{ALL,CARCENTER}',
        view: 'true',
        page: current_page ? current_page : 1,
        page_size: 10,
    };
    getNoticeList(params).then((req) => {
        const notices = req.data.results;
        const pagination = req.meta.page;

        $('.notice__list__table').empty();
        $('.notice__list__table').append(`
            <tr class="notice__tr__black">
                <td align="center">번호</td>
                <td align="center">제목</td>
                <td align="center">등록일</td>                    
            </tr>        
        `);

        notices.forEach((notice) => {
            $('.notice__list__table').append(`
                <tr data-seq = ${notice.seq} >
                    <td align="center">${notice.seq}</td>
                    <td>${notice.subject}</td>
                    <td align="center">${formatDate(notice.created)}</td>
                </tr>   
            `);
        });
        // tr 클릭시 seq값을 쿼리스트링에 넣어서 보내주기
        $('.notice__list__table tr').on('click', (e) => {
            const seq = e.currentTarget.dataset.seq;
            if (seq) location.href = `noticeDetail.html?detail=${seq}`;
        });

        // 페이징 처리
        commonPagination(pagination, getList);
    });
}
