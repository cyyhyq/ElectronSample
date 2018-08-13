
var AutoLaunch = require('auto-launch');
var minecraftAutoLauncher = new AutoLaunch({
    name: 'Electron Demo',
    path: process.execPath  //当前运行程序或改成绝对路径
});
function enableAutoLauch() {
    minecraftAutoLauncher.enable();
    minecraftAutoLauncher.isEnabled()
        .then(function (result) {
            if (result) {
                alert("设置开机启动成功！");
            }
        })
        .catch(function (err) {
            console.error(err);
        });
}
