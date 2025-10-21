// Original data structure
const originalData = {
  labels: ['2022', '2023', '2024'],
  categories: [
    {
      label: 'Trucks',
      data: [1222, 570, 2500],
      backgroundColor: '#007EA7',
      borderWidth: 0,
      iconPath: new URL(
        '../assets/icons/chart-truck.svg',
        import.meta.url,
      ).toString(),
    },
    {
      label: 'Cars',
      data: [5107, 3965, 10065],
      backgroundColor: '#FFFFFF',
      borderWidth: 0,
      iconPath: new URL(
        '../assets/icons/chart-car.svg',
        import.meta.url,
      ).toString(),
    },
    {
      label: 'People',
      data: [10924, 13638, 6800],
      backgroundColor: '#5CD6FF',
      borderWidth: 0,
      iconPath: new URL(
        '../assets/icons/chart-man.svg',
        import.meta.url,
      ).toString(),
    },
  ],
};

// Transform data to sort each bar independently
function transformDataForSortedBars(originalData) {
  const { labels, categories } = originalData;
  const numBars = labels.length;
  const numCategories = categories.length;

  // Create datasets for each position (bottom, middle, top)
  const positionDatasets = Array.from(
    { length: numCategories },
    (_, posIndex) => ({
      label: `Position ${posIndex}`,
      data: new Array(numBars).fill(0),
      backgroundColor: new Array(numBars).fill(''),
      borderWidth: 0,
      categoryInfo: new Array(numBars).fill(null), // Store which category is at this position for each bar
    }),
  );

  // For each bar (year), sort categories by value and assign to position datasets
  for (let barIndex = 0; barIndex < numBars; barIndex++) {
    // Get all categories with their values for this bar
    const categoriesWithValues = categories.map((cat, catIndex) => ({
      categoryIndex: catIndex,
      value: cat.data[barIndex],
      backgroundColor: cat.backgroundColor,
      iconPath: cat.iconPath,
      label: cat.label,
    }));

    // Sort by value ascending (lowest first = bottom of stack, highest at top)
    categoriesWithValues.sort((a, b) => a.value - b.value);

    // Assign to position datasets
    categoriesWithValues.forEach((item, posIndex) => {
      positionDatasets[posIndex].data[barIndex] = item.value;
      positionDatasets[posIndex].backgroundColor[barIndex] =
        item.backgroundColor;
      positionDatasets[posIndex].categoryInfo[barIndex] = {
        categoryIndex: item.categoryIndex,
        iconPath: item.iconPath,
        label: item.label,
      };
    });
  }

  return {
    labels,
    datasets: positionDatasets,
  };
}

const data = transformDataForSortedBars(originalData);

export function initPlaceChart() {
  const ctx = document.getElementById('myChart');

  Chart.register(ChartDataLabels);

  // Load all unique icons
  const iconImagesMap = {};
  originalData.categories.forEach((cat) => {
    const img = new Image();
    img.src = cat.iconPath;
    iconImagesMap[cat.iconPath] = img;
  });

  let chartInstance = null;
  let loadedIcons = 0;
  const totalIcons = Object.keys(iconImagesMap).length;

  const checkAllIconsLoaded = () => {
    loadedIcons++;
    if (loadedIcons === totalIcons && chartInstance) {
      chartInstance.draw();
    }
  };

  Object.values(iconImagesMap).forEach((img) => {
    img.onload = checkAllIconsLoaded;
  });

  const iconLabelsPlugin = {
    id: 'iconLabelsPlugin',
    afterDatasetsDraw(chart) {
      const { ctx } = chart;
      ctx.save();

      chart.data.datasets.forEach((dataset, datasetIndex) => {
        const meta = chart.getDatasetMeta(datasetIndex);
        if (!meta) return;

        meta.data.forEach((barElement, barIndex) => {
          const categoryInfo = dataset.categoryInfo[barIndex];
          if (!categoryInfo) return;

          const icon = iconImagesMap[categoryInfo.iconPath];
          if (!icon || !icon.complete) return;

          // Position near the end of the bar segment
          const pos = barElement.tooltipPosition();
          const iconSize = 20; // px

          ctx.drawImage(
            icon,
            pos.x + 47,
            pos.y - iconSize * 1.6, // Position above the text
            iconSize,
            iconSize,
          );
        });
      });

      ctx.restore();
    },
  };

  new Chart(ctx, {
    type: 'bar',
    data,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      layout: {
        padding: {
          bottom: 0,
        },
      },
      plugins: {
        legend: {
          display: false, // Hide legend since we'll show icons
        },
        tooltip: {
          enabled: false,
        },
        datalabels: {
          display: true,
          color: '#FFFFFF',
          font: {
            size: 14,
            weight: 'bold',
          },
          formatter: (value) => {
            return `${value.toLocaleString()}`;
          },
          anchor: 'end',
          align: 'left',
          textAlign: 'left',
          offset: -70,
        },
      },
      scales: {
        x: {
          stacked: true,
          grid: {
            display: false,
            drawBorder: false,
          },
          ticks: {
            display: false, // Hide the year labels
          },
          border: {
            display: false,
          },
        },
        y: {
          beginAtZero: true,
          max: 25000,
          min: 0,
          stacked: true,
          grace: 0,
          ticks: {
            stepSize: 5000,
            color: '#FFFFFF',
            font: {
              size: 14,
            },
            padding: 0,
            align: 'end',

            crossAlign: 'far',
            callback: (value) => {
              // Hide the 0 label but keep the space
              if (value === 0) return '';
              return value.toLocaleString();
            },
          },
          grid: {
            color: (context) => {
              // Hide the grid line at 0
              if (context.tick.value === 0) return 'transparent';
              return 'rgba(255, 255, 255, 0.2)';
            },
            lineWidth: 1,
            drawBorder: false,
            offset: false,
          },
          border: {
            display: false,
          },
        },
      },
      elements: {
        bar: {
          borderWidth: 0,
        },
      },
      datasets: {
        bar: {
          barThickness: 16,
          maxBarThickness: 16,
        },
      },
      interaction: {
        intersect: false,
        mode: 'index',
      },
    },
    plugins: [iconLabelsPlugin],
  });
  // Keep instance to redraw after icon load
  chartInstance = Chart.getChart(ctx);
}
