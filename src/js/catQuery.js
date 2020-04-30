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
  overCat(left, top, cat) {
    let result = false;

    if (left < cat.right && left + 75 > cat.left) {
      if (top < cat.bottom && top + 75 > cat.top) {
        result = true;
      }
    };
    return result;
  },
  move(left, top, cat) {
    if (left > cat.left) {
      cat.left = cat.left + Math.ceil(Math.random() * 5);
      cat.right = cat.left + 150;
    } else {
      cat.left = cat.left - Math.ceil(Math.random() * 5);
      cat.right = cat.left + 150;
    }
    if (top > cat.top) {
      cat.top = cat.top + Math.ceil(Math.random() * 5);
      cat.bottom = cat.top + 150;
    } else {
      cat.top = cat.top - Math.ceil(Math.random() * 5);
      cat.bottom = cat.top + 150;
    }

  },
}

export { CatQuery };