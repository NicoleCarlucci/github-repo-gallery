//profile information div
const profileInfo = document.querySelector(".overview");
const username = "NicoleCarlucci";
//Select the Repos List
const repoList = document.querySelector(".repo-list");

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
  for (repo of repos) {
    const listItem = document.createElement("li");
    listItem.classList.add("repo");
    listItem.innerHTML = `<h3>${repo.name}`;
    repoList.append(listItem)
  }
};
