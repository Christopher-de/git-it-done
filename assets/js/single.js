let repoNameEl = document.querySelector('#repo-name');
let issueContainerEl = document.querySelector('#issues-container');
let limitWarningEl = document.querySelector('#limit-warning');

let getRepoName = function() {
    //get repo name from url
    let queryString = document.location.search;
    let repoName = queryString.split('=')[1];           //<---why 2nd in string?
    
    if (repoName) {
        //display repo name 
        repoNameEl.textContent = repoName;
        
        getRepoIssues(repoName);
    } else {
        //no repo given redirect -> index
        document.location.replace('./index.html')
    }
}

let getRepoIssues = function(repo) {
    //format api url
    let apiUrl = 'https://api.github.com/repos/' + repo + '/issues?direction=asc';
    
    //make request to url
    fetch(apiUrl).then(function(response) {
        //successful
        if (response.ok) {
            response.json().then(function(data) {
                displayIssues(data);

                // check for issues
                if (response.headers.get('Link')) {
                    displayWarning(repo);
                }
            });
        }
        else {
            //unsuccessful
            document.location.replace('./index.html');
        }
    });
};

let displayIssues = function(issues) {

    if (issues.length === 0) {
        issueContainerEl.textContent = 'This repo has no open issues!';
        return;
    }
    
    for (i = 0; i < issues.length; i++ ) {
        let issueEl = document.createElement('a');
        issueEl.classList = 'list-item flex-row justify-space-between align-center';
        issueEl.setAttribute('href', issues[i].html_url);
        issueEl.setAttribute('target', '_blank');

        //span for title
        let titleEl = document.createElement('span');
        titleEl.textContent = issues[i].title;

        //append to container
        issueEl.appendChild(titleEl);

        //create type element
        let typeEl = document.createElement('span');

        if (issues[i].pull_request) {
            typeEl.textContent = '(Pull request)';
        } else {
            typeEl.textContent = '(Issue)';
        }

        // append to container
        issueEl.appendChild(typeEl);

        issueContainerEl.appendChild(issueEl)
    };
};

let displayWarning = function(repo) {
    limitWarningEl.textContent = 'To see more than 30 issues, visit ';

    let linkEl = document.createElement('a');
    linkEl.textContent = 'Github.com';
    linkEl.setAttribute('href', 'https://github.com/' + repo + '/issues');
    linkEl.setAttribute('target', '_blank');

    limitWarningEl.appendChild(linkEl);
};


getRepoName();