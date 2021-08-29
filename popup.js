const container = document.getElementById('container');

/**
 * Discard tab from memory and disables the item from the menu
 * @param {HTMLButtonElement} button
 * @param {HTMLLIElement} li
 * @param {*} tab 
 */
function discard(button, li, tab) {
  chrome.tabs.discard(tab.id, () => {
    button.disabled = true;
    li.classList.add('disabled');
  });
}

chrome.tabs.query({ windowId: chrome.windows.WINDOW_ID_CURRENT }, (tabs) => {
  const h1 = document.createElement('h1')
  h1.innerText = "The tabs you're on are:"

  const ul = document.createElement("ul");
  for (let i = 0; i < tabs.length; i++) {
    const li = document.createElement("li");
    const span = document.createElement("span");
    const button = document.createElement("button");
    const tab = tabs[i];

    li.title = tab.title;
    span.innerText = tab.title;

    if (tab.discarded) {
      button.disabled = true;
      li.classList.add('disabled');
    }

    if (tab.active) {
      li.classList.add('active');
    }

    button.title = "Discard Tab"
    button.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-archive"><polyline points="21 8 21 21 3 21 3 8"></polyline><rect x="1" y="3" width="22" height="5"></rect><line x1="10" y1="12" x2="14" y2="12"></line></svg>`;
    const boundDiscard = discard.bind(null, button, li, tab);
    button.addEventListener("click", boundDiscard);

    li.appendChild(span);
    li.appendChild(button);
    ul.appendChild(li);
  }

  container.appendChild(h1);
  container.appendChild(ul);
});
