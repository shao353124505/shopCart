/* eslint-disable no-undef */
import moment from "moment";
import Cookies from "js-cookie";
export default {
  SSO_URL: APIURL.SSO_URL, // "//app-uw-portalui-dev-vo.azurewebsites.net/ssologin?go=https://app-uw-portalui-dev-vo.azurewebsites.net/sg/index.html", // login  sso
  API_URL: APIURL.API_URL, //"/sg_mgmt/",  //API URL  local:/sg_mgmt/
  DOMAIN: APIURL.DOMAIN, //"//app-uw-portalui-dev-vo.azurewebsites.net/sg_mgmt/",   ////app-uw-portalui-dev-vo.azurewebsites.net/sg_mgmt/

  UTCTimeStamp(timeRange, unit) {
    //var now = new Date(time);
    // let timezone =
    //   Cookies.get("timezone") === undefined ? "+8" : Cookies.get("timezone");
    return moment()
      .utcOffset(new Date().getTimezoneOffset())
      .subtract(timeRange, unit)
      .unix();
  },
  getStartTime(timeRange) {
    let time = 1;
    let unit = "";
    if (timeRange == 0) {
      unit = "day";
    } else if (timeRange == 1) {
      unit = "week";
    } else if (timeRange == 2) {
      time = 30;
      unit = "day";
    } else if (timeRange == 3) {
      //TODO  customized time
      time = 0;
      unit = "hours";
    }
    let startTime = this.UTCTimeStamp(time, unit);
    return startTime;
  },

  get_date_time_from_unix_timestamp(time) {
    let date = new Date(parseInt(time) * 1000);
    if (isNaN(date.getTime())) {
      return new Date();
    }
    return date;
  },

  get_unix_timestamp(time) {
    let date = new Date(time);
    if (!isNaN(date.getTime())) {
      return parseInt(date.getTime() / 1000);
    }
    return null;
  },

  getCurrentTime() {
    return this.UTCTimeStamp(0, "day");
  },

  //2020-02-04T10:04:02Z
  getFormatTime(timestamp) {
    let d = new Date(
      this.get_date_time_from_unix_timestamp(timestamp)
    ).toISOString();
    return d.slice(0, d.length - 5) + "Z";
  },

  //2020-02-04T10:04:02.452Z
  getFormatLogTime(timestamp) {
    return new Date(
      this.get_date_time_from_unix_timestamp(timestamp)
    ).toISOString();
    //moment.unix(timestamp).utc().format('YYYY-MM-DDTHH:mm:ss.SSS')+'Z';
  },

  downloadFile(fileType, content, fileName) {
    let userAgent = navigator.userAgent;
    let isIE =
      userAgent.indexOf("compatible") > -1 || userAgent.indexOf("MSIE") > -1;
    let isIE11 =
      userAgent.indexOf("Trident") > -1 && userAgent.indexOf("rv:11.0") > -1;
    //Add BOM Header for UTF-8 string
    if (fileType.includes("utf-8")) {
      content = "\uFEFF" + content;
    }
    if (isIE || isIE11) {
      if (window.navigator.msSaveBlob) {
        try {
          let blob = new Blob([content], {
            type: fileType
          });
          window.navigator.msSaveBlob(blob, fileName);
        } catch (e) {
          console.log(e);
        }
      } else {
        console.log(`Unsupported IE version`);
      }
    } else {
      let a = document.createElement("a");
      let event = new MouseEvent("click");
      a.download = fileName;
      a.style.display = "none";
      a.href = fileType + "," + encodeURIComponent(content);
      a.dispatchEvent(event);
    }
  }
};
