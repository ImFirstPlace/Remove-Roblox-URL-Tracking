// ==UserScript==
// @name         Remove Roblox URL Tracking
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  Removes the newly implemented roblox URL tracking method that roblox injects in their links on their website.
// @author       ImFirstPlace
// @match        *://www.roblox.com/*
// @match        *://web.roblox.com/*
// @icon         https://www.google.com/s2/favicons?domain=roblox.com
// @downloadURL  https://github.com/ImFirstPlace/Remove-Roblox-URL-Tracking/raw/master/UserScript/remove-roblox-url-tracking.user.js
// @updateURL    https://github.com/ImFirstPlace/Remove-Roblox-URL-Tracking/raw/master/UserScript/remove-roblox-url-tracking.user.js
// @grant        none
// @run-at       document-start
// @noframes
// @license      GPL-3.0 License
// ==/UserScript==

// For some reason userscripts run multiple times on roblox so noframes is added

(function() {
    'use strict';

    const knownTrackingParams = [
        "gameSetTypeId",
        "homePageSessionInfo"
    ]


    function sanitizeURL(Url) {
        var urlSplit = Url.split("?")
        if (urlSplit.length >= 2) {
            for (const param of knownTrackingParams) {
                if (urlSplit[1].includes(param)) {
                    return urlSplit[0]
                }
            }
        }
        return false // Don't bother setting the url exact same thing!
    }

    function handleClick(e) {
        var a = e.target;

        while (a && !a.href) {
            a = a.parentElement;
        }

        if (!a) {
            return;
        }

        var realUrl = sanitizeURL(a.href)
        if (realUrl) {
            a.href = realUrl
        }
    }
    document.addEventListener('click', handleClick, true);
    document.addEventListener('mousedown', handleClick, true);
    document.addEventListener('touchstart', handleClick, true);
})();