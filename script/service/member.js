import { axiosInstance as axios } from './axios/index.js';
import qs from 'qs';

// 내 정보 조회
const myInfo = () => {
  const requestOptions = {
    method: 'GET',
    url: '/member/my',
  };
  return axios(requestOptions);
};
/**
 * 로그인
 *
 * @param {*} id 아이디
 * @param {*} pass 비밀번호
 * @returns
 */
const signInWithIdAndPassword = (id, pass) => {
  return axios.post('member/login', {
    device_id: localStorage.getItem('UUID'),
    target: 'TARGET_INSURANCE',
    id: id,
    password: pass,
  });
};
// 토큰갱신
const refreshToken = (refresh) => {
  console.log('---토큰 갱신 ---');
  const requestOptions = {
    method: 'POST',
    url: 'member/token/refresh',
    headers: { 'Content-type': 'application/json' },
    data: {
      refresh: refresh,
    },
  };
  return axios(requestOptions);
};

// member 목록
const getMember = (filter) => {
  const requestOptions = {
    method: 'GET',
    url: 'member',
  };
  return axios(requestOptions);
};

// 아이디 찾기
const memberFindId = (data) => {
  const requestOptions = {
    method: 'POST',
    url: 'member/find-id',
    headers: {
      'Content-Type': 'application/json',
    },
    data: JSON.stringify(data),
  };
  return axios(requestOptions);
};

// 비밀번호 재설정 (비밀번호 찾기)
const memberResetPw = (data) => {
  const requestOptions = {
    method: 'POST',
    url: 'member/reset-pw',
    headers: {
      'Content-Type': 'application/json',
    },
    data: JSON.stringify(data),
  };
  return axios(requestOptions);
};

// 회원가입 아이디 중복 체크
const getExists = (filter) => {
  const requestOptions = {
    method: 'GET',
    url: 'member/' + filter['id'] + '/exists',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  return axios(requestOptions);
};

// 보험사 회원 가입
const insuranceJoin = (data) => {
  const requestOptions = {
    method: 'POST',
    url: '/member/join/inurance-member',
    headers: {
      'Content-Type': 'application/json',
    },
    data: JSON.stringify(data),
    timeout: 10000,
  };
  return axios(requestOptions);
};

// 휴대폰번호 변경
const phoneNumModify = (data) => {
  const requestOptions = {
    method: 'POST',
    url: '/member/change-phone',
    headers: {
      'Content-Type': 'application/json',
    },
    data: JSON.stringify(data),
  };
  return axios(requestOptions);
};

// 비밀번호 변경 (내 정보에서 비밀변호 변경)
const passwordModify = (data) => {
  const requestOptions = {
    method: 'POST',
    url: '/member/change-pw',
    headers: {
      'Content-Type': 'application/json',
    },
    data: JSON.stringify(data),
  };
  return axios(requestOptions);
};

// 이름변경
const nameModify = (data) => {
  const requestOptions = {
    method: 'POST',
    url: '/member/change-name',
    headers: {
      'Content-Type': 'application/json',
    },
    data: JSON.stringify(data),
  };
  return axios(requestOptions);
};

// 보험사 직원 수정
const insuranceModify = (data) => {
  const requestOptions = {
    method: 'POST',
    url: '/member/change-insurance',
    headers: {
      'Content-Type': 'application/json',
    },
    data: JSON.stringify(data),
  };
  return axios(requestOptions);
};

// 휴대폰 번호 조회 (id로)
const getPhoneNumberByID = (userId) => {
  const requestOptions = {
    method: 'GET',
    url: `/member/${userId}/phone-number`,
  };
  return axios(requestOptions);
};

export default {
  myInfo, // 내 정보 조회
  signInWithIdAndPassword, // 로그인
  refreshToken, // 토큰 갱신
  getMember, // member 목록
  memberFindId, // 아이디 찾기
  memberResetPw, // 비밀번호 재설정
  getExists, // 회원가입 아이디 중복 체크
  insuranceJoin, // 보험사 회원 가입
  phoneNumModify, // 휴대폰번호 변경
  passwordModify, // 비밀번호 변경
  nameModify, // 이름변경
  insuranceModify, // 보험사 직원 수정
  getPhoneNumberByID, // 휴대폰 번호 조회 (id로)
};
