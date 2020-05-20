const RocksQuery = {
  setup(level) {
    const add = (level < 3) ? 1 : level - 1;
    const number = Math.ceil(Math.random() * 3) + add;
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
          result.push(checkedRock);
        };
      };
    });
    return result;
  },

  location() {
    let xPos = Math.ceil(Math.random() * 1100);
    let yPos = Math.ceil(Math.random() * 700);
    if (xPos < 120 && yPos < 120) {
      if (xPos < 120) {
        xPos = 125;
      } else {
        yPos = 125
      }
    }
    if (xPos > 975 && yPos > 550) {
      if (xPos > 1000) {
        xPos = 975;
      } else {
        yPos = 550;
      };
    };
    const location = { left: xPos, right: xPos + 90, top: yPos, bottom: yPos + 90 };
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
  catInRock(level) {
    const number = 0.15 + (0.05 * level)
    return (Math.random() < number) ? true : false;
  }
}

export { RocksQuery };