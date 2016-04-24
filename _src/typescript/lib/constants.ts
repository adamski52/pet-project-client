export var CONSTANTS = {
    API_BASE_URL: window.location.href.indexOf("localhost") > -1 ? "http://localhost:8000/api/" : "/storybook/api/",
    ALERT_TYPES: {
        ERROR: "danger",
        SUCCESS: "success",
        INFO: "info",
        WARNING: "warning"
    },
    TOKEN_NAME: "sessionid",
    CSRF_NAME: "csrftoken",
    getURL: function(name:string, unique?:boolean) {
        let url = this.API_BASE_URL + name;
        if(unique) {
            url += "?" + new Date().getTime();
        }
        else {
            url += "/"
        }

        return url;
    }
};