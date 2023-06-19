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

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

(async function () {
  const totalFollowing = Number(
    document
      .querySelector("section > ul > li:nth-child(3)")
      .textContent.replace(/following/, "")
      .trim()
  );
  let sP = 385;

  console.log("%cPlease Wait!", "color:green;font-style:bold;font-size:22px;");

  while (true) {
    if (
      document.querySelectorAll(
        '[role="dialog"] > div > div > div > div > ._aano > div > div > div'
      ).length == totalFollowing
    ) {
      break;
    }
    document
      .querySelector('[role="dialog"] > div > div > div > div > ._aano')
      .scrollTo(0, sP);
    await sleep(3000);
    sP += sP;
  }

  let totalListLength = document.querySelectorAll(
    '[role="dialog"] > div > div > div > div > ._aano > div > div > div'
  );
  let limit = 0;
  let followed = 1;
  for (let i = 0; i < totalListLength.length - 1; i++) {
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
})();
