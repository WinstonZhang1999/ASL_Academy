function give_feedback(right_answer ,feedback){
    if( feedback == true){
        val = "<p>&#10004; Correct!"
    }
    else{
        val = "<p>&#10060 The right answer is " + right_answer;
    }
    $("#feedback").append(val)
}

$(document).ready(function(){
    $(".next").click(function(){
        if(lesson["next_lesson"]!= "end"){
            let newUrl = "/learn/"+lesson["next_lesson"]
            window.location.href = newUrl
        }
        else{
            let newUrl = "/learn/finish"
            window.location.href = newUrl
        }
        
    })
    $(".check").click(function(){
        right_answer = lesson["video_3"]["text"].toLowerCase();
        user_answer = $("textarea").val().toLowerCase();
        if (user_answer == right_answer){
            give_feedback(right_answer,true);
            res = true
        }
        else{
            give_feedback(right_answer,false);
            res = false
        }
        let response = {
            "practice_number": parseInt(lesson_id),
            "result": res
        };
        $.ajax({
            type: "POST",
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