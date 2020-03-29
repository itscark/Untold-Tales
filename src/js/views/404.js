window.onload = function () {
    let pageX = document.body.clientWidth;
    let pageY = document.body.clientHeight;
    let mouseY=0;
    let mouseX=0;
    document.addEventListener('mousemove', function (event) {
        //verticalAxis
        mouseY = event.pageY;
        let yAxis = (pageY/2-mouseY)/pageY*300;
        //horizontalAxis
        mouseX = event.pageX / -pageX;
        let xAxis = -mouseX * 100 - 100;

        let ghostEyes = document.querySelectorAll('.box__ghost-eyes');

        ghostEyes[0].style.transform = 'translate('+ xAxis +'%,-'+ yAxis +'%)';
    });
};