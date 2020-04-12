const timeout = 10000; // ms
const root = document.getElementById("root");
const lastUpdated = document.getElementById("last-updated")


function update() {
  let nextDiv = document.createElement("div");
  nextDiv.classList = "flex";

  for (let i = 1; i < 5; i++) {
    let div = document.createElement("div");
    div.classList = [`stack-${i}`];

    let stack = document.createElement("h1");
    let stacktext = document.createTextNode(`Stack ${i}`);
    stack.classList = [`title-stack`];

    stack.appendChild(stacktext);
    div.appendChild(stack);

    fetch(`https://techo.gathering.org/api/status/station/${i}`)
      .then((res) => res.json())
      .then((status) => {
        console.log(status);

        status.Tests.forEach((element) => {
          let smallDiv = document.createElement("div");

          let title = document.createElement("h2");
          let titletext = document.createTextNode(element.Title);

          title.appendChild(titletext);
          smallDiv.classList = ["test"];
          if (element.Status === "ok") {
            smallDiv.classList.add("ok");
          } else if (element.Status === "skipped") {
            smallDiv.classList.add("skipped");
          } else {
            smallDiv.classList.add("not-ok");
          }

          smallDiv.appendChild(title);

          div.appendChild(smallDiv);
        });
      })
      .catch((err) => console.error(err));
    nextDiv.appendChild(div);
  }
  lastUpdated.innerText = `Last updated: ${new Date()}`;
  root.innerHTML = "";
  root.appendChild(nextDiv);
}
update();

setInterval(update, timeout);
