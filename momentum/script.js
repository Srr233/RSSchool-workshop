const changeImgButtons = document.querySelector('.img-change__buttons').children;

for (let i = 0; i < changeImgButtons.length; i++) {
    changeImgButtons[i].addEventListener('click', () => document.querySelector('.img-change__img').classList.add('animated'));
}