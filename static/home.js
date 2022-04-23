$(document).ready(function(){
    $("#learn").click(function(){
        let newUrl = "/learn/1"
        window.location.href = newUrl
        const d = new Date();
        let time = d.getTime();
        response = {
            "user_start_time" : time
        }
        $.ajax({
            type: "POST",
            url: "/add_user",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(response),
            success: function(result){
            },
            error: function(request, status, error){
                console.log("Error")
                console.log(request)
                console.log(status)
                console.log(error)
            }
        });
    })

    $("#quiz").click(function(){
        let newUrl = "/quiz/1"
        window.location.href = newUrl
    })
})