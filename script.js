let template = "";
let repository = "";
let username = "";

chrome.storage.onChanged.addListener((changes) => {
    for (let [key, { newValue }] of Object.entries(changes)) {
        if (key === "template") template = newValue;
        if (key === "repository") repository = newValue;
        if (key === "username") username = newValue;
    }
});

chrome.tabs.onUpdated.addListener((tabId, info, tab) => {
    const { status } = info;
    const { url } = tab;
    if (username && repository && template) {
        const isPR = new RegExp(`github.com/${username}/${repository}/compare`).test(url);
        if (isPR && status === "complete" && !/template=/.test(url)) {
            console.log("match RegExp");
            const hashStart = url.indexOf("#") === -1 ? url.length : url.indexOf("#");
            const querySymbol = url.indexOf("?") === -1 ? "?" : "&";
            const customParam = encodeURI(`template=${template}`);
            const newUrl =
                url.substring(0, hashStart) +
                querySymbol +
                customParam +
                url.substring(hashStart);
            chrome.tabs.update(tabId, { url: newUrl });
        } else {
            console.log("not match RegExp");
        }
    }
});
