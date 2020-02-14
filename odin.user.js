// ==UserScript==
// @name         Auto-refresh for ODIN
// @version      1
// @description  Auto-refresh for ODIN - Hallelujah!
// @author       Dariusz Goc
// @require      https://odin.crm11.dynamics.com/_static/_common/scripts/jquery-2.1.1.min.js
// @match        http*://odin.crm11.dynamics.com/*
// ==/UserScript==

var settings = {
    "refresh-queues-every-x-seconds": 15
};

// DO-NOT EDIT BELLOW THIS LINE

(function($) {
    'use strict';

    $(document).ready(function(){
        const promptUserSettings = function(e){
            if(e.which == 3){
                let oldRefreshInterval = (localStorage["refresh-queues-every-x-seconds"]) ? localStorage["refresh-queues-every-x-seconds"] : settings["refresh-queues-every-x-seconds"];
                let newRefreshInterval = prompt("How often do you want to refresh the Queues (in seconds)?", oldRefreshInterval);
                if(/^\d*$/.test(newRefreshInterval)){
                    localStorage["refresh-queues-every-x-seconds"] = newRefreshInterval;
                    console.log("Auto-refresh changed Refresh Interval setting to " + newRefreshInterval + " s");
                    initRefresh();
                } else {
                    alert("That has to be a number! Setting reset to " + oldRefreshInterval + " s");
                }
            }
        }

        $("a#refreshButtonLink").mousedown(promptUserSettings);

        const refreshAutomatically = function(){
            if($(".ms-crm-List-SelectedRow").length == 0){
                $("a#refreshButtonLink")[0].click();
                console.log("Auto-refresh refreshed (" + (new Date()).getSeconds() + ")");
            }
        };

        const initRefresh = function(){
            if(typeof unsafeWindow.refreshIntervalHandle == "number"){
                clearInterval(unsafeWindow.refreshIntervalHandle);
                console.log("Auto-refresh de-initialized (" + unsafeWindow.refreshIntervalHandle + ")");
            }

            if(localStorage["refresh-queues-every-x-seconds"]){
                settings["refresh-queues-every-x-seconds"] = parseInt(localStorage["refresh-queues-every-x-seconds"]);
            }
            unsafeWindow.refreshIntervalHandle = setInterval(refreshAutomatically, settings["refresh-queues-every-x-seconds"] * 1000);

            console.log("Auto-refresh initialized (" + unsafeWindow.refreshIntervalHandle + ")");
        };

        initRefresh();
    });
})(jQuery);
