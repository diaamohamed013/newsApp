var newsContainer = [];
var links = document.querySelectorAll("ul li");

async function getNews(country, category) {
    let res = await fetch(`https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=6ab5a67d943e4248a0883c474a89fc11`)
    let finalRes = await res.json();
    newsContainer = finalRes.articles;
    // console.log(newsContainer);
    displyNews();
};

for (let i = 0; i < links.length; i++) {
    links[i].addEventListener("click", function (e) {
        let linkText = e.target.innerText.toLowerCase();
        var current = document.getElementsByClassName("active");
        current[0].className = current[0].className.replace("active", "link");
        this.className += " active";
        // console.log(linkText);
        getNews("us", linkText)
    })
};

function displyNews() {
    let cartona = ``;
    for (let i = 0; i < newsContainer.length; i++) {
        cartona += `<div class="col-lg-4 col-md-6">
                    <div class="card h-100">
                        <img src=" ${newsContainer[i].urlToImage ? newsContainer[i].urlToImage : "images/dummy-image-square.jpg"}" class="card-img-top w-100 d-block" alt="...">
                        <div class="card-body d-flex flex-column justify-content-center">
                            <h5 class="card-title">${newsContainer[i].title ? newsContainer[i].title : "Title Not Found for This Article"}</h5>
                            <p class="card-text">${newsContainer[i].description ? newsContainer[i].description : "Description Not Found for This Article"}</p>
                            <div>
                            <a href="${newsContainer[i].url}" target = "_blank" class="btn">See More</a>
                            </div>
                        </div>
                    </div>
                </div>`

    }
    document.getElementById("myRow").innerHTML = cartona;
};

getNews("us", "general");

let h = document.querySelector("header");
let goTopIcon = document.querySelector(".goTopIcon");


window.addEventListener("scroll", function () {
    this.scrollY > 50 ? h.classList.add("sticky") : h.classList.remove("sticky");
    if (window.scrollY >= 200) {
        goTopIcon.classList.replace("d-none", "d-block");
    }
    else {
        goTopIcon.classList.replace("d-block", "d-none");
    }
});

goTopIcon.addEventListener("click", () => {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
})





