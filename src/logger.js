var ColorConstant = require('./colorConstants');

module.exports = {
    logNotify: function (msg) {
        console.log("\n" + ColorConstant.FOREGROUND_CYAN + " " + msg + ColorConstant.RESET);
    },
    logInfo: function (msg) {
        console.log("\n" + ColorConstant.FOREGROUND_GREEN + " " + msg + ColorConstant.RESET);
    },
    logSuccess: function (msg) {
        console.log("\n" + ColorConstant.FOREGROUND_GREEN + " " + msg + ColorConstant.RESET);
    },
    logWarning: function (msg) {
        console.log("\n" + ColorConstant.FOREGROUND_YELLOW + " " + msg + ColorConstant.RESET);
    },
    logError: function (msg) {
        console.log("\n" + ColorConstant.BACKGROUND_RED + " " + msg + ColorConstant.RESET);
    }
};