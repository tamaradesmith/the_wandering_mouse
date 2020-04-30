const GrassQuery = {
  setup(grassLocations) {
    const number = Math.ceil(Math.random() * 2);
    const grass = [];
    let index = 0;
    while (index < number) {
      grass.push(`grass${index}`);
      index++;
    };
    const result = [];
    grass.forEach(newGrass => {
      const blade = this.location();
      if (result.length === 0) {
        result.push(blade);
      } else {
        const checked = this.checkGrass(result, blade);
        result.push(checked);
      };
    });
    return result;
  },
  location() {
    let xPos = Math.ceil(Math.random() * 1100);
    let yPos = Math.ceil(Math.random() * 700);
    while (xPos < 100 && yPos < 100) {
      xPos = Math.ceil(Math.random() * 1100);
      yPos = Math.ceil(Math.random() * 700);
      if (xPos > 1100 && yPos > 700) {
        xPos = 10;
        yPos = 10;
      };
    }
    const location = { left: xPos, right: xPos + 100, top: yPos, bottom: yPos + 100 };
    return location;
  },
  checkGrass(allGrass, grass) {
    allGrass.forEach(oldgrass => {
      let flag = 0;
      while (oldgrass.left < grass.right && oldgrass.right > grass.left && flag === 0) {
        if (oldgrass.top < grass.bottom && oldgrass.bottom > grass.top) {
          grass = this.location();
        } else {
          flag = 1;
        };
      };
      return grass;
    })
    return grass;
  },
  checkRocks(grass, rocks) {
    grass.forEach(blade => {
      let flag = 0
      rocks.forEach(rock => {
        while (rock.left < blade.right && rock.right > blade.left && flag === 0) {
          if (rock.top < blade.bottom && rock.bottom > blade.top) {
            blade = this.location();
            blade = this.checkGrass(rocks, blade);
          } else {
            flag = 1;
          };
        }
      })
    })
    return grass;
  },
  overGrass(left, top, grass) {
    let result = false;
    grass.forEach(blade => {
      if (left < blade.right && left + 75 > blade.left) {
        if (top < blade.bottom && top + 75 > blade.top) {
          result = (Math.random() < .3) ? true : false;
        };
      };
    });
    return result;
  },
};

export { GrassQuery };