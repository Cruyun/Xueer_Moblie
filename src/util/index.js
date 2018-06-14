import Vue from "vue";
import Dialog from "../components/common/commonDialog";

export function encodeUrlParams(data) {
  return Object.keys(data)
    .map(key => {
      return [key, data[key]].map(encodeURIComponent).join("=");
    })
    .join("&");
}

export function getParameterByName(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[[\]]/g, "\\$&");
  const regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)");
  const results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return "";
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

export function showDialog(text, durition, callback) {
  /* eslint-disable no-new */
  new Vue({
    el: "#dialog",
    data() {
      return {
        show: true
      };
    },
    render: h => {
      return h(Dialog, {
        props: {
          show: true,
          durition: durition || 1500,
          text,
          onHide: callback
        }
      });
    }
  });
}
