/* 
    Your apiRoutes.js file should contain two routes:
        * A GET route with the url /api/friends. 
          This will be used to display a JSON of all possible friends.
        * A POST routes /api/friends. This will be used to handle 
          incoming survey results. This route will also be used 
          to handle the compatibility logic.
*/

var friendData = require("../data/friend.js");


module.exports = function(app) {
  app.get("/api/friends", function(req, res) {
    res.json(friendData);
  });

  app.post("/api/friends", function(req, res) {
    // temp Object for the new data entry
    var newFriend = req.body;

    // temp Array to save differences
    var diffArray = [];

    for(var i = 0 ; i < friendData.length; i++) {
        //console.log(friendData[i]);
        var diffSum = 0;
        for(var j = 0; j < newFriend.scores.length; j++) {
            
            var diff = Math.abs(newFriend.scores[j] - friendData[i].scores[j]);
            diffSum += diff;

            

        }
        diffArray.push(diffSum);


    }
    console.log(diffArray);
    var min = Math.min.apply(Math, diffArray);
    console.log();
    

    // putting into the frined Array
    friendData.push(newFriend);
    res.json(true);    
  });

};
