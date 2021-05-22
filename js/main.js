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
      algoRes: [],
      hintView: false,
      hintArr: [
        [10, 10, 10, 10],
        [10, 10, 10, 10],
        [10, 10, 10, 10],
        [10, 10, 10, 10],
        [10, 10, 10, 10],
        [10, 10, 10, 10],
        [10, 10, 10, 10],
        [10, 10, 10, 10],
        [10, 10, 10, 10],
        [10, 10, 10, 10],
      ],
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
        let testArrs = [];
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
        this.algoRes.push({ arr: text, judge: ans });
        testArrs = this.searchTalentArr();
        this.probability(testArrs);
        if (ans[0] === 4) {
          this.isFinished = true;
        }
        text[4] = ans[0];
        text[5] = ans[1];
        this.res.push(text);
        // document.querySelector("ul").appendChild(li);
        this.reset();
      },
      probability(arrs) {
        let length = arrs.length;
        for (let i = 0; i < 10; i++) {
          this.hintArr[i].fill(0);
        }
        for (let i = 0; i < length; i++) {
          for (let j = 0; j < 4; j++) {
            this.hintArr[arrs[i][j]][j]++;
          }
        }
        for (let i = 0; i < 10; i++) {
          for (let j = 0; j < 4; j++) {
            this.hintArr[i].splice(
              j,
              1,
              Math.round((this.hintArr[i][j] / length) * 10000) / 100
            );
          }
        }
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
        this.algoRes = [];
        for (let i = 0; i < 10; i++) {
          this.hintArr[i].fill(10);
        }
      },
      reset() {
        for (let i = 0; i < 10; i++) {
          this.numList[i].able = true;
        }
        this.attackNum = [, , , ,];
        this.selectedNum = null;
      },
      algo() {
        this.count = 0;
        for (let i = 0; i < this.numList.length; i++)
          this.numList[i].able = true;
        let source = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        let source1, source2, source3, source4;
        source1 = source.slice();
        let p1, p2, p3, p4;
        for (let i = 0; i < 10; i++) {
          p1 = source1.splice(i, 1)[0];
          source2 = source1.slice();
          for (let p = 0; p < 9; p++) {
            p2 = source2.splice(p, 1)[0];
            source3 = source2.slice();
            for (let s = 0; s < 8; s++) {
              p3 = source3.splice(s, 1)[0];
              source4 = source3.slice();
              for (let t = 0; t < 7; t++) {
                p4 = source4.splice(0, 1)[0];
                this.attackNum = [p1, p2, p3, p4].slice();
                if (this.isAlgoDo(this.attackNum)) {
                  let ans = this.judge(this.attackNum, this.answer);
                  this.algoRes.push({ arr: this.attackNum, judge: ans });
                  if (ans[0] === 4) this.isFinished = true;
                  this.count++;
                  let text = this.attackNum;
                  text[4] = ans[0];
                  text[5] = ans[1];
                  this.res.push(text);
                }
              }
              source3 = source2.slice();
            }
            source2 = source1.slice();
          }
          source1 = source.slice();
        }
        this.attackNum = [, , , ,];
      },
      isAlgoDo(attackArr) {
        for (let i = 0; i < this.algoRes.length; i++) {
          let resArr = this.judge(this.algoRes[i].arr, attackArr);
          if (
            resArr[0] != this.algoRes[i].judge[0] ||
            resArr[1] != this.algoRes[i].judge[1]
          )
            return false;
        }
        return true;
      },
      searchTalentArr() {
        let testArrs = [];
        let source = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        let source1, source2, source3, source4;
        let p1, p2, p3, p4;
        source1 = source.slice();
        for (let i = 0; i < 10; i++) {
          p1 = source1.splice(i, 1)[0];
          source2 = source1.slice();
          for (let p = 0; p < 9; p++) {
            p2 = source2.splice(p, 1)[0];
            source3 = source2.slice();
            for (let s = 0; s < 8; s++) {
              p3 = source3.splice(s, 1)[0];
              source4 = source3.slice();
              for (let t = 0; t < 7; t++) {
                p4 = source4.splice(0, 1)[0];
                this.attackNum = [p1, p2, p3, p4];
                if (this.isAlgoDo(this.attackNum)) {
                  testArrs.push(this.attackNum);
                }
              }
              source3 = source2.slice();
            }
            source2 = source1.slice();
          }
          source1 = source.slice();
        }
        return testArrs;
      },
      algo2() {
        let testArr = [];
        let testArrs = [];
        this.count = 0;
        for (let i = 0; i < this.numList.length; i++)
          this.numList[i].able = true;
        while (!this.isFinished) {
          testArrs = this.searchTalentArr();
          testArr = testArrs.splice(
            Math.floor(Math.random() * testArrs.length),
            1
          )[0];
          let ans = this.judge(testArr, this.answer);
          this.algoRes.push({ arr: testArr, judge: ans });
          if (ans[0] === 4) this.isFinished = true;
          this.count++;
          let text = testArr;
          text[4] = ans[0];
          text[5] = ans[1];
          this.res.push(text);
          this.attackNum = [, , , ,];
          testArrs = [];
        }
      },
      hint() {
        this.hintView = !this.hintView;
      },
      algo3() {
        for (let i = 0; i < this.numList.length; i++)
          this.numList[i].able = true;
        let testArr = [];
        let testArrs = [];
        let evaluation;
        let eva;
        while (!this.isFinished && this.count < 10) {
          evaluation = 0;
          testArrs = this.searchTalentArr();
          this.probability(testArrs);
          let length = testArrs.length;
          for (let i = 0; i < length; i++) {
            eva = 0;
            for (let j = 0; j < 4; j++) {
              eva += this.hintArr[testArrs[i][j]][j];
            }
            if (eva > evaluation) {
              testArr = testArrs[i];
              evaluation = eva;
              // if (this.count > 1) console.log(testArr + ":eva->" + eva);
            }
            // if (i == 0 && j == 1) console.log(this.hintArr);
          }
          // console.log("--------");
          let ans = this.judge(testArr, this.answer);
          this.algoRes.push({ arr: testArr, judge: ans });
          if (ans[0] === 4) this.isFinished = true;
          this.count++;
          let text = testArr;
          text[4] = ans[0];
          text[5] = ans[1];
          this.res.push(text);
          // console.log(this.hintArr);
          this.attackNum = [, , , ,];
          testArrs = [];
        }
      },
    },
    mounted: function () {
      this.makeArr();
    },
  });
}
