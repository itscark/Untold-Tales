window.onload = function () {
    let pathname = window.location.href.replace('qrcode', 'arjs');

    let url = new URL(window.location.href);

    const qrcode = new QRCode(document.getElementById("qrcode"), {
        width: 150,
        height: 150
    });
    qrcode.makeCode(pathname);
};