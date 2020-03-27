window.onload = function () {
    //search the url and replace items with correct part to generate the right QR Code
    let pathname = window.location.href.replace('qrcode', 'arjs');
    //generate a new url with the correct parameters
    let url = new URL(window.location.href);
    //QRCode is a js lib to dynamicaly generate qr codes first set needed parameters
    const qrcode = new QRCode(document.getElementById("qrcode"), {
        //there are different Correction levels for the qrcode to restore data if it is damaged or dirty.
        // L is up to 7% error correction -> because the qr code will only displayed digital the chances of a qr code to get damaged or dirty is very small.
        correctLevel : QRCode.CorrectLevel.L
    });
    //generate the QR Code and append it to the Dom element.
    qrcode.makeCode(pathname);
};