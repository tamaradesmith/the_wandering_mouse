const PawQuery = {
  setup() {
    const number = Math.ceil(Math.random() * 3) + 1;
    const paws = [];
    let index = 0;
    while (index < number) {
      paws.push(`paw${index}`);
      index++;
    };
    const result = [];
    paws.forEach(newpaw => {
      const paw = this.location(newpaw);
      if (result.length === 0) {
        result.push(paw);
      } else {
        const checked = this.checkPaw(result, paw);
        result.push(checked);
      };
    });
    return result;
  },
  location(index) {
    let xPos = Math.ceil(Math.random() * 1150);
    let yPos = Math.ceil(Math.random() * 750);
    while ((xPos < 100 && yPos < 100) || (xPos > 1000 && yPos > 600)) {
      xPos = Math.ceil(Math.random() * 1100);
      yPos = Math.ceil(Math.random() * 700);
      if (xPos > 1100 && yPos > 700) {
        xPos = 10;
        yPos = 10;
      };
    }
    const location = { paw: index, freeze: false, left: xPos, right: xPos + 30, top: yPos, bottom: yPos + 30 };
    return location;
  },

  checkPaw(allPaws, paw) {
    allPaws.forEach(oldPaw => {
      let flag = 0;
      while (oldPaw.left < paw.right && oldPaw.right > paw.left && flag === 0) {
        if (oldPaw.top < paw.bottom && oldPaw.bottom > paw.top) {
          paw = this.location(paw.paw);
        } else {
          flag = 1;
        };
      };
      return paw;
    })
    return paw;
  },
  overPaw(mouse, paws, found) {
    let result = { result: false };

    paws.forEach((paw, index) => {
      if (mouse.left < paw.right && mouse.right > paw.left) {
        if (mouse.top < paw.bottom && mouse.bottom > paw.top) {
          if (!paw.freeze) {
            let number = 0;
            paws.forEach(paw => {
              number = (paw.freeze === false) ? number + 1 : number;
            })
            console.log("overPaw -> number", number);
            if (found !== true) {
              const rNumber = Math.ceil(Math.random() * number)
              result.bomb = (rNumber === number) ? true : false
              result.id = paw.paw;
              result.result = true;
              result.index = index;
            } else {
              result.bomb = false;
              result.id = paw.paw;
              result.result = true;
              result.index = index;
            }
          }
        };
      };
    });
    return result;
  },
  setupMouseBomb(mouse) {
    const number = Math.floor(Math.random() * 5) + 3;
    let index = 0
    const mice = [];
    while (index < number) {
      mice.push(`mice${index}`);
      index++;
    };
    const locations = [];
    mice.forEach(one => {
      const result = { id: one, freeze: false };
      const hoz = Math.ceil(Math.random() * 75);
      const ver = Math.ceil(Math.random() * 75);
      const addHoz = (Math.random() < .5) ? true : false;
      const addVer = (Math.random() < .5) ? true : false;
      if (addHoz) {
        result.left = mouse.left + hoz;
        result.right = result.left + 30;
      } else {
        result.left = mouse.left - hoz;
        result.right = result.left + 30;
      };
      if (addVer) {
        result.top = mouse.top + ver;
        result.bottom = result.top + 30;
      } else {
        result.top = mouse.top - ver;
        result.bottom = result.top + 30;
      };
      locations.push(result);
    });
    return locations;
  },
};

export { PawQuery };