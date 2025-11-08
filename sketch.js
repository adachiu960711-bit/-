counter = 100;
let parity_flag = 0;
// 選單連結與區域設定
let MENU_URL = 'https://adachiu960711-bit.github.io/20251108_1/';
let MENU_URL2 = 'https://hackmd.io/@luVR6D-5RnOQeMXZHjht8A/SJTgFdkhex';
// 第三個選單連結（若未設定會顯示提示）
let MENU_URL3 = 'http://127.0.0.1:5502/quiz.html';
let menuX = 0, menuY = 0, menuW = 200;
let menuItemX = 20, menuItemY = 20, menuItemW = 160, menuItemH = 24;
let menuItemSpacing = 34; // 每個選項之間的垂直間距

function setup() {
  createCanvas(windowWidth, windowHeight);
  stroke(255);
  rectMode(CORNER);
}

function draw() {
  background(0);
  counter += 0.005; // 減慢動畫速度
  
  // 繪製半透明選單
  noStroke();
  fill(255, 255, 255, 100);
  rect(0, 0, 200, windowHeight);

  // 選單文字（支援 hover，兩個項目）
  noStroke();
  textSize(18);
  textAlign(LEFT, TOP);

  // 判斷 hover 狀態（項目 1）
  let hoveringItem1 = (mouseX >= menuX + menuItemX && mouseX <= menuX + menuItemX + menuItemW &&
                       mouseY >= menuY + menuItemY && mouseY <= menuY + menuItemY + menuItemH);
  if (hoveringItem1) fill(30, 144, 255); else fill(0);
  text('1. 氣球爆破', menuX + menuItemX, menuY + menuItemY);
  if (hoveringItem1) {
    stroke(30, 144, 255);
    strokeWeight(2);
    let w1 = textWidth('1. 氣球爆破');
    line(menuX + menuItemX, menuY + menuItemY + 20, menuX + menuItemX + w1, menuY + menuItemY + 20);
    noStroke();
  }

  // 項目 2（在項目 1 下面）
  let item2Y = menuItemY + menuItemSpacing;
  let hoveringItem2 = (mouseX >= menuX + menuItemX && mouseX <= menuX + menuItemX + menuItemW &&
                       mouseY >= menuY + item2Y && mouseY <= menuY + item2Y + menuItemH);
  if (hoveringItem2) fill(30, 144, 255); else fill(0);
  text('2. 單元一筆記', menuX + menuItemX, menuY + item2Y);
  if (hoveringItem2) {
    stroke(30, 144, 255);
    strokeWeight(2);
    let w2 = textWidth('2. 單元一筆記');
    line(menuX + menuItemX, menuY + item2Y + 20, menuX + menuItemX + w2, menuY + item2Y + 20);
    noStroke();
  }

  // 項目 3（在項目 2 下面）
  let item3Y = menuItemY + menuItemSpacing * 2;
  let hoveringItem3 = (mouseX >= menuX + menuItemX && mouseX <= menuX + menuItemX + menuItemW &&
                       mouseY >= menuY + item3Y && mouseY <= menuY + item3Y + menuItemH);
  if (hoveringItem3) fill(30, 144, 255); else fill(0);
  text('3. 線上測驗系統', menuX + menuItemX, menuY + item3Y);
  if (hoveringItem3) {
    stroke(30, 144, 255);
    strokeWeight(2);
    let w3 = textWidth('3. 線上測驗系統');
    line(menuX + menuItemX, menuY + item3Y + 20, menuX + menuItemX + w3, menuY + item3Y + 20);
    noStroke();
  }
  
  // 設置文字樣式
  textSize(32);
  textAlign(CENTER, CENTER);
  fill(255);
  text('414730258邱品瑜', windowWidth/2, windowHeight/2);
  
  // 重新設置動畫的繪圖屬性
  stroke(255);
  strokeWeight(1);
  
  // 繪製第一顆土星
  for (let i = 2000; i >= 0; i -= 2) {
    parity_flag = 0;
    drawPoints(i, false);
  } 
  for (let i = 1999; i > 0; i -= 2) {
    parity_flag = 1;
    drawPoints(i, false);
  }
  
  // 繪製第二顆土星
  for (let i = 2000; i >= 0; i -= 2) {
    parity_flag = 0;
    drawPoints(i, true);
  } 
  for (let i = 1999; i > 0; i -= 2) {
    parity_flag = 1;
    drawPoints(i, true);
  }
}

function drawPoints(i, isSecond = false) {
    let radial_offset = counter / cos(counter / i) + parity_flag * (counter / 2 + i % counter);
    let angular_phase = counter / 9 + i * i;
    
    if (isSecond) {
        radial_offset = radial_offset * 0.5; // 縮小一半大小
        let x_position = windowWidth - 300 + radial_offset * sin(angular_phase) * cos(!parity_flag * i / counter);
        let y_position = windowHeight - 300 + radial_offset * cos(angular_phase + parity_flag * 2);
        let point_size = 0.7 * (1 - cos(angular_phase)); // 稍微縮小點的大小
        strokeWeight(point_size);
        point(x_position, y_position);
    } else {
        let x_position = (windowWidth / 2 - 100) + radial_offset * sin(angular_phase) * cos(!parity_flag * i / counter);
        let y_position = 300 + radial_offset * cos(angular_phase + parity_flag * 2);
        let point_size = 1 - cos(angular_phase);
        strokeWeight(point_size);
        point(x_position, y_position);
    }
}

// 檢查滑鼠是否在選單項目上
function isMouseOverMenuItem() {
  // 支援三個選項的檢測
  let item1 = (mouseX >= menuX + menuItemX && mouseX <= menuX + menuItemX + menuItemW &&
              mouseY >= menuY + menuItemY && mouseY <= menuY + menuItemY + menuItemH);
  let item2Y = menuItemY + menuItemSpacing;
  let item2 = (mouseX >= menuX + menuItemX && mouseX <= menuX + menuItemX + menuItemW &&
              mouseY >= menuY + item2Y && mouseY <= menuY + item2Y + menuItemH);
  let item3Y = menuItemY + menuItemSpacing * 2;
  let item3 = (mouseX >= menuX + menuItemX && mouseX <= menuX + menuItemX + menuItemW &&
              mouseY >= menuY + item3Y && mouseY <= menuY + item3Y + menuItemH);
  return { item1: item1, item2: item2, item3: item3 };
}

function mousePressed() {
  let over = isMouseOverMenuItem();
  if (over.item1) {
    window.open(MENU_URL, '_blank');
  } else if (over.item2) {
    window.open(MENU_URL2, '_blank');
  } else if (over.item3) {
    if (MENU_URL3 && MENU_URL3.length > 0) {
      window.open(MENU_URL3, '_blank');
    } else {
      // 未設定連結，給使用者提示
      window.alert('尚未設定「3. 線上測驗系統」的連結。');
    }
  }
}