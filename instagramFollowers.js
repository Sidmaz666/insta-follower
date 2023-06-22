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

let isScroll = true

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function scrollAndDetectChildNodes() {
  const parentElement = document.querySelector('[role="dialog"] > div > div > div > div > ._aano');
  parentElement.scrollTop = parentElement.scrollHeight;
  await sleep(5000)
  const childNodes = parentElement.children[0].children[0].childNodes;
  const addedChildNodes = Array.from(childNodes).filter(node => node.nodeType === Node.ELEMENT_NODE);
  if (addedChildNodes.length > 0) {
    isScroll=true
  } else {
    isScroll=false
  }
}

async function Follow(){
let totalListLength = document.querySelectorAll(
  '[role="dialog"] > div > div > div > div > ._aano > div > div > div'
);
let limit = 0;
let followed = 1;
for (let i = 0; i < totalListLength.length; i++) {
  const d = totalListLength[i];
  const followBtn = d.querySelector("button");
  if (followBtn.textContent == "Follow") {
    followBtn.click();
    console.log(
      `%cFollowed ${d
	.querySelector("span > span")
	.textContent.replace(/Verified/g, "")
	.trim()}`,
      "color:cyan;font-style:bold;font-size:18px;"
    );
    limit++;
    followed++;
    if (limit == 5) {
      console.log(
	"%cSleeping For 5min!",
	"color:orange;font-style:bold;font-size:20px;"
      );
      limit = 0;
      await sleep(300000);
    }
    if (followed == 200) {
      console.log("Reach Limit For a Day!");
      return;
   }
  }
 }
}


(async function () {
  console.log("%cPlease Wait!", "color:green;font-style:bold;font-size:22px;");
  while(true){
    	if(!isScroll) break;
	await scrollAndDetectChildNodes()
  }

  await Follow()

})().then(() => {
  console.log(
    "%cDone Following!",
    "color:green;font-style:bold;font-size:22px;"
  );
});
