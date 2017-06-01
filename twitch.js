
var endpoint = "https://wind-bow.glitch.me/twitch-api/";

var usernames = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "brunofin", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];

var $table = $("tbody");
var $search = $("#search");
var list = [];

function showRow(val) {
    var tab = $('li.active > a').attr("id");
    var row = $("#" + val).parent();

    console.log("Tab: ", tab);
    console.log(row);
    if(tab == "online") {
        if(row.hasClass("online")) {
            row.show(); 
        }
    } else if(tab == "offline") {
        if(!row.hasClass("online")) {
            row.show(); 
        }
    } else {
        row.show(); 
    }
}

$search.autocomplete({
    source: usernames,
    response: function(e, ui) {
        console.log("List1: ", list);
        list = ui.content;
        console.log("List2: ", list);
//        console.log(e);
//        console.log(ui);
        var i = 0;
        $("tr").show();
        $("tr").hide();
        
        list.forEach(function() {
            var val = list[i].value.toLocaleLowerCase();
            console.log("#" + val);
            console.log($("#" + val));
            
            showRow(val);
            
            i++;
        });
//        $('#myTabs a').trigger("click");
    },
    select: function(e, ui) {
        
        var val = ui.item.value.toLocaleLowerCase();
        console.log(e);
        console.log($("td#" + val));
        $("tr").show();
        $("tr").hide();
        showRow(val);
//        $('#myTabs a').trigger("click");
        
    }
});

//$search.on("autocompleteresponse", function(e, ui) {
//        console.log("List1: ", list);
//        if(list.length === 0) list = ui.content;
//        
//        console.log("List2: ", list);
//        console.log(e);
//        console.log(ui);
//        var i = 0;
//        $("tr").show();
//        $("tr").hide();
//        
//        list.forEach(function() {
//            var val = list[i].value.toLocaleLowerCase();
//            console.log("#" + val);
//            console.log($("#" + val));
//            
//            showRow(val);
//            
//            i++;
//        });
////        $('#myTabs a').trigger("click");
//});

$search.on("keypress keyup", function() {
    var value = $(this).val().toLowerCase();
//    $('#myTabs a').trigger("click");
    
    
    if(value == "") {
        var tab = $('li.active > a').attr("id");
        console.log("Rows: ", $("tr"));
        $("tr").each(function(index) {
            console.log("Row:", $(this));
            if(tab == "online") {
            if($(this).hasClass("online")) {
                $(this).show(); 
            }
            } else if(tab == "offline") {
                if(!$(this).hasClass("online")) {
                    $(this).show(); 
                }
            } else {
                $(this).show(); 
            }
        });
    } 

});





$('#myTabs a').click(function (e, tab) {

    e.preventDefault();
    console.log(e.target.id);
    console.log(tab);
    var i = 0;
    
    var search_streams = [];
    var lower_case_names = [];
    for(var i = 0; i < usernames.length; i++) {
        lower_case_names.push(usernames[i].toLocaleLowerCase());
    }
    
    console.log("List: ", list);
    if(list.length == 0) {
        search_streams = lower_case_names;
    } else {
        list.forEach(function(item) {
            search_streams.push(item.value);
        });
    }
    console.log("Search: ", search_streams);
    
    if(e.target.id == "online") {
        
        $("li").removeClass("active");

        $("tr").each(function() {
            console.log("$(this): ", $(this));
            var name = $(this).children()[1].id;
            console.log("Name: ", name);
            
            if($(this).hasClass("online")) {
                if(search_streams.indexOf(name) != -1){
                    $(this).show();
                }
                
            } else {
                $(this).hide();
            }
        });
    } else if (e.target.id == "offline") {

        $("li").removeClass("active");

        
        $("tr").each(function() {
            console.log("$(this): ", $(this));
            var name = $(this).children()[1].id;
            console.log("Name: ", name);
            if($(this).hasClass("online")) {
                
                    $(this).hide();
                
            } else {
                if(search_streams.indexOf(name) != -1){
                    $(this).show();
                }
                
            }
        });
    } else {
        
        $("li").removeClass("active");

        
        $("tr").each(function() {
            console.log("$(this): ", $(this));
            var name = $(this).children()[1].id;
            console.log("Name: ", name);
            if(search_streams.indexOf(name) != -1){
                $(this).show();
            }
        });
    }
});

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
        
        
        var name = d1[0].display_name;
        
        if(name == undefined) {
            var msg = d1[0].message;
            console.log(msg.indexOf("\""));
            var name = msg.slice(msg.indexOf("\"") + 1, msg.lastIndexOf("\""));
        }
        
        
        name = name.toLocaleLowerCase();
        
        console.log("Name: ", name);
        
        $row.append($("<td></td>").html(d3[0].logo ? "<img src=" + d3[0].logo +">" : "n/a"));
        $row.append($("<td></td>").html(d1[0].display_name ? "<a href='" + twichURL + UN + "'>" + d1[0].display_name + "</a>" : "<i>" + d1[0].message + "</i>").attr("id", name));
        $row.append($("<td></td>").html(d1[0].bio ? d1[0].bio : "<i>No bio.</i>"));
        $row.append($("<td></td>").html(d2[0].stream ? d2[0].stream.channel.status : "No stream."));
        
        try {
            d2[0].stream.channel.status;
            $row.addClass("online");
        } catch(e) {}
        
        
        
        
        $table.append($row);
    });
    
    
    
    
    
    
}



