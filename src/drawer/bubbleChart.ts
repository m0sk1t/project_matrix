const fs = require('fs');
const { ChartJSNodeCanvas } = require('chartjs-node-canvas');

const randomColor = () => `#${Math.floor(Math.random() * 0xFFFFFF).toString(16)}`;

const width = 1000;
const height = 1000;
const backgroundColour = 'white';
const chartJSNodeCanvas = new ChartJSNodeCanvas({ width, height, backgroundColour });

const checkHit = (rendered: any[], target: any) => {
  return rendered.some((p) => {
    const dx = (p.x + p.r) - (target.x + target.r);
    const dy = (p.y + p.r) - (target.y + target.r);
    const distance = Math.sqrt(dx * dx + dy * dy);

    return distance < p.r + target.r;
  });
};

const prepareData = (data: any[]) => {
  const rendered: any[] = [];

  const preparedData = data
    .sort((a, b) => b.r - a.r)
    .map((d) => {
      let target = {
        r: (d.r < 10 ? d.r + 10 : d.r) * 10,
        x: Math.floor(Math.random() * width / 2),
        y: Math.floor(Math.random() * height / 2),
      };

      while (checkHit(rendered, target)) {
        target = {
          r: d.r,
          x: Math.floor(Math.random() * width / 2),
          y: Math.floor(Math.random() * height / 2),
        };
      }

      rendered.push(target);

      return {
        label: d.label,
        data: [target],
        hitRadius: 2,
        backgroundColor: randomColor(),
      };
    });

  return preparedData;
}

const renderImage = async (data: any, fileName: string) => {
  const configuration = {
    type: 'bubble',
    data: {
      datasets: prepareData(data),
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: 'ProjectMatrix'
        }
      }
    },
  };
  const image = await chartJSNodeCanvas.renderToBuffer(configuration);
  fs.writeFileSync(`./static/${fileName}.png`, image);
};

export default renderImage;
