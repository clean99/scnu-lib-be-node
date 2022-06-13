import { isAfter, isDate } from 'date-fns';

export const validateEmail = function (email: string) {
  const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

// 00:00
export const validateCollege = function (college: string) {
  const re = /^[0-9]{2}:[0-9]{2}$/;
  return re.test(college);
};

// (“XXX-XXXXXXX”、“XXXX-XXXXXXXX”、“XXX-XXXXXXX”、“XXX-XXXXXXXX”、"XXXXXXX"和"XXXXXXXX)
export const validatePhone = function (phone: string) {
  const re = /[1-9]\d{10}/;
  return re.test(phone);
};

// password 至少8-16个字符，至少1个大写字母，1个小写字母和1个数字，其他可以是任意字符
export const validatePassword = function (password: string) {
  const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,16}$/;
  return re.test(password);
};

export const validateDateAfter = function (x: string, y: string) {
  return isDate(new Date(x)) && isAfter(new Date(x), new Date(y));
};
