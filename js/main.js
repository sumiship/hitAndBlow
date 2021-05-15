"use strict";

{
  const appVm = new Vue({
    el: "#app",
    data: {
      numList: [
        {
          num: 0,
          able: true,
        },
        {
          num: 1,
          able: true,
        },
        {
          num: 2,
          able: true,
        },
        {
          num: 3,
          able: true,
        },
        {
          num: 4,
          able: true,
        },
        {
          num: 5,
          able: true,
        },
        {
          num: 6,
          able: true,
        },
        {
          num: 7,
          able: true,
        },
        {
          num: 8,
          able: true,
        },
        {
          num: 9,
          able: true,
        },
      ],
      attackNum: [, , , ,],
      selectedNum: null,
      attackAble: false,
      answer: "",
      count: 0,
    },
    methods: {
      putNum: function (num) {
        const del = this.attackNum.splice(num, 1, this.selectedNum);
        if (del[0]) {
          this.numList[del[0]].able = true;
        }
        this.numList[this.selectedNum].able = false;
        this.selectedNum = null;
        // console.log(this.numList[this.selectedNum].able);
        // console.log("attackNum:" + this.attackNum);
      },
      selectNum: function (num) {
        if (this.numList[num].able) {
          this.selectedNum = num;
          console.log("selectedNum:" + this.selectedNum);
        }
      },
      makeArr: function () {
        const source = [];
        const arr = [];
        for (let i = 0; i < 10; i++) {
          source[i] = i;
        }
        for (let i = 0; i < 4; i++) {
          arr[i] = source.splice(
            Math.floor(Math.random() * source.length),
            1
          )[0];
        }
        this.answer = arr;
        console.log(arr);
      },
      judge: function (source, arr) {
        let hit = 0;
        let blow = 0;
        for (let i = 0; i < 4; i++) {
          for (let t = 0; t < 4; t++) {
            if (i === t) {
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
        return [hit, blow];
      },
      check: function () {
        this.count += 1;
        const text = this.attackNum;
        const li = document.createElement("li");
        const ans = this.judge(this.answer, text);
        if (ans[0] === 4) {
          li.textContent = `${text}   hit:${ans[0]} blow:${ans[1]}  CHECKMATE!!!!`;
          document.querySelector(
            "h1"
          ).textContent = `${this.count}回でクリア！！！！！！！！`;
        } else {
          li.textContent = `${text}  　hit:${ans[0]} blow:${ans[1]}`;
        }
        document.querySelector("ul").appendChild(li);
        this.reset();
      },
      reset() {
        for (let i = 0; i < 10; i++) {
          this.numList[i].able = true;
          this.attackNum = [, , , ,];
          this.selectedNum = null;
        }
      },
    },
    mounted: function () {
      this.makeArr();
    },
  });

  // function makeArr() {
  //   const source = [];
  //   const arr = [];
  //   for (let i = 0; i < 10; i++) {
  //     source[i] = i;
  //   }
  //   for (let i = 0; i < 4; i++) {
  //     arr[i] = source.splice(Math.floor(Math.random() * source.length), 1)[0];
  //   }
  //   return arr;
  // }

  // function judge(source, arr) {
  //   let hit = 0;
  //   let blow = 0;
  //   for (let i = 0; i < 4; i++) {
  //     for (let t = 0; t < 4; t++) {
  //       if (i === t) {
  //         if (source[i] === arr[t]) {
  //           hit += 1;
  //         }
  //       } else {
  //         if (source[i] === arr[t]) {
  //           blow += 1;
  //         }
  //       }
  //     }
  //   }
  //   return [hit, blow];
  // }

  // function check(arr) {
  //   let count = 0;
  //   document.querySelector("button").addEventListener("click", () => {
  //     count += 1;
  //     const text = [];
  //     const li = document.createElement("li");
  //     for (let i = 0; i < 4; i++) {
  //       text[i] = document.querySelectorAll("select")[i].value - 0;
  //     }
  //     const ans = judge(arr, text);
  //     if (ans[0] === 4) {
  //       li.textContent = `${text}   hit:${ans[0]} blow:${ans[1]}  CHECKMATE!!!!`;
  //       document.querySelector(
  //         "h1"
  //       ).textContent = `${count}回でクリア！！！！！！！！`;
  //     } else {
  //       li.textContent = `${text}   　　　　hit:${ans[0]} blow:${ans[1]}`;
  //     }
  //     document.querySelector("ul").appendChild(li);
  //   });
  // }
}
