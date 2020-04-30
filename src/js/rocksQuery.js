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
    let yPos = Math.ceil(Math.random() * 750);
    while (xPos < 100 && yPos < 100 ) {
      xPos = Math.ceil(Math.random() * 1100);
      yPos = Math.ceil(Math.random() * 750);
      if (xPos > 1100 && yPos > 700){
        xPos = 10;
        yPos = 10;
      };
    };
    const location = { left: xPos, right: xPos + 100, top: yPos, bottom: yPos + 75 };
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
  overRock(left, top, rocks) {
    let result = false;
    rocks.forEach(rock => {
      if (left < rock.right && left + 75 > rock.left) {
        if (top < rock.bottom && top + 75 > rock.top) {
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