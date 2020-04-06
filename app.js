//get date up to today
let today = new Date();
let d = today.getDate();
let m = today.getMonth() + 1;
let y = today.getFullYear();
d < 10 ? (d = `0${d}`) : (d = d);
m < 10 ? (m = `0${m}`) : (m = m);
today = `${y}-${m}-${d}`;

let btn = document.querySelectorAll(".btn");
let newsContainer = document.querySelector(".news-container");
let output = "";

let newsArray = [
  { websiteUrl: "wsj.com", websiteBtnName: "wsj" },
  { websiteUrl: "bbc.co.uk", websiteBtnName: "bbc" },
  { websiteUrl: "engadget.com", websiteBtnName: "eng" },
  { websiteUrl: "techcrunch.com", websiteBtnName: "tech" },
];

window.addEventListener("load", () => {
  generateContent(newsArray[0].websiteUrl);
});

btn.forEach((btnMedia) => {
  btnMedia.addEventListener("click", (e) => {
    newsContainer.innerHTML = "";
    showNews(e);
  });
});

function showNews(e) {
  let link = e.target.value;
  generateContent(link);
}

function generateContent(link) {
  let url =
    "http://newsapi.org/v2/everything?q=coronavirus&" +
    "from=" +
    today +
    "&" +
    "domains=" +
    link +
    "&" +
    "sortBy=popularity&" +
    "apiKey=bce8e21c1da34087a75ecc1f9109dabd";

  let req = new Request(url);
  fetch(req)
    .then((response) => {
      let data = response.json();
      return data;
    })
    .then((data) => {
      console.log(data);
      let x = data.totalResults;
      for (i = 0; i < x; i++) {
        let newsSource = data.articles[i].source.name;
        let title = data.articles[i].title;
        let desc = data.articles[i].description;
        let url = data.articles[i].url;
        let urlImg = data.articles[i].urlToImage;

        output = `
      <div class = "news-feed">
          <div class="news-img">
              <img src="${urlImg}" />
          </div>
          
          <div class="news-piece">
              <h2 class="title">${title}</h2>
              <p class="source">News source: <span><i>${newsSource}</i></span></p>
              <p class="desc">${desc}</p>
              <a class="news-link" href="${url}" target="_blank">Read More</a>
          </div>
      </div>
      `;
        newsContainer.innerHTML += output;
        newsContainer.classList.add("animated", "fadeIn");
      }
    }); //end of then
}

//toggle dark mode
let moon = document.querySelector(".moon");
let sun = document.querySelector(".sun");

moon.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  sun.classList.toggle("show");
  moon.classList.toggle("hide");
});
