/*
 * AUTHOR: Sidmaz666
 * GITHUB: https://github.com/Sidmaz666
 * Open the Browser and go to the following link:
 * https://www.instagram.com/username/following/
 * Replace username with the username of a user
 * Ctrl+Shift+c Open Inspector, Click on the Console Tab.
 * Paste the Script and hit Enter!
 * Enjoy :)
 *
 * */

let isScroll = true;
let scrollTime = 5000;
let limit = 0;
let followed = 1;
let followLimit = 150;

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function Follow() {
  let totalListLength = document.querySelectorAll(
    '[role="dialog"] > div > div > div > div > ._aano > div > div > div'
  );
  for (let i = 0; i < totalListLength.length; i++) {
    const d = totalListLength[i];
    const followBtn = d.querySelector("button");
    if (followBtn.textContent == "Follow") {
      followBtn.click();
      console.log(
        `%c${followed}. Followed ${d
          .querySelector("span > span")
          .textContent.replace(/Verified/g, "")
          .trim()}`,
        "color:cyan;font-style:bold;font-size:18px;"
      );
      limit++;
      followed++;
    }
    if (limit == 5) {
      console.log(
        "%cSleeping For 5min!",
        "color:orange;font-style:bold;font-size:20px;"
      );
      limit = 0;
      await sleep(300000);
    }
    if (followed == followLimit) {
      console.log("Reach Limit For a Day!");
      isScroll = false;
      return;
    }
  }
}

async function scrollAndDetectChildNodes() {
  const parentElement = document.querySelector(
    '[role="dialog"] > div > div > div > div > ._aano'
  );
  parentElement.scrollTop = parentElement.scrollHeight;
  await sleep(scrollTime);
  if (Math.random() > 0.5) {
    scrollTime += 5000;
  } else {
    scrollTime -= 1000;
  }
  const childNodes = parentElement.children[0].children[0].childNodes;
  const addedChildNodes = Array.from(childNodes).filter(
    (node) => node.nodeType === Node.ELEMENT_NODE
  );
  if (addedChildNodes.length > 0) {
    isScroll = true;
    await Follow();
  } else {
    isScroll = false;
  }
}

(async function () {
  console.log("%cPlease Wait!", "color:green;font-style:bold;font-size:22px;");
  while (true) {
    if (!isScroll) break;
    await scrollAndDetectChildNodes();
  }
})().then(() => {
  console.log(
    "%cDone Following!",
    "color:green;font-style:bold;font-size:22px;"
  );
});
