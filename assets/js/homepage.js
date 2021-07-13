let getUserRepos = function(user) {
    //format github api url
    let apiUrl = "https://api.github.com/users/" + user + "/repos";
    
    fetch(apiUrl).then(function(response) {
        response.json().then(function(data) {
            console.log(data);
        });
    });
    
};

console.log('outside');