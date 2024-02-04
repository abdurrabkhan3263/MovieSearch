let bar = document.querySelector('.bar');
let mobileSec = document.querySelector('#mobileSer-sec');
function checkSec(){
    mobileSec.style.right = ((mobileSec.style.right) === '0px') ? '-300px' : '0px';
}
bar.addEventListener('click' , ()=>{
    checkSec();
})
document.querySelector('#crossBtn').addEventListener('click' , ()=>{
    checkSec();
})