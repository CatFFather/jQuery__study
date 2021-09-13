import LocalStorageService from './LocalStorageService.js'; // 로컬 서비스
const tokenString = LocalStorageService.getAccessToken();

// 파일 업로드
function fileUpload(formData) {
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

export { fileUpload };
