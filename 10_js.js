document.addEventListener("DOMContentLoaded", () => {
    const newForm = document.getElementById("newContent");
    const filterForm = document.getElementById("filterContent");

    if (newForm) newForm.style.display = "none";
    if (filterForm) filterForm.style.display = "none";
});

function showFilter() {
    const newForm = document.getElementById("newContent");
    const filterForm = document.getElementById("filterContent");

    if (newForm) newForm.style.display = "none";
    if (filterForm) {
        filterForm.style.display = (filterForm.style.display === "none" || filterForm.style.display === "")
        ? "block"
        : "none";
    }
}

function showAddNew() {
    const newForm = document.getElementById("newContent");
    const filterForm = document.getElementById("filterContent");

    if (filterForm) filterForm.style.display = "none";
    if (newForm) {
        newForm.style.display = (newForm.style.display === "none" || newForm.style.display === "")
        ? "flex"
        : "none";
    }
}

function filterArticles() {
    const opinionOn = document.getElementById("opinionCheckbox")?.checked ?? true;
    const recipeOn = document.getElementById("recipeCheckbox")?.checked ?? true;
    const updateOn = document.getElementById("updateCheckbox")?.checked ?? true;

    document.querySelectorAll("#articleList article.opinion").forEach(a => {
        a.style.display = opinionOn ? "" : "none";
    });

    document.querySelectorAll("#articleList article.recipe").forEach(a => {
        a.style.display = recipeOn ? "" : "none";
    });

    document.querySelectorAll("#articleList article.update").forEach(a => {
        a.style.display = updateOn ? "" : "none";
    });
}

function addNewArticle() {
    const inputHeader = document.getElementById("inputHeader");
    const inputArticle = document.getElementById("inputArticle");

    const title = (inputHeader?.value ?? "").trim();
    const text = (inputArticle?.value ?? "").trim();

    const opinionRadio = document.getElementById("opinionRadio");
    const recipeRadio = document.getElementById("recipeRadio");
    const lifeRadio = document.getElementById("lifeRadio");

    let articleClass = "";
    let markerText = "";

    if (opinionRadio?.checked) {
        articleClass = "opinion";
        markerText = "Opinion";
    } else if (recipeRadio?.checked) {
        articleClass = "recipe";
        markerText = "Recipe";
    } else if (lifeRadio?.checked) {
        articleClass = "update";
        markerText = "Update";
    }

    const list = document.getElementById("articleList");
    if (!list) return;

    let maxNum = 0;
    document.querySelectorAll("#articleList article[id^='a']").forEach(a => {
        const n = parseInt(a.id.slice(1), 10);
        if (!Number.isNaN(n)) maxNum = Math.max(maxNum, n);
    });
    const newId = "a" + (maxNum + 1);

    const article = document.createElement("article");
    article.className = articleClass;
    article.id = newId;

    const marker = document.createElement("span");
    marker.className = "marker";
    marker.textContent = markerText;

    const h2 = document.createElement("h2");
    h2.textContent = title;

    const p1 = document.createElement("p");
    p1.textContent = text;

    const p2 = document.createElement("p");
    const link = document.createElement("a");
    link.href = "moreDetails.html";
    link.textContent = "Read more...";
    p2.appendChild(link);

    article.appendChild(marker);
    article.appendChild(h2);
    article.appendChild(p1);
    article.appendChild(p2);

    list.appendChild(article);

    filterArticles();
}
