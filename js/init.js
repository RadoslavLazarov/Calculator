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

        displayBottom.val(function(i, val) {
            var maxChars = 10;
            if (displayBottom.val().length < maxChars) {
                return val + number;
            } else{
                alert("The limit of symbols is reached!");
                return displayBottom.val();
            }   
        });
    });

    $('.button-decimal').on('click', function(){
        if((displayBottom.val() != '') && (displayBottom.val() != ' ') && (displayBottom.val().indexOf('.') < 1)){
            displayBottom.val(displayBottom.val() + $(this).val());
        }
    });

    $('.button-operator').on('click', function buttonOperator(){
        var operator = $(this).val();
        
        if((displayBottom.val() != 0) && (displayBottom.val().charAt(displayBottom.val().length-1) != '.')){
            displayTop.val(function(i, val) {
                return val + displayBottom.val() + operator;
            });
            displayBottom.val(' ');
        }else if(displayTop.val() != 0){
            displayTop.val(displayTop.val().slice(0, -1));
            displayTop.val(function(i, val) {
                return val + operator;
            });
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
        if(displayTop.val()){
            displayBottom.val(' ');
        } else{
            displayBottom.val('');
        }
    });
}

$(function(){
    calcResize();
    calculate();
});

$(window).resize(function(){
    calcResize();
});