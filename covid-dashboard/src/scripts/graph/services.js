const services = {
  handleNavArrows(arrow, activeNavItemIndex, navItemsArray, chartsArray) {
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
  },

  setNavAttribute(navigation) {
    const navItemsArray = Object.values(navigation.children).filter((element) => {
      return element.className.includes('nav-item');
    });
    const activeNavItemIndex = navItemsArray.findIndex((elem) => elem.className.includes('active'));
    if (activeNavItemIndex === 0) {
      navigation.setAttribute('data-type', 'cases');
      navigation.setAttribute('data-period', 'today');
      navigation.setAttribute('data-magnitude', 'absolute');
    }
    if (activeNavItemIndex === 1) {
      navigation.setAttribute('data-type', 'deaths');
      navigation.setAttribute('data-period', 'today');
      navigation.setAttribute('data-magnitude', 'absolute');
    }
    if (activeNavItemIndex === 2) {
      navigation.setAttribute('data-type', 'recovered');
      navigation.setAttribute('data-period', 'today');
      navigation.setAttribute('data-magnitude', 'absolute');
    }
    if (activeNavItemIndex === 3) {
      navigation.setAttribute('data-type', 'cases');
      navigation.setAttribute('data-period', 'today');
      navigation.setAttribute('data-magnitude', 'per 100 thousand');
    }
    if (activeNavItemIndex === 4) {
      navigation.setAttribute('data-type', 'deaths');
      navigation.setAttribute('data-period', 'today');
      navigation.setAttribute('data-magnitude', 'per 100 thousand');
    }
    if (activeNavItemIndex === 5) {
      navigation.setAttribute('data-type', 'recovered');
      navigation.setAttribute('data-period', 'today');
      navigation.setAttribute('data-magnitude', 'per 100 thousand');
    }
    if (activeNavItemIndex === 6) {
      navigation.setAttribute('data-type', 'cases');
      navigation.setAttribute('data-period', 'total');
      navigation.setAttribute('data-magnitude', 'absolute');
    }
    if (activeNavItemIndex === 7) {
      navigation.setAttribute('data-type', 'deaths');
      navigation.setAttribute('data-period', 'total');
      navigation.setAttribute('data-magnitude', 'absolute');
    }
    if (activeNavItemIndex === 8) {
      navigation.setAttribute('data-type', 'recovered');
      navigation.setAttribute('data-period', 'total');
      navigation.setAttribute('data-magnitude', 'absolute');
    }
    if (activeNavItemIndex === 9) {
      navigation.setAttribute('data-type', 'cases');
      navigation.setAttribute('data-period', 'total');
      navigation.setAttribute('data-magnitude', 'per 100 thousand');
    }
    if (activeNavItemIndex === 10) {
      navigation.setAttribute('data-type', 'deaths');
      navigation.setAttribute('data-period', 'total');
      navigation.setAttribute('data-magnitude', 'per 100 thousand');
    }
    if (activeNavItemIndex === 11) {
      navigation.setAttribute('data-type', 'recovered');
      navigation.setAttribute('data-period', 'total');
      navigation.setAttribute('data-magnitude', 'per 100 thousand');
    }
  }
};

export default services;
