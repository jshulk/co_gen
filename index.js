var request = require('superagent'),
	Q = require('q'),
	co = require('co');

var url = "https://hacker-news.firebaseio.com/v0/topstories.json";


function getTopStoriesPromise(){
	var deferred = Q.defer();
	request(url)
	.end(function(err, response){
		if( err ){
			deferred.reject(err);
		} else {
			deferred.resolve(response);
		}
	});

	return deferred.promise;
}

co(function *(){
	var result = yield getTopStoriesPromise();
	return result;
})
.then(function(result){
	console.log("result.body");
	console.log(result.body);
})
.catch(function(){
	console.log("failed to fetch top stories");
});