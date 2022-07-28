// variable......
let search = document.getElementById("search-repos");
let submit = document.querySelector(".submit");
let results = document.querySelector(".results");

submit.onclick = () => {
  results.innerHTML = "";
  getRepos();
};

// Get Repositories

function getRepos() {
  if (search.value === "") {
    results.innerHTML = `<p> Please, Enter Github Username. </p>`;
  } else {
    fetch(`https://api.github.com/users/${search.value}/repos`)
      .then((response) => {
        if (response.status === 404) {
          results.innerHTML = "<p>Username is undefind.</p>";
        }
        return response.json();
      })
      .then((repos) => {
        for (let i = 0; i < repos.length; i++) {
          // Main Divs
          let result = document.createElement("div");
          let name = document.createElement("div");
          let actions = document.createElement("div");
          let stars = document.createElement("div");
          let visit = document.createElement("a");

          // Add data to main Divs
          result.className = "result";
          name.className = "name";
          actions.className = "actions";
          stars.className = "stars";
          visit.className = "visit";
          visit.href = `https://github.com/${search.value}/${repos[i].name}`;
          visit.target = "_block";

          // Get data from API
          let textName = document.createTextNode(repos[i].name);
          let textVisit = document.createTextNode("Visit");
          let textStars = document.createTextNode(
            `${repos[i].stargazers_count} ⭐️`
          );

          // Add it into it
          results.appendChild(result);
          result.appendChild(name);
          result.appendChild(actions);
          actions.appendChild(stars);
          actions.appendChild(visit);
          name.appendChild(textName);
          visit.appendChild(textVisit);
          stars.appendChild(textStars);
        }
      });
  }
}
