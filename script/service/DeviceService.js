import LocalStorageService from './LocalStorageService.js';
// import { axiosInstance } from './axios/index';

/**
 * DeviceService
 *
 * 디바이스 정보 등록
 */
const DeviceService = (function () {
    /**
     * 디바이스 등록
     *
     * @param {function} cb
     */

    function regist(cb) {
        let device = LocalStorageService.getDevice();
        if (!device || !device.id) {
            console.log('did will regist device information.');
            console.log('최초 디바이스 등록 (uuid가 없을 때만 진행)');
            device = {
                id: 'FCF80B39-EB3E-44DC-B907-D788DF3D15A3',
                type: 'Windows',
                packageName: 'com.insurparts.insurance',
                appVersion: '1.0.0',
            };
            LocalStorageService.setDevice(device);
        }

        $.ajax({
            type: 'post',
            url: 'http://app1.in.delphicom.net:9000/api/device',
            dataType: 'json',
            data: {
                id: device.id,
                type: device.type,
                app_package: device.packageName,
                app_version: device.appVersion,
            },
            success: function (data) {
                console.log('서버에 디바이스 등록 성공(web이 실행 될때마다)');
                const results = data.data;
                console.log(results);
            },
            error: function () {
                alert('디바이스 등록 실패');
            },
        });
    }

    function get() {
        return LocalStorageService.getDevice();
    }

    return {
        regist: regist,
        get: get,
    };
})();

export default DeviceService;
