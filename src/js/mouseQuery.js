const MouseQuery = {
  overMouse(xpos, ypos, mouse) {
    const newMouse = mouse;

    if (xpos > mouse.left + (75 / 2)){
      newMouse.left = mouse.left + 3;
    } else if (xpos < mouse.left + (75 / 2)){
      newMouse.left = mouse.left - 3;
    };
    if (ypos > mouse.top + (75 / 2)) {
      newMouse.top = mouse.top + 3;
    } else if (ypos < mouse.top + (75/2)) {
      newMouse.top = mouse.top - 3;
    };
    if (newMouse.left < 0) {
      mouse.left = 0 + 5;
    }
    if (newMouse.left + 75 > 1200) {
      newMouse.left = 1200 - 80;
    }
    if (newMouse.top < 0) {
      newMouse.top = 0 + 5;
    }
    if (newMouse.top + 75 > 800) {
      newMouse.top = 800 - 80;
    }
      newMouse.right = newMouse.left + 75;
      newMouse.bottom = newMouse.top + 75;
      return newMouse;

  },
  mouseHole(mouse, hole) {
    let result = false;
    if (mouse.left + 75 > hole.left && mouse.left < hole.right) {
      if (mouse.top < hole.bottom && mouse.bottom > hole.top) {
        result = true;
      }
    }
    return result
  }
};

export { MouseQuery };