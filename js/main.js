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
      isFinished: false,
      answer: "",
      count: 0,
      res: [],
    },
    methods: {
      putNum: function (num) {
        const del = this.attackNum.splice(num, 1, this.selectedNum);
        if (del[0] || del[0] == 0) {
          this.numList[del[0]].able = true;
        }
        this.numList[this.selectedNum].able = false;
        this.selectedNum = null;
      },
      selectNum: function (num) {
        if (this.numList[num].able) {
          this.selectedNum = num;
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
        if (
          this.attackNum[0] == undefined ||
          this.attackNum[1] == undefined ||
          this.attackNum[2] == undefined ||
          this.attackNum[3] == undefined
        )
          return;
        this.count += 1;
        const text = this.attackNum;
        // const li = document.createElement("li");
        const ans = this.judge(this.answer, text);
        if (ans[0] === 4) {
          this.isFinished = true;
        } else {
          // li.textContent =
          //   text + "<br>" + `${text}  　hit:${ans[0]} blow:${ans[1]}`;
        }
        text[4] = ans[0];
        text[5] = ans[1];
        this.res[this.count - 1] = text;
        // document.querySelector("ul").appendChild(li);
        this.reset();
      },
      viewAns: function () {
        this.isFinished = true;
      },
      restart: function () {
        this.reset();
        this.makeArr();
        this.isFinished = false;
        this.res = [];
        this.count = 0;
      },
      reset() {
        for (let i = 0; i < 10; i++) {
          this.numList[i].able = true;
        }
        this.attackNum = [, , , ,];
        this.selectedNum = null;
      },
    },
    mounted: function () {
      this.makeArr();
    },
  });
}
