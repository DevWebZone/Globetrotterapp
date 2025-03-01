
$('#options a').on('click',function(event) {
    event.preventDefault();
    console.log($(this).attr('href'))
    $.ajax({
        type: 'get',
        url: $(this).attr('href'),
        success: function(data){
            let correctScore = parseInt($("#correct-answers").text(), 10);
            let inCorrectScore = parseInt($("#incorrect-answers").text(), 10);
            console.log($("#correct-answers").text());
            if(data.data.isCorrect === true)
            {
                correctScore++;
                $("#correct-answers").text(correctScore.toString());
                $("#correct").addClass('active');
            }
            else{
                inCorrectScore++;
                $("#incorrect-answers").text(inCorrectScore.toString());
                $("#incorrect").addClass('active');
            }
            $.ajax({
                type: 'get',
                url: '/update-score/?correct='+correctScore+'&incorrect='+inCorrectScore,
                success: function(data){
                    console.log(data.data);
                    $("#options").fadeOut(200);
                    $("#question").removeClass('active');
                    $("#result").addClass('active');
                    $("#game-options").addClass('active')
                },
                error: function(err){
                    console.log(err.responseText);
                }
            })
        },
        error: function(err){
            console.log(err.responseText);
        }
    })

});
$('#open-modal').on('click', function(event){
    event.preventDefault();
    const randomIndex = Math.floor(Math.random() * 500);
    $('#random-image').attr('src', 'https://picsum.photos/500/300');
    $('#modal').removeClass('hidden');
});
$('#whatsappButton').on('click', function(event){
    event.preventDefault();
    let url
    $.ajax({
        type: 'get',
        url: '/invite',
        success: function(data){
            url = data.data.appUrl;
            let message = "Hey! I am playing this amazing game. Check it out!";
            window.open(`https://api.whatsapp.com/send?text=${message} ${encodeURIComponent(url)}`, '_blank');
        },
        error: function(err){
            console.log(err.responseText);
        }
    })
})
