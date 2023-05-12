const outputLabel : HTMLElement = <HTMLElement> document.getElementById("webgpu-check");

if(navigator.gpu){
    outputLabel.innerText = "このブラウザーはwebgpuに対応しています"
}else{
    outputLabel.innerText = "このブラウザーはwebgpuに対応していません"
}