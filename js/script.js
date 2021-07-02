//profile information div
const profileInfo = document.querySelector(".overview");
const username = "NicoleCarlucci";
//Select the Repos List
const repoList = document.querySelector(".repo-list");
//Select the section with the Repo information
const allReposContainer = document.querySelector(".repos");
//Select the section with the Repo Data
const repoData = document.querySelector(".repo-data");
//Select the Back to Repo Gallery button
const backButton = document.querySelector(".view-repos");
//Select the input with the "Search by name" placeholder
const filterInput = document.querySelector(".filter-repos");

//Fetch API JSON Data
const getInfo = async function () {
  const showInfo = await fetch(`https://api.github.com/users/${username}`);
  const data = await showInfo.json();
  console.log(data);
  showUserData(data);
};
getInfo();

//Fetch & Display User Information
const showUserData = function(data) {
  const userInfo = document.createElement("div");
  userInfo.classList.add("user-info");
  userInfo.innerHTML = `<figure>
                          <img alt="user avatar" src=${data.avatar_url} />
                       </figure>
                       <div>
                          <p><strong>Name:</strong> ${data.name}</p>
                          <p><strong>Bio:</strong> ${data.bio}</p>
                          <p><strong>Location:</strong> ${data.location}</p>
                          <p><strong>Number of public repos:</strong> ${data.public_repos}</p>
                       </div>`;
  profileInfo.append(userInfo);
};

//Fetch Your Repos
const getRepos = async function() {
  const showRequest = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
  const response = await showRequest.json();
  console.log(response);
  showRepos(response);
};
getRepos();

//Display Info About Your Repos
const showRepos = function(repos) {
  for (let repo of repos) {
    const listItem = document.createElement("li");
    listItem.classList.add("repo");
    listItem.innerHTML = `<h3>${repo.name}`;
    repoList.append(listItem);
    //Display the Input Element
    filterInput.classList.remove("hide");
  }
};

repoList.addEventListener("click", function(e) {
  if (e.target.matches("h3")) {
    const repoName = e.target.innerText;
    getRepoInfo(repoName);
  }
});

//Create a Function to Get Specific Repo Info
const getRepoInfo = async function(repoName) {
  const fetchInfo = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
  const repoInfo = await fetchInfo.json();
  console.log(repoInfo);
  const fetchLanguages = await fetch(repoInfo.languages_url);
  const languageData = await fetchLanguages.json();
  console.log(languageData);

  const languages = [];
  for (let language in languageData) {
    languages.push(language);
    console.log(languages);
  }
  displayRepoInfo(repoInfo, languages);
};

//Create a Function to Display Specific Repo Info
const displayRepoInfo = function(repoInfo, languages) {
  repoData.innerHTML = "";
  const div = document.createElement("div");
  div.innerHTML = `<h3>Name: ${repoInfo.name}</h3>
                   <p>Description: ${repoInfo.description}</p>
                   <p>Default Branch: ${repoInfo.default_branch}</p>
                   <p>Languages: ${languages.join(", ")}</p>
                   <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>`;
  repoData.append(div);
  repoData.classList.remove("hide");
  allReposContainer.classList.add("hide");
  backButton.classList.remove("hide");
};

backButton.addEventListener("click", function() {
  allReposContainer.classList.remove("hide");
  repoData.classList.add("hide");
  backButton.classList.add("hide");
});

//Dynamic search
filterInput.addEventListener("input", function(e) {
  const searchBox = e.target.value;
  console.log(searchBox);
  const repos = document.querySelectorAll(".repo");
  const lowerSearchBox = searchBox.toLowerCase();

  for (let repo of repos) {
    const lowerRepo = repo.innerText.toLowerCase();

    if (lowerRepo.includes(lowerSearchBox)) {
      repo.classList.remove("hide");
    } else {
      repo.classList.add("hide");
    }
  }
});
