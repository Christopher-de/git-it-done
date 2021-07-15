let issueContainerEl = document.querySelector('#issues-container');

let getRepoIssues = function(repo) {
    console.log(repo);

    let apiUrl = 'https://api.github.com/repos/' + repo + '/issues?direction=asc';
    fetch(apiUrl).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                displayIssues(data);
            });
        }
        else {
            alert('There was a problem with your request!');
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

getRepoIssues('facebook/react');