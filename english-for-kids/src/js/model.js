'use strict';

const model = {
  currentGroup: '',
  isPlay: false,
  allGroup: new Map(),
  setGroups(map) {
    if (!(map instanceof Map)) throw new Error('Argument isn\'t Map class');
    this.allGroup = map;
  },
  setCurrentGroup(group) {
    if (typeof group !== 'string' || !this.allGroup.get(group)) {
      throw new Error('Argument should be a string and group cards should be exist!');
    }
    this.currentGroup = group;
  },
  play() {
    this.isPlay = true;
    const currentCards = this.allGroup.get(this.currentGroup);
    currentCards.forEach((card) => { card.play = true; });
  },
  train() {
    this.isPlay = false;
    const currentCards = this.allGroup.get(this.currentGroup);
    currentCards.forEach((card) => { card.play = false; });
  },
  getCurrentGroup() {
    return this.allGroup.get(this.currentGroup);
  },
};

export default model;
