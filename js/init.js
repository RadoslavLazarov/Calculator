function calcResize() {
    var getButtonWidth = $("button").outerWidth(),
        setDisplayHeight = getButtonWidth / 2;

    $("button, .empty-box").css({
        height: getButtonWidth + "px"
    });
    $(".display").css({
        height: setDisplayHeight + "px"
    });
}

function calculate() {
    var displayTop = $(".display-top"),
        displayBottom = $(".display-bottom");

    $(".button-number").on("click", function () {
        errorCheck();

        var number = $(this).val(),
            maxChars = 10,
            displayBottomVal = displayBottom.val();

        if (
            displayBottomVal.indexOf("0") === 0 &&
            displayBottomVal.indexOf(".") < 1
        ) {
            displayBottom.val("");
        } else {
            if (displayBottomVal.length < maxChars) {
                return displayBottom.val(displayBottomVal + number);
            } else {
                alert("The limit of symbols is reached!");
                return displayBottomVal;
            }
        }
    });

    $(".button-decimal").on("click", function () {
        errorCheck();

        var displayBottomVal = displayBottom.val();

        if (
            displayBottomVal != "" &&
            displayBottomVal != " " &&
            displayBottomVal.indexOf(".") < 1
        ) {
            displayBottom.val(displayBottomVal + $(this).val());
        }
    });

    $(".button-operator").on("click", function () {
        errorCheck();

        var operator = $(this).val(),
            displayBottomVal = displayBottom.val(),
            displayTopVal = displayTop.val();

        if (
            displayBottomVal != 0 &&
            displayBottomVal.charAt(displayBottomVal.length - 1) != "."
        ) {
            displayTop.val(displayTopVal + displayBottomVal + operator);
            displayBottom.val("");
            displayBottom.attr("placeholder", "");
        } else if (displayBottomVal == "0") {
            displayTop.val(displayTopVal + displayBottomVal + operator);
            displayBottom.val("");
            displayBottom.attr("placeholder", "");
        } else if (displayBottomVal.charAt(displayBottomVal.length - 1) == ".") {
            displayTop.val(displayTopVal + displayBottomVal.slice(0, -1) + operator);
            displayBottom.val("");
            displayBottom.attr("placeholder", "");
        } else if (displayTop.val() != 0) {
            displayTop.val(displayTopVal.slice(0, -1));
            return displayTop.val(displayTop.val() + operator);
        }
    });

    $(".button-equal").on("click", function () {
        var total = displayTop.val() + displayBottom.val(),
            calculate = eval(total);
        if (calculate === Infinity || calculate === -Infinity) {
            displayBottom.val("Can not divide by zero!");
            $(".display-bottom").css({
                "font-size": "1.5em"
            });
        } else if (isNaN(calculate)) {
            displayBottom.val("Result is undefined!");
            $(".display-bottom").css({
                "font-size": "1.5em"
            });
        } else {
            displayBottom.val(calculate);
            displayTop.val("");
        }
    });

    $(".button-delete-all").on("click", function () {
        displayTop.val("");
        displayBottom.val("");
    });

    $(".button-delete").on("click", function () {
        displayBottom.val("");
    });

    function errorCheck() {
        if (
            displayBottom.val() === "Can not divide by zero!" ||
            displayBottom.val() === "Result is undefined!"
        ) {
            displayTop.val("");
            displayBottom.val("");
        }
        $(".display-bottom").css({
            "font-size": "2.5em"
        });
    }
}

$(function () {
    calcResize();
    calculate();
});

$(window).resize(function () {
    calcResize();
});
