import React, { useEffect } from 'react';
import { SVG } from '@svgdotjs/svg.js';
// import './index.css';
interface IProps {}
const star = {
  path: 'M119 0L147 86H238L164 140L192 226L119 172L45 226L74 140L0 87H91L119 0Z',
  width: 238,
  height: 226,
};
const love = {
  path: 'M171.712 571.648l0.352 0.32 287.904 252.8a64 64 0 0 0 82.912 1.344l296.832-244.544a215.584 215.584 0 1 0-301.824-300.576L512 316.672l-25.888-35.616a215.584 215.584 0 1 0-314.4 290.624zM32 407.584a279.584 279.584 0 0 1 480-194.944 279.584 279.584 0 0 1 480 194.944 278.144 278.144 0 0 1-113.024 224.512l-295.36 243.392a128 128 0 0 1-165.888-2.592L129.984 620.16A278.976 278.976 0 0 1 32 407.584z',
  width: 200,
  height: 200,
};

const radiusRect = {
  path: 'M0 30a30 30 0 0 1 30 -30h190a30 30 0 0 1 30 30v190a30 30 0 0 1 -30 30h-190a30 30 0 0 1 -30 -30z',
  width: 250,
  height: 250,
};

const square = {
  path: 'M0 0L250 0L250 250L0 250Z',
  width: 250,
  height: 250,
};

const round = {
  path: 'M0 125a125 125 0 1 0 250 0a125 125 0 1 0 -250 0z',
  width: 250,
  height: 250,
};

const url =
  'https://d2w9suv6wak03e.cloudfront.net/image/pod/3300003266/10143/852f0e0e85cd45a9a81fd26fb74e28ae_96x.png?w=119&h=55';
const url2 =
  'https://d2n979dmt31clo.cloudfront.net/image/pod/3300003131/1615879134392/4b2969621b00412cb15d505cd5bd595e_96x.png?w=61&h=61';
const initSvg = () => {
  const svg = SVG();
  const draw = svg.addTo('#svg').size(300, 300);
  const group = draw.group();
  const defs = draw.defs();

  const computeMatrix = (boxW, boxH, imgWidth, imgHeight) => {
    // const imgWidth = 100;
    // const imgHeight = 61;
    const imgCenterPoint = {
      x: boxW / 2,
      y: boxH / 2,
    };
    const x = 100;
    const y = 50;
    const rotation = 30;
    const matrix = new DOMMatrix();
    const wS = boxW / imgWidth;
    const wH = boxH / imgHeight;
    const valStr = matrix
      .translate(x + imgCenterPoint.x, y + imgCenterPoint.y)
      .rotate(rotation)
      .translate(-imgCenterPoint.x, -imgCenterPoint.y)
      .scale(wS, wH);
    return valStr;
  };

  const valStr = computeMatrix(96, 44, 96, 44);
  const image = draw
    .image(
      'https://d2w9suv6wak03e.cloudfront.net/image/pod/3300003266/10143/852f0e0e85cd45a9a81fd26fb74e28ae_96x.png?w=119&h=55'
    )
    .transform(valStr);

  const pointImage = draw
    .image(
      'https://d2w9suv6wak03e.cloudfront.net/image/pod/3300003266/10143/852f0e0e85cd45a9a81fd26fb74e28ae_96x.png?w=119&h=55'
    )
    .attr({
      preserveAspectRatio: 'none',
    });
  const pattern = draw
    .pattern()
    .add(pointImage)
    .attr({
      id: 'plain',
    })
    .transform(valStr);
  defs.add(pattern);
  const rect = draw.rect().size('100%', '100%').attr({
    fill: 'none',
    stroke: '#000',
    'stroke-width': 1,
    'stroke-opacity': 0.9,
    'fill-opacity': 0.5,
  });
  rect.attr({
    fill: 'url(#plain)',
  });

  group.add(rect);

  const changeUrl = (url) => {
    pointImage.load(url, (e) => {
      console.log(pattern.width(), pattern.height());
      pattern.attr({
        width: e.target.width,
        height: e.target.height,
      });
      pattern.find('image')[0].attr({
        width: e.target.width,
        height: e.target.height,
      });
      const s = computeMatrix(
        e.target.width,
        e.target.height,
        e.target.width,
        e.target.height
      );
      image
        .attr({
          href: url,
          width: e.target.width,
          height: e.target.height,
        })
        .transform(s);
      pattern.transform(s);
    });
  };

  setTimeout(() => {
    // pattern.update((add) => {
    // });
    changeUrl(url2);
  }, 2000);
};

const initImage = () => {
  const svg = SVG();
  const draw = svg.addTo('#svg').css({
    width: '500px',
    height: '500px',
    border: '1px solid red',
  });
  const rect = draw
    .rect()
    .attr({
      fill: 'red',
      stroke: '#000',
      'stroke-width': 3,
      'stroke-opacity': 0.3,
      'fill-opacity': 0.8,
      width: 100,
      height: 100,
      x: 350,
      y: 350,
      rx: 10,
      ry: 10,
    })
    .transform({
      rotate: 0,
    });
  const circle = draw.circle().attr({
    r: 100,
    cx: 200,
    cy: 200,
    fill: 'none',
    stroke: 'red',
    'stroke-width': 2,
  });

  const ellipse = draw.ellipse().attr({
    rx: 50,
    ry: 100,
    cx: 200,
    cy: 200,
    fill: 'none',
    stroke: 'pink',
    'stroke-width': 2,
  });
  const ellipse2 = draw.ellipse().attr({
    rx: 100,
    ry: 10,
    cx: 200,
    cy: 200,
    fill: 'none',
    stroke: 'red',
    'stroke-width': 2,
  });
  const line = draw.line().attr({
    x1: 0,
    y1: 0,
    x2: 200,
    y2: 200,
    stroke: 'green',
    'stroke-width': 2,
  });
  const line2 = draw.line().attr({
    x1: 200,
    y1: 200,
    x2: 500,
    y2: 0,
    stroke: 'green',
    'stroke-width': 2,
  });
  const poly = draw.polygon().attr({
    points: [200, 300, 200, 350, 250, 300, 250, 350],
    fill: 'pink',
    stroke: 'green',
    'stroke-width': 2,
  });
  const polygon = draw
    .polygon('50,0 60,40 100,50 60,60 50,100 40,60 0,50 40,40')
    .fill('#f06');

  const polyline = draw.polyline().attr({
    // 路径点
    points: [200, 400, 250, 400, 250, 500, 200, 500, 200, 400, 150, 350],
    fill: 'none',
    stroke: 'black',
    'stroke-width': 1,
  });

  const path = draw.path().attr({
    // 路径点
    d: 'M400 200 L450 200 L450 250 L400 250 Z',
    stroke: 'pink',
    'stroke-width': 1,
    fill: 'none',
  });

  const group = draw.group();
  group.add(path);

  const text = draw
    .text((add) => {
      add.tspan('Lorem ipsum dolor sit amet ').newLine().dx(20).dy(100);
      add.tspan('consectetur').fill('#f06');
      add.tspan('.');
      add.tspan('Cras sodales imperdiet auctor.').newLine().dx(20);
      add.tspan('Nunc ultrices lectus at erat').newLine();
      add.tspan('dictum pharetra elementum ante').newLine();
    })
    .attr({
      x: 100,
      y: 100,
    })
    .font({
      family: 'Helvetica',
      size: 16,
      anchor: 'middle',
      leading: '1.5em',
    });
  const group2 = draw.group().attr({
    id: 'textGroup',
  });
  group2.add(text).attr({});

  const text2 = draw.text(function (add) {
    add.tspan('We go ');
    add.tspan('up').fill('#f09');
    add.tspan(', then we go down, then up again');
  });

  const path2 =
    'M10 200 C 200 100 300 0 400 100 C 500 200 600 300 700 200 C 800 100 900 100 900 100';

  const textpath = text2.path(path2).font({ size: 26, family: 'Verdana' });

  const group3 = draw.group().attr({
    fill: 'none',
    id: 'textLine',
    stroke: 'blue',
    'stroke-width': 5,
  });
  const ph1 = draw.path('M5 20 L215 20').attr({
    'stroke-linecap': 'round',
  });
  const ph2 = draw.path('M5 40 L215 40').attr({
    'stroke-linecap': 'round',
    stroke: '#ececec',
  });
  group3.add(ph1);
  group3.add(ph2);

  // const img = draw
  //   .image(url)
  //   .transform({
  //     rotate: 0,
  //     // origin: {
  //     //   x: 94 / 2,
  //     //   y: 44 / 2,
  //     // },
  //     // translate: [150 - 94 / 2, 150 - 22],
  //   })
  //   .attr({
  //     width: 300,
  //     height: 300,
  //   });
  // const ellipse = draw.ellipse(80, 40).move(10, 10);
  // const text = draw.text('SVG.JS').move(10, 10).font({ size: 36 });

  // const clip = draw.clip().add(circle);
  // rect.clipWith(clip);
  // let timer = 10;
  // setInterval(() => {
  //   img.transform({
  //     rotate: timer,
  //     // origin: {
  //     //   x: 94 / 2,
  //     //   y: 44 / 2,
  //     // },
  //     // translate: [150 - 94 / 2, 150 - 22],
  //   });
  //   timer += 10;
  // }, 1000);
};

const initShape = () => {
  const svg = SVG();
  const draw = svg.addTo('#svg').css({
    width: '500px',
    height: '500px',
    border: '1px solid red',
  });
  const rect = draw
    .rect()
    .attr({
      fill: 'red',
      stroke: '#000',
      'stroke-width': 3,
      'stroke-opacity': 0.3,
      'fill-opacity': 0.8,
      width: 500,
      height: 500,
    })
    .transform({
      rotate: 0,
    });
  const roundPath = draw.path(love.path);
  roundPath.attr({
    stroke: 'green',
    'stroke-width': 10,
    fill: 'none',
  });
  roundPath.transform({
    rotate: 0,
    // origin: [125, 125],
    // translate: [-200, -200],
    // scale: 0.1,
  });
  // 500 250
  const roundPath2 = roundPath.clone().plot(love.path);
  // roundPath2.move(250 - 250 / 2, 250 - 250 / 2);
  draw.add(roundPath2);
  rect.clipWith(roundPath);
};

const initGrid = () => {
  const svg = SVG();
  const draw = svg.addTo('#svg').css({
    width: '500px',
    height: '500px',
    border: '1px solid red',
  });
  // const p1 = draw.path('M10 0 V500').attr({
  //   fill: 'none',
  //   stroke: 'green',
  //   'stroke-width': 1,
  // });
  for (let i = 1; i < 10; i++) {
    draw.path(`M${i * 50} 0 V500`).attr({
      fill: 'none',
      stroke: 'green',
      'stroke-width': 1,
    });
    draw.path(`M0 ${i * 50} H500`).attr({
      fill: 'none',
      stroke: 'green',
      'stroke-width': 1,
    });
    draw
      .text(i + '')
      .move(i * 50, 30)
      .font({ fill: '#f06', family: 'Inconsolata' });
    draw
      .text(i + '')
      .move(250, i * 50)
      .font({ fill: '#f06', family: 'Inconsolata' });
  }
  draw.path('M0 250 L500 250').stroke('#000');
  draw.path('M250 0 L250 500').stroke('#000');
  draw.circle().attr({
    r: 5,
    cx: 250,
    cy: 250,
    fill: 'red',
  });
  // initArrow(draw);
  // initBecis(draw);
  // initQ(draw);
  // initQ2(draw);
  initArc(draw);
};

const initArc = (draw) => {
  // M150 250 代表起始点位置
  // a (100 50) rx ry 代表椭圆的水平和垂直的轴半径
  // 0 0 0 第一个代表椭圆相对于坐标系的旋转角度，第二个是0是小弧，1是大弧，第三个是0代表逆时针，1代表顺时针
  // (200 0)代表结束点位置
  // const path = draw.path('M150 250 a 100 50 0 0 0 200 0').attr({
  //   stroke: 'red',
  //   'stroke-width': 2,
  //   fill: 'none',
  // });
  // const path3 = draw.path('M150 150 a 50 50 0 0 0 150 0').attr({
  //   stroke: 'red',
  //   'stroke-width': 4,
  //   fill: 'none',
  // });
  const path3 = draw.path('M150 150 a 25 25 0 1 1 0 1 z').attr({
    // stroke: 'red',
    'stroke-width': 4,
    fill: 'none',
  });
  const text = draw
    .text('在这在这里在这里在这里在这里在这里里')
    .path(path3)
    .fill({ color: 'red' });
  // const path4 = draw.path('M150 150 a 25 25 0 1 1 50 0').attr({
  //   // stroke: 'red',
  //   'stroke-width': 4,
  //   fill: 'none',
  // });
  // // M 0,50 a 50,50 0 1,1 0,1 z
  // const text = draw
  //   .text('在这在这里在这里在这里在这里在这里里')
  //   .path(path4)
  //   .fill({ color: 'red' });
  // const path5 = draw.path('M200 150 a 100 50 45 1 1 100 0').attr({
  //   stroke: 'red',
  //   'stroke-width': 4,
  //   fill: 'none',
  // });
};

const initQ2 = (draw) => {
  // Q是二次的贝塞尔曲线 ，只有一个控制点, q是启用相对位置
  // M(100 250) 起始点  q(50 -50) 相对于M点的相对位置
  // (150 0)是相对于M点的结束点,
  // t是自动生成一个控制点,
  // (150 0) 是相对于M点的结束点
  const path = draw.path('M100 250 q50 -50, 150 0 t150 0').attr({
    stroke: 'red',
    'stroke-width': 2,
    fill: 'none',
  });
};

const initQ = (draw) => {
  const path = draw.path('M100 250 Q175 100, 250 250 T400 250').attr({
    stroke: 'red',
    'stroke-width': 2,
    fill: 'none',
  });
  const text = draw
    .text('在这在这里在这里在这里在这里在这里里')
    .path(path)
    .fill({ color: 'red' });
  text.animate(2000).ease('<>').plot('M100 250 Q 175 400, 250 250 T 400 250');
  // .loop(true, true);
};

const initBecis = (draw) => {
  // C是三次的贝塞尔曲线
  // (C 150 100, 200 200, 250 250)有两个控制点, 一个开始控制点(150 100)，一个结束控制点(200 200)，结束点(250 250), c是启用相对位置
  // S(s)是自动生成一个控制点,
  // (S 350 300, 400 250) S就代表了一个自动生成的开始控制点，(350 300)一个结束控制点, (400 250)结束点
  const path = draw
    .path('M100 250 C 150 100, 200 200, 250 250 S 350 300, 400 250')
    .attr({
      stroke: 'red',
      'stroke-width': 2,
      fill: 'none',
    });
  const text = draw
    .text('在这在这里在这里在这里在这里在这里里')
    .path(path)
    .fill({ color: 'red' });
  text
    .animate(2000)
    .ease('<>')
    .plot('M100 250 C 150 250, 150 250, 250 250 S 350 300, 400 250')
    .loop(true, true);
};

const initArrow = (draw) => {
  draw.path('M150 150 H300 V100 L400 200 L300 300 V250 H150 Z').attr({
    stroke: 'red',
    'stroke-width': 2,
    fill: 'red',
  });

  draw.path('M250 350 h150 v-50 l100 100 l-100 100 v-50 h-150 Z').attr({
    stroke: 'red',
    'stroke-width': 2,
    fill: 'red',
  });
};

const App: React.FC<IProps> = ({}) => {
  useEffect(() => {
    // const ellipse = draw.ellipse(80, 40).move(10, 10);
    // const text = draw.text('SVG.JS').move(10, 10).font({ size: 36 });
    // const clip = draw.clip().add(ellipse);
    // rect.clipWith(clip);
    initSvg();
    // initImage();
    // initShape();
    // initGrid();
  }, []);
  return (
    <>
      <div id="svg"></div>
    </>
  );
};

export default App;
