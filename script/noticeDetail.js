import { getNoticeDetail } from './service/commons.js';
import { formatDate, getUrlParams } from './util.js';

$(() => {
    getNoticeInfo();
});

// 공지사항 정보 가지고 오기
function getNoticeInfo() {
    const query = getUrlParams();
    getNoticeDetail(query.detail).then((res) => {
        const detail = res.data;
        $('.notice__detail').append(`
            <div class='notice__detail__header'>
                <span class="detail__subject">${detail.subject}</span>
                <span class="detail__created">${formatDate(detail.created)}</span>
            </div>
            <div class="detail__content">${detail.content}</div>
            <div class='detail__footer'>
                <button class='detail__listBtn'>목록</button>
            </div>
        `);
        $('.detail__listBtn').on('click', () => {
            history.back();
        });
    });
}
