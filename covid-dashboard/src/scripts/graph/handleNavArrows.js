export default function handleNavArrows(arrow, activeNavItemIndex, navItemsArray, chartsArray) {
  if (arrow === 'left') {
    navItemsArray[activeNavItemIndex].classList.toggle('active');
    chartsArray[activeNavItemIndex].classList.toggle('active');
    if (activeNavItemIndex > 0) {
      navItemsArray[activeNavItemIndex - 1].classList.toggle('active');
      chartsArray[activeNavItemIndex - 1].classList.toggle('active');
    } else {
      navItemsArray[navItemsArray.length - 1].classList.toggle('active');
      chartsArray[navItemsArray.length - 1].classList.toggle('active');
    }
  }

  if (arrow === 'right') {
    navItemsArray[activeNavItemIndex].classList.toggle('active');
    chartsArray[activeNavItemIndex].classList.toggle('active');
    if (activeNavItemIndex < navItemsArray.length - 1) {
      navItemsArray[activeNavItemIndex + 1].classList.toggle('active');
      chartsArray[activeNavItemIndex + 1].classList.toggle('active');
    } else {
      navItemsArray[0].classList.toggle('active');
      chartsArray[0].classList.toggle('active');
    }
  }
}