'use strict';

const model = {
  currentGroup: '',
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
  getCurrentCard(name) {
    const group = this.allGroup.get(this.currentGroup);
    const currentCard = group.find((c) => {
      const isFind = c.getEnglishWord() === name || c.getRussianWord() === name;
      return isFind;
    });
    return currentCard;
  },
  getCurrentGroup() {
    return this.allGroup.get(this.currentGroup);
  },
};

export default model;
