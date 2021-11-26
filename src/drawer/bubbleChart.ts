const fs = require('fs');
const { ChartJSNodeCanvas } = require('chartjs-node-canvas');

const randomColor = () => `#${Math.floor(Math.random() * 0xFFFFFF).toString(16)}`;

const width = 1000; //px
const height = 1000; //px
const backgroundColour = 'white'; // Uses https://www.w3schools.com/tags/canvas_fillstyle.asp
const chartJSNodeCanvas = new ChartJSNodeCanvas({ width, height, backgroundColour});

const prepareData = (data: any[]) => {
  const preparedData = data
    .sort((a, b) => b.r - a.r)
    .map((d) => ({
      label: d.label,
      data: [{
        r: d.r,
        x: Math.floor(Math.random() * d.r),
        y: Math.floor(Math.random() * d.r),
      }],
      hitRadius: 2,
      backgroundColor: randomColor(),
    }));

    return preparedData;
}

const renderImage = async (data: any) => {
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
    fs.writeFileSync('./output.png', image);
};

export default renderImage;
