let userFormEl = document.querySelector('#user-form');
let nameInputEl = document.querySelector('#username');
let repoContainerEl = document.querySelector('#repos-container');
let repoSearchTerm = document.querySelector('#repo-search-term')


let formSubmitHandler = function(event) {
    event.preventDefault();
    console.log(event);

    let username = nameInputEl.value.trim();
    if (username) {
        getUserRepos(username);
        nameInputEl.value = '';
    } else {
        alert('Please enter a Github Username');
    }
};

let getUserRepos = function(user) {
    //format github api url
    let apiUrl = "https://api.github.com/users/" + user + "/repos";
    
    fetch(apiUrl).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
            displayRepos(data, user);
            });
        } else {
            alert('Error: Github User Not Found')
        }
    }).catch(function(error) {
        alert('Unable to connect to Github')
    });
    
};

let displayRepos = function(repos, searchTerm) {

    if (repos.length === 0) {
        repoContainerEl.textContent = 'No repositories found.';
        return;
    }
    
    console.log(repos);
    console.log(searchTerm);

    //clear old content
    repoContainerEl.textContent = '';
    repoSearchTerm.textContent = searchTerm

    //loop over repos
    for (let i=0; i<repos.length; i++) {
        //format repo name
        let repoName = repos[i].owner.login + '/' +repos[i].name;

        //new container/repo
        let repoEl = document.createElement('div');
        repoEl.classList = 'list-item flex-row justify-space-between align-center'

        //span for repo name
        let titleEl = document.createElement('span');
        titleEl.textContent = repoName;

        //append to container
        repoEl.appendChild(titleEl);

        //create status element
        let statusEl = document.createElement('span');
        statusEl.classList = 'flex-row align-center';

        //does current repo have issues?
        if (repos[i].open_issues_count > 0) {
            statusEl.innerHTML = 
                "<i class='fas fa-times status-icon icon-danger'></i>" + repos[i].open_issues_count + ' issue(s)';
        } else {
            statusEl.innerHTML = 
                "<i class='fas fa-check-square status-icon icon-success'></i>"
        }

        //append to container
        repoEl.appendChild(statusEl);
        
        //append container -> dom
        repoContainerEl.appendChild(repoEl);
    } 
};

console.log('outside');

userFormEl.addEventListener('submit', formSubmitHandler);