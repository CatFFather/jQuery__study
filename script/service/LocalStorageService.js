/**
 * LocalStorageService
 *
 * get, set, callback when set
 */

const LocalStorageService = (function () {
    const deviceIdKey = 'UUID';
    const deviceTypeKey = 'device_type';
    const appPackageKey = 'app-package-name';
    const appVersionKey = 'appVersion';
    const accessTokenKey = 'access-token';
    const refreshTokenKey = 'refresh-token';
    const logedInKey = 'logedIn';
    const userInfo = 'user-info';
    const observers = [];

    function _getDevice() {
        return {
            id: localStorage.getItem(deviceIdKey),
            type: localStorage.getItem(deviceTypeKey),
            packageName: localStorage.getItem(appPackageKey),
            appVersion: localStorage.getItem(appVersionKey),
        };
    }

    function _setDevice(obj) {
        localStorage.setItem(deviceIdKey, obj.id);
        localStorage.setItem(deviceTypeKey, obj.type);
        localStorage.setItem(appPackageKey, obj.packageName);
        localStorage.setItem(appVersionKey, obj.appVersion);
    }

    function _addTokenObserver(_cb) {
        observers.push(_cb);
        return observers.length - 1;
    }

    function _setToken(token) {
        localStorage.setItem(accessTokenKey, token.access);
        localStorage.setItem(refreshTokenKey, token.refresh);

        observers.forEach((element) => {
            if (element) element();
        });
    }

    function _getAccessToken() {
        return localStorage.getItem(accessTokenKey);
    }

    function _getRefreshToken() {
        return localStorage.getItem(refreshTokenKey);
    }

    function _clearToken() {
        localStorage.removeItem(accessTokenKey);
        localStorage.removeItem(refreshTokenKey);
        localStorage.removeItem(logedInKey);
    }

    // 유저 정보 가저오기
    function _getUserInfo() {
        return JSON.parse(localStorage.getItem(userInfo));
    }

    // 유저 정보 로컬에 저장
    function _setUserInfo(param) {
        localStorage.setItem(userInfo, JSON.stringify(param));
    }
    // 유저 정보 삭제
    function _clearUserInfo() {
        localStorage.removeItem(userInfo);
    }

    return {
        getDevice: _getDevice,
        setDevice: _setDevice,
        addTokenObserver: _addTokenObserver,
        setToken: _setToken,
        getAccessToken: _getAccessToken,
        getRefreshToken: _getRefreshToken,
        clearToken: _clearToken,
        getUserInfo: _getUserInfo,
        setUserInfo: _setUserInfo,
        clearUserInfo: _clearUserInfo,
    };
})();

export default LocalStorageService;
