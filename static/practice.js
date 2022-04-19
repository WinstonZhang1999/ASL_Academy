$(document).ready(function(){
    $(".next").click(function(){
        if(lesson["next_lesson"]!= "end"){
            let newUrl = "/learn/"+lesson["next_lesson"]
            window.location.href = newUrl
        }
        else{
            let newUrl = "/quiz/1"
            window.location.href = newUrl
        }
        
    })
    $(".check").click(function(){
        console.log("check")
        let response = {
            "practice_number": parseInt(lesson_id),
            "answer": $("textarea").val()
        };
        $.ajax({
            type: "GET",
            url: "/add_practice_result",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(response),
            success: function(result){
                console.log("success")
            },
            error: function(request, status, error){
                console.log("Error")
                console.log(request)
                console.log(status)
                console.log(error)
            }
        });
        
    })
})