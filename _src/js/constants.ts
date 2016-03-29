export var CONSTANTS = {
    apiBaseURL: window.location.href.indexOf("localhost") > -1 ? "http://localhost:8000/api/" : "/storybook/api/",
    forceUnique: function() {
        return "?" + new Date().getTime();
    },
    ALERT_TYPES: {
        ERROR: "error",
        SUCCESS: "success",
        INFO: "info",
        WARNING: "warning"
    }
};