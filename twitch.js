
var endpoint = "https://wind-bow.glitch.me/twitch-api/";

var usernames = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "brunofin", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];

var $table = $("tbody");

for(var i = 0; i < usernames.length; i++) {
    var user = usernames[i];
    var userInfoEP = endpoint + "users/" + user;
    var streamInfoEP = endpoint + "streams/" + user;
    var channelInfoEP = endpoint + "channels/" + user;
    
    var twichURL = "https://www.twitch.tv/";
    
    $.when($.getJSON(userInfoEP), $.getJSON(streamInfoEP), $.getJSON(channelInfoEP)).done(function(d1, d2, d3) {
        var $row = $("<tr></tr>");
        
        var UN = d1[0].display_name;
        
        console.log(UN);
        console.log(d3[0]);
        console.log(d2[0].stream);
        console.log(" ");
        
        $row.append($("<td></td>").html(d3[0].logo ? "<img src=" + d3[0].logo +">" : "n/a"));
        $row.append($("<td></td>").html(d1[0].display_name ? "<a href='" + twichURL + UN + "'>" + d1[0].display_name + "</a>" : "<i>" + d1[0].message + "</i>"));
        $row.append($("<td></td>").html(d1[0].bio ? d1[0].bio : "<i>No bio.</i>"));
        $row.append($("<td></td>").html(d2[0].stream ? d2[0].stream.channel.status : "No stream."));
        
        try {
            d2[0].stream.channel.status;
            $row.addClass("online");
        } catch(e) {}
        
        
        
        
        $table.append($row);
    });
    
    
    
    
    
    
}



