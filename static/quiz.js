const LAST_QUESTION_ID = 6;

$(document).ready(function(){
    $("button").click(function(){
        let response = {
            "question_id": parseInt(question_id),
            "answer": ""
        };
        
        var element = document.getElementById('answer_conversation'); 
        if (typeof(element) != 'undefined' && element != null) { 
            // multiple choice. 
            var radios = document.getElementsByName('choice');
            var val= "";
            for (var i = 0, length = radios.length; i < length; i++) {
                if (radios[i].checked) {
                    val = radios[i].value; 
                    break;
                }
            }
            response["answer"] = val;
            console.log("here");

        }
        else{
            //frq
            response["answer"] = document.getElementById("answer").value;
        }
        console.log(response['answer']);
        check_answer(response);
        if(question_id < LAST_QUESTION_ID){
            let nextID = parseInt(question_id) + 1;
            let newUrl = "/quiz/"+nextID;
            window.location.href = newUrl;
        }
        else{
            let nextID = parseInt(question_id) + 1;
            let newUrl = "/quiz/"+nextID;
            window.location.href = newUrl;
        }

    })
})

function check_answer(data_to_check){
    console.log("check_answer");
    let success = false;
    $.ajax({
        type: "POST",
        url: "/quiz/check_answer",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(data_to_check),
        success: function(result){
            let correct_ans = result["correct_ans"]
            console.log("success"+correct_ans)
            console.log(result)
            success = true
        },
        error: function(request, status, error){
            console.log("Error")
            console.log(request)
            console.log(status)
            console.log(error)
        }
    });
}