const RocksQuery = {
  setup(rockLocations) {
    if (rockLocations !== 0) {
      const number = Math.ceil(Math.random() * 3) + 1;
      const rocks = [];
      let index = 0;
      while (index < number) {
        rocks.push({ rock: `rock${index}` });
        index++;
      }
      const result = [];
      rocks.forEach(rock => {
        const newRock = this.location();
        if (result.length === 0) {
          result.push(newRock);
        } else {
          const checkedRock = this.checkRock(result, newRock);
          if (checkedRock !== "conflict") {
            result.push(checkedRock)
          }
        }
      })
      return result;
    }
  },
  location() {
    let xPos = Math.ceil(Math.random() * 1100);
    let yPos = Math.ceil(Math.random() * 700);
    while ((xPos < 100 && yPos < 100) ||( xPos > 1000 && yPos > 600) ) {
      xPos = Math.ceil(Math.random() * 1100);
      yPos = Math.ceil(Math.random() * 700);
      if (xPos > 1100 && yPos > 700){
        xPos = 10;
        yPos = 10;
      };
    };
    const location = { left: xPos, right: xPos + 100, top: yPos, bottom: yPos + 100 };
    return location;
  },
  checkRock(rocks, newRock) {
    rocks.forEach(oldRock => {
      let flag = 0;
      while (oldRock.left < newRock.right && oldRock.right > newRock.left && flag === 0) {
        if (oldRock.top < newRock.bottom && oldRock.bottom > newRock.top) {
                  newRock = this.location();
        } else {
          flag = 1;
        };
      };
      return newRock;
    })
    return newRock;
  },
  overRock(mouse, rocks) {
    let result = false;
    rocks.forEach(rock => {
      if (mouse.left < rock.right && mouse.right > rock.left) {
        if (mouse.top < rock.bottom && mouse.bottom > rock.top) {
          result = true
        }
      }
    })
    return result;
  },
  catInRock(){
    return ( Math.random() < .5) ? true : false;
  }
}

export { RocksQuery };