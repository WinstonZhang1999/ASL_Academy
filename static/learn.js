$(document).ready(function(){
    let current = 1
    renderVideo(1);
    $("#next-lesson").click(function(){
        
            let newUrl = "/practice/"+lesson["lesson_id"]
            window.location.href = newUrl
        
    })
    $("#last-video").click(function(){
        if (current > 0){
            renderVideo(current-1)
            current = current-1;
        }else{
            renderVideo(current)
        }
    })
    $("#next-video").click(function(){
        if (current < 3){
            renderVideo(current+1)
            current = current+1;
        }else{
            let newUrl = "/practice/"+lesson["lesson_id"]
            window.location.href = newUrl
        }
    })

})
function renderVideo(videoNumber){
    $("#lesson-video").empty()
    console.log(videoNumber)
    let newRow = $("<div class='col-md-4'>")
    let content = ""
    let source = ""
    let videos = lesson["videos"]
    console.log(videos)
    $.each(videos, function(i, video){
        if(i+1 == videoNumber){
            content = video["text"]
            source = video["video"]
        }
    })
    $(newRow).html(content);
    let video = $("<video width='320' height='240' autoplay loop>");
    $(video).attr('src', source);
    $(newRow).append(video);
    $("#lesson-video").append(newRow);
}