const LAST_QUESTION_ID = 12;


$(document).ready(function(){

    //submit answer
    $("#submit").click(function(){
        let response = {
            "question_id": parseInt(question['question_id']),
            "answer": ""
        };

        let element = $('#answer_conversation');
        console.log(element);

        if (question_type.localeCompare('conversation') == 0) {
            // conversation question
            let radios = document.getElementsByName('choice');
            let val= "";
            for (let i = 0, length = radios.length; i < length; i++) {
                if (radios[i].checked) {
                    val = radios[i].value;
                    break;
                }
            }
            response["answer"] = val;

        } else {
            //translation question
            response["answer"] = $("#answer").val();
        }

        check_answer(response);
        //TODO: add feedback
        $('#buttons').append('<button id="next" onclick="goToNextQuestion()">Next Question</button>');
        $('#submit').remove();
    });

})


function check_answer(data_to_check){
    $.ajax({
        type: "POST",
        url: "/quiz/check_answer",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(data_to_check),
        success: function(result){
            quiz_feedback(result);
        },
        error: function(request, status, error){
            console.log("Error")
            console.log(request)
            console.log(status)
            console.log(error)
        }
    });
}

function goToNextQuestion() {
    console.log("Next button clicked");
    if(question_id < LAST_QUESTION_ID){
        let nextID = parseInt(question_id) + 1;
        let newUrl = "/quiz/"+nextID;
        window.location.href = newUrl;
    } else {
        let nextID = parseInt(question_id) + 1;
        let newUrl = "/quiz/"+nextID;
        window.location.href = newUrl;
    }
}

function quiz_feedback(result) {
    console.log(result);

    //If true answer matches user answer
    if (result["true_answer"].localeCompare(result["user_answer"]) == 0) {
        $('feedback').empty();
        $('#feedback').text("Correct!")

    //If true answer does not match user answer
    } else {
        $('feedback').empty();

        //If conversation question
        if (result["question_type"].localeCompare("conversation") == 0) {
            //Get correct multiple choice answer
            let user_radio_input = question[result["user_answer"]]["text"];

            let correct_radio_input = "";
            if (result["true_answer"].localeCompare("video_2") == 0) {
                correct_radio_input = "\"" + question["video_2"]["text"] + "\"";
            } else if (result["true_answer"].localeCompare("video_3") == 0) {
                correct_radio_input = "\"" + question["video_3"]["text"] + "\"";
            } else {
                correct_radio_input = "\"" + question["video_4"]["text"] + "\"";
            }
            $('#feedback').text("Incorrect! The correct answer is " + correct_radio_input + ". You said \""
            + user_radio_input + "\"");

        //If translation question
        } else {
            $('#feedback').text("Incorrect! The correct answer is \"" + result["true_answer"] + "\". You said \""
            + result["user_answer"] + "\"");
        }
    }
    $("#score").empty();
    console.log(result["num_correct_ans"])
    $("#score").append("Score: " + result["num_correct_ans"] + "/6");
}