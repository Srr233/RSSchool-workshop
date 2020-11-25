'use strict';

const forCard = {
  createLink(numberImg, group) {
    let num;
    if (numberImg.toString().length < 2) {
      num = `0${numberImg}`;
    }
    return `../assets/img/${group}/${num}.jpg`;
  },
};

const forModel = {

};

const forView = {

};

const forController = {

};

export {
  forCard, forModel, forView, forController,
};
