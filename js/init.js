function buttonResize(){
    var getButtonWidth = $('button').outerWidth(),
        setDisplayHeight = getButtonWidth / 2;

    $('button, .empty-box').css({
        'height': getButtonWidth + 'px'
    });
    $('.display').css({
        'height': setDisplayHeight + 'px'
    });
}

function calculate(){

    $('.button-number').on('click', function buttonNumber(){
        var number = $(this).val();
        
        $('.display-bottom').val(function(i, val) {
            var maxChars = 10;
            if ($('.display-bottom').val().length < maxChars) {
            return val + number;
            } else{
            return $('.display-bottom').val();
            }   
        });
    });
    
    $('.button-operator').on('click', function buttonOperator(){
        var operator = $(this).val(),
            displayBottom = $('.display-bottom').val();
        
        $('.display-top').val(function(i, val) {
            return val + displayBottom + operator;
        });
        $('.display-bottom').val(' ');
    });

    $('.button-equal').on('click', function(){
        var displayTop = $('.display-top').val(),
            displayBottom = $('.display-bottom').val(),
            total = displayTop + displayBottom,
            calculate = eval(total);

        $('.display-bottom').val(calculate);
        $('.display-top').val(' ')
    });

    $('.button-delete-all').on('click', function(){
        $('.display-top').val(' ');
        $('.display-bottom').val(' ');
    });

    $('.button-delete').on('click', function(){
        $('.display-bottom').val(' ');
    });
}



$(function(){
    buttonResize();
    calculate();
});

$(window).resize(function () {
    buttonResize();
});