function isEmpty(val){
    if (val == ''){
        return true;
    }
    else if($.trim(val) == ''){
        return true;
    }
    return false;
}

function checkAnswer(right_answer,user_answer){
    if (user_answer == right_answer){
        give_feedback(right_answer,true);
        let res = true
    }
    else{
        give_feedback(right_answer,false);
        let res = false
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
}

function give_feedback(right_answer ,feedback){
    $("#feedback").empty();
    if ( feedback ) {
        val = "<p>&#10004; Correct!</p>";
    } else {
        val = "<p>&#10060 The right answer is " + right_answer + "</p>";
    }
    $("#feedback").append(val);
}
function renderVideo(videoNumber){
    $("#practice-video").empty();
    console.log(videoNumber);
    let content = "";
    let source = "";
    let videos = lesson["videos"];
    console.log(videos);
    $.each(videos, function(i, video){
        if(i+1 == videoNumber){
            content = video["text"];
            source = video["video"];
        }
    })
    let video = $("<video width='640' height='480' autoplay loop>");
    $(video).attr('src', source);
    $("#practice-video").append(video);
}

$(document).ready(function(){
    let videoNumber = Math.floor((Math.random() * 3) + 1);
    renderVideo(videoNumber);

    //User selects practice more
    $(".again").click(function(){
        videoNumber = Math.floor((Math.random() * 3) + 1);
        $("#feedback").empty();
        renderVideo(videoNumber);
    });

    //User goes back to the lesson
    $("#back").click(function(){
        let newUrl = "/learn/"+lesson["lesson_id"];
        window.location.href = newUrl;
    });

    //User initiates the next lesson
    $(".next").click(function(){
        if(lesson["next_lesson"]!= "end") {
            let newUrl = "/learn/"+lesson["next_lesson"];
            window.location.href = newUrl;
        } else {
            let newUrl = "/learn/finish";
            window.location.href = newUrl;
        }
        
    });

    //User submits an answer
    $(".check").click(function(){
        let user_answer = $("#answer").val().toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"");;
        if(isEmpty(user_answer)){
            $("#feedback").empty();
            $("#feedback").append("<div class = 'warn'>Please input an answer before submitting");
        } else {
            let videos = lesson["videos"];
            $.each(videos, function(i, video){
                if(i+1 == videoNumber){
                    content = video["text"]
                }
            })
            let right_answer = content.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"");
            $("#answer").val('');
            user_answer = $.trim(user_answer)
            checkAnswer(right_answer,user_answer);
        }
    });

    //If focused on textbox when enter is pressed, submit
    $(document).keydown(function(e) {
        if ($("#answer").is(":focus")) {
            if (e.originalEvent.key == 'Enter') {
                e.preventDefault(); //prevents newline
                $(".check").click(); //submits answer
            }
        }
    });
})