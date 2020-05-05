const CatQuery = {
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
  overCat(mouse, cat) {
    let result = false;

    if (mouse.left < cat.right && mouse.right > cat.left) {
      if (mouse.top < cat.bottom && mouse.bottom > cat.top) {
        result = true;
      }
    };
    return result;
  },
  move(mouse, cat) {
    if (mouse.left > cat.left) {
      cat.left = cat.left + Math.ceil(Math.random() * 5);
      cat.right = cat.left + 150;
    } else if (mouse.left < cat.left) {
      cat.left = cat.left - Math.ceil(Math.random() * 5);
      cat.right = cat.left + 150;
    }
    if (mouse.top > cat.top) {
      cat.top = cat.top + Math.ceil(Math.random() * 5);
      cat.bottom = cat.top + 150;
    } else if (mouse.top < cat.top) {
      cat.top = cat.top - Math.ceil(Math.random() * 5);
      cat.bottom = cat.top + 150;
    }
    return cat;
  },
  overMice(cat, mice) {
    let status = false;
    mice.map((mouse) => {
      if (mouse.freeze === false){
      let oneMouse = false;
      if (mouse.left < cat.right && mouse.right > cat.left) {
        if (mouse.top < cat.bottom && mouse.bottom > cat.top) {
          status = true;
        }
      };
      if (oneMouse === false) {
       this.miceMove(mouse);
      }}
    });
    const result = { status: status }
    return result;
  },
  miceMove(mouse) {
    const ver = Math.ceil(Math.random() * 20);
    const hor = Math.ceil(Math.random() * 20);
    const addVer = (Math.random() < .49) ? true : false;
    const addHor = (Math.random() < .49) ? true : false;
    if (addVer) {
      mouse.top = mouse.top + ver;
      mouse.bottom = mouse.top + 30;
    } else {
      mouse.top = mouse.top - ver;
      mouse.bottom = mouse.top + 30;
    }
    if (addHor) {
      mouse.left = mouse.left + hor;
      mouse.right = mouse.left + 30;
    } else {
      mouse.left = mouse.left - hor;
      mouse.right = mouse.left + 30;
    }
    if (mouse.top < 0 || mouse.bottom > 800 || mouse.left < 0 || mouse.right > 1200) {
      mouse.freeze = true;
    }
  },
}

export { CatQuery };