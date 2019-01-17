const app = getApp()

Page({
  data: {
    width: 60,
    height: 60,
    segment: 20,
    baseY: 400,
    cards: [],
    track0: [],
    track1: [],
    track2: [],
    track3: [],
    baseX: 100
  },

  find: function(card, name) {
    let track = this.data[name];
    for (let i = 0; i < track.length; i++) {
      if (track[i] === card) {
        return i;
      }
    }
    return -1;
  },

  resort: function() {
    let tracks = [1, 2, 3];
    tracks.forEach((name, index) => {
      let track = 'track' + name;
      this.data[track].forEach((card, idx) => {
        let y = 14 + 86 * index;
        let x = this.data.baseX + idx * (60 + 15);
        card.x = x;
        card.y = y;
      });
    });
  },

  distinct: function(card) {
    // 在所有轨道中寻找删除这个元素
    let tracks = [1, 2, 3];
    tracks.forEach((name, index) => {
      let track = 'track' + name;
      let idx = this.find(card, track);
      if (idx > -1) {
        this.data[track].splice(idx, 1);
      }
    });
  },

  end: function(e) {
    let {
      index
    } = e.target.dataset;
    let card = this.data.cards[index];
    let {
      _x,
      _y
    } = card;
    console.log(_x, _y);
    // 在第一块
    if (_y >= 0 && _y <= 58) {
      this.distinct(card);
      this.data.track1.push(card);
      this.fill(card);
    }
    // 在第二块 
    else if (_y > 58 && _y <= 140) {
      this.distinct(card);
      this.data.track2.push(card);
      this.fill(card);
    }
    // 第三块 
    else if (_y > 140 && _y <= 225) {
      this.distinct(card);
      this.data.track3.push(card);
      this.fill(card);
    }
    this.resort();
    this.setData({
      cards: this.data.cards
    });
  },

  move: function(e) {
    let {
      x,
      y
    } = e.detail;
    let {
      index
    } = e.target.dataset;
    let card = this.data.cards[index];
    card._x = x;
    card._y = y;
  },

  next: function() {

  },

  previous: function() {

  },

  fill: function(card) {
    let idx = this.find(card, 'track0');
    if (idx > -1) {
      this.data.track0.splice(idx, 1);
    }
    this.data.track0.forEach((card, i) => {
      let j = i;
      if (i > 3) {
        j = 3;
      }
      card.x = 82 + j * (this.data.width + this.data.segment);
      card.y = this.data.baseY;
    });
  },

  onLoad: function() {
    for (let i = 0; i < 5; i++) {
      let j = i;
      if (i > 3) {
        j = 3;
      }
      let card = {
        x: 82 + j * (this.data.width + this.data.segment),
        y: this.data.baseY,
        _x: 0,
        _y: 0
      };
      this.data.track0.push(card);
      this.data.cards.push(card);
    }
    this.setData({
      cards: this.data.cards
    });
  }
})