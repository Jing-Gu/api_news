//get date up to today
let today = new Date();
let d = today.getDate();
let m = today.getMonth() + 1;
let y = today.getFullYear();
d < 10 ? (d = `0${d}`) : (d = d);
m < 10 ? (m = `0${m}`) : (m = m);
today = `${y}-${m}-${d}`;
//console.log(today);

let url =
  "http://newsapi.org/v2/everything?q=coronavirus&" +
  "from=" +
  today +
  "&" +
  "domains=wsj.com,nytimes.com&" +
  "sortBy=popularity&" +
  "apiKey=bce8e21c1da34087a75ecc1f9109dabd";

let output = "";
let newsContainer = document.querySelector(".news-container");

let req = new Request(url);
fetch(req)
  .then(response => {
    let data = response.json();
    return data;
  })
  .then(data => {
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
  });
