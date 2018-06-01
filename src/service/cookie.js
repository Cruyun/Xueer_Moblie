// 设置cookie
function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  exdays = exdays || 365;
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  const expires = "expires=" + d.toUTCString() + ";path = /";
  document.cookie = cname + "=" + cvalue + "; " + expires;
}
// 获取cookie
function getCookie(cname) {
  const name = cname + "=";
  const ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") c = c.substring(1);
    if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
  }
  return "";
}
// 清除cookie
function clearCookie(name) {
  setCookie(name, "", -1);
}

// 删除cookie
function delCookie(name) {
  const exp = new Date();
  exp.setTime(exp.getTime() - 1);
  const cval = getCookie(name);
  if (cval != null)
    document.cookie =
      name + "=" + cval + ";expires=" + exp.toGMTString() + ";path = /";
}

function checkCookie(val) {
  const key = getCookie(val);
  if (key) {
    return key;
  }
  return false;
}

function getQueryString(name) {
  const reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
  const r = window.location.search.substr(1).match(reg);
  if (r != null) return unescape(r[2]);
  return null;
}

const cookie = {
  setCookie,
  getCookie,
  clearCookie,
  checkCookie,
  getQueryString,
  delCookie
};

function getToken() {
  if (cookie.getCookie("token")) {
    const token = window.btoa(cookie.getCookie("token") + ":");
    const auth = { Authorization: "Basic " + token };
    return auth;
  }
  return {};
}

cookie.getToken = getToken;

module.exports = cookie;
