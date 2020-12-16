'use strict'

{
  function makeArr(){
    const source = [];
    const arr = [];
    for (let i = 0; i < 10; i++) {
      source[i] = i;
    }
    for (let i = 0; i < 4; i++) {
      arr[i] = source.splice(Math.floor(Math.random() * source.length), 1)[0];
    }
    return arr;
  }

  function judge(source,arr){
    let hit = 0;
    let blow = 0;
    for (let i = 0; i < 4; i++) {
      for (let t = 0; t < 4; t++) {
        if (i===t) {
          if (source[i] === arr[t]) {
            hit += 1;
          }
        } else {
          if (source[i] === arr[t]) {
            blow += 1;
          }
        }
      }
    }
    return [hit,blow];
  }

  function check(arr){
    let count = 0;
    document.querySelector('button').addEventListener('click', ()=>{
      count += 1;
      const text = [];
      const li = document.createElement('li');
      for (let i = 0; i < 4; i++) {
        text[i] = document.querySelectorAll('select')[i].value-0;
      }
      const ans = judge(arr, text);
      if (ans[0]===4){
        li.textContent = `${text}   hit:${ans[0]} blow:${ans[1]}  CHECKMATE!!!!`;
        document.querySelector('h1').textContent = `${count}回でクリア！！！！！！！！`

      }else{
        li.textContent = `${text}   hit:${ans[0]} blow:${ans[1]}`;
      }
      document.querySelector('ul').appendChild(li);
    });
  }
  const arr = makeArr();
  console.log(arr);
  check(arr);
}