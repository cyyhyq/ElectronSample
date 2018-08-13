const { shell, clipboard } = require('electron');
const path = require("path");
const child = require('child_process');

function openScreenShot() {
   
    if (isWindows()) {
        var screenShotExePath = path.join(__dirname, "screen", "win", "Capture.exe");
       
        child.execFile(screenShotExePath, function (err, data) {
            if (err == null) {  //完成截图
                finishShot(1);
            }
         
        });
    }
    else { //MacOS
        var screenShotExePath = path.join(__dirname, "screen", "mac", "ScreenCapture.app/Contents/MacOS/ScreenCapture");
        var screenShotPatharam = ['startfromlocal,' + path.join(__dirname, 'set.info ') + ',' + path.join(__dirname, 'response.info') + ',0,3,0,0,0,0,0'];
        child.spawn(screenShotExePath, screenShotPatharam, { stdio: 'inherit' }).on('close', function (code) {
            finishShot(code);
        })

    }

}

function finishShot(code) {
    if (code == 1) {
        let nativeImage = clipboard.readImage('selection');
        if (nativeImage.getSize().width > 0) //粘贴图片
        {
            var image = clipboard.readImage();
            let nativeImageSrc = image.toDataURL();
            let html = "<img  src='" + nativeImageSrc + "' alt='' />";
            $("#snapShotContent").html(html);
        }
    }
    else if (code == 2) {//取消截图
    }
    else if (code == 3) {//保存截图
    }
}
function isWindows() {
    var os = require("os");
    return os.platform() == "win32";
}