function calcResize(){
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

    var displayTop = $('.display-top'),
        displayBottom = $('.display-bottom');

    $('.button-number').on('click', function buttonNumber(){
        var number = $(this).val();
        var maxChars = 10;

        checkForInfinity();
        if(displayBottom.val().indexOf("0") === 0 && (displayBottom.val().indexOf('.') < 1)) {
            displayBottom.val('');
        }else{
            if (displayBottom.val().length < maxChars) {
                return displayBottom.val(displayBottom.val() + number);
            } else{
                alert("The limit of symbols is reached!");
                return displayBottom.val();
            }
        } 
    });

    $('.button-decimal').on('click', function(){
        if((displayBottom.val() != '') && (displayBottom.val() != ' ') && (displayBottom.val().indexOf('.') < 1)){
            displayBottom.val(displayBottom.val() + $(this).val());
        }
    });

    $('.button-operator').on('click', function buttonOperator(){
        var operator = $(this).val();
        
        checkForInfinity();
        if((displayBottom.val() != 0) && (displayBottom.val().charAt(displayBottom.val().length-1) != '.')){
            displayTop.val(displayTop.val() + displayBottom.val() + operator);
            displayBottom.val('');
            displayBottom.attr('placeholder' , '');
        }else if(displayTop.val() != 0){
            displayTop.val(displayTop.val().slice(0, -1));
            return displayTop.val(displayTop.val() + operator);
        }
    });

    $('.button-equal').on('click', function(){
        var total = displayTop.val() + displayBottom.val(),
            calculate = eval(total);
            
        displayBottom.val(calculate);
        displayTop.val('');
            
    });

    $('.button-delete-all').on('click', function(){
        displayTop.val('');
        displayBottom.val('');
    });

    $('.button-delete').on('click', function(){
        displayBottom.val('');
    });

    function checkForInfinity(){
        if(displayBottom.val() === 'Infinity'){
            displayBottom.val('');
        }
    }
}

$(function(){
    calcResize();
    calculate();
});

$(window).resize(function(){
    calcResize();
});