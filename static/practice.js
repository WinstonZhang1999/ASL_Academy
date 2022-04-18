$(document).ready(function(){
    $("button").click(function(){
        if(lesson["next_lesson"]!= "end"){
            let newUrl = "/learn/"+lesson["next_lesson"]
            window.location.href = newUrl
        }
        else{
            let newUrl = "/quiz/1"
            window.location.href = newUrl
        }
        
    })
})