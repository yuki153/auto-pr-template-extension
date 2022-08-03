const usernameEl = document.getElementById("input-username");
const repositoryEl = document.getElementById("input-repository");
const templateEl = document.getElementById("input-template");

const errEl = document.getElementById("err");

const save = () => {
    const username = usernameEl.value;
    const repository = repositoryEl.value;
    const template = templateEl.value;
    if (username && repository && template) {
        chrome.storage.local.set({username, repository, template});
        if (!errEl.classList.contains("is-hide")) {
            errEl.classList.add("is-hide");
        }
    } else {
        errEl.classList.remove("is-hide");
    }
}

const load = () => {
    chrome.storage.local.get(['username', 'repository', 'template'], (item) => {
        usernameEl.value = item.username || "";
        repositoryEl.value = item.repository || "";
        templateEl.value = item.template || "";
    });
};

load();

document.getElementById("save-button").addEventListener("click", save);