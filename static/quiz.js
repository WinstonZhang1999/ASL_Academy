const LAST_QUESTION_ID = 6;

$(document).ready(function(){
    $("button").click(function(){
        if(question_id < LAST_QUESTION_ID){
            let nextID = parseInt(question_id) + 1;
            let newUrl = "/quiz/"+nextID;
            window.location.href = newUrl;
        }

    })
})