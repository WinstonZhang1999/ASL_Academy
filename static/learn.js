$(document).ready(function(){

    let current = 1
    $("#last-video").hide();
    renderVideo(1);
    
    
    $("#practice").click(function(){      
        let newUrl = "/practice/"+lesson["lesson_id"]
        window.location.href = newUrl
    })

    $("#last-video").click(function(){
        renderVideo(current-1)
        current = current-1;
        $("#next-video").show();
        if (current < 2){
           $("#last-video").hide();
        }
    })
    $("#next-video").click(function(){
        if (current < 3){
            renderVideo(current+1)
            current = current+1;
            $("#last-video").show();
            if (current >= 3){
                $("#next-video").hide();
            }
        }
    })

})
function renderVideo(videoNumber){
    $("#lesson-video").empty()
    $("#lesson-title").empty();
    console.log(videoNumber)
    let newTitle = $("<div>")
    let newVid = $("<div>")
    let content = ""
    let source = ""
    let videos = lesson["videos"]
    $.each(videos, function(i, video){
        if(i+1 == videoNumber){
            content = video["text"]
            source = video["video"]
        }
    })
    $(newTitle).html('<h1> '+content);
    let video = $("<video width='640' height='480' autoplay loop>");
    $(video).attr('src', source);
    $(newVid).append(video);
    $("#lesson-title").append(newTitle);
    $("#lesson-video").append(newVid);
}