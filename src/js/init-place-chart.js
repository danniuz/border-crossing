// Original data structure

const isMobile = window.innerWidth <= 767;

const STEP_SIZE = 5000;

const originalData = {
  labels: ['אפריל', 'מרץ', 'פברואר', 'ינואר'],
  categories: [
    {
      label: 'Trucks',
      data: [1222, 570, 2500, 10065],
      backgroundColor: '#007EA7',
      borderWidth: 0,
      iconPath: new URL(
        '../assets/icons/chart-truck.svg',
        import.meta.url,
      ).toString(),
      iconPathMobile: new URL(
        '../assets/icons/chart-truck--mobile.svg',
        import.meta.url,
      ).toString(),
    },
    {
      label: 'Cars',
      data: [5107, 3965, 10065, 6800],
      backgroundColor: '#FFFFFF',
      borderWidth: 0,
      iconPath: new URL(
        '../assets/icons/chart-car.svg',
        import.meta.url,
      ).toString(),
      iconPathMobile: new URL(
        '../assets/icons/chart-car--mobile.svg',
        import.meta.url,
      ).toString(),
    },
    {
      label: 'People',
      data: [10924, 13638, 6800, 2500],
      backgroundColor: '#5CD6FF',
      borderWidth: 0,
      iconPath: new URL(
        '../assets/icons/chart-man.svg',
        import.meta.url,
      ).toString(),
      iconPathMobile: new URL(
        '../assets/icons/chart-man--mobile.svg',
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
      iconPathMobile: cat.iconPathMobile,
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
        iconPathMobile: item.iconPathMobile,
        label: item.label,
      };
    });
  }

  return {
    labels,
    datasets: positionDatasets,
  };
}

function getMaxYBarHeight(data, stepSize) {
  const { labels, categories } = data;
  let maxTotal = 0;

  for (let i = 0; i < labels.length; i++) {
    const total = categories.reduce((sum, category) => {
      return sum + category.data[i];
    }, 0);
    maxTotal = Math.max(maxTotal, total);
  }

  const total = (Math.floor(maxTotal / stepSize) + 2) * stepSize;

  return total;
}

const data = transformDataForSortedBars(originalData);

export function initPlaceChart() {
  const ctx = document.getElementById('myChart');

  Chart.register(ChartDataLabels);

  // Load all unique icons (both desktop and mobile)
  const iconImagesMap = {};
  originalData.categories.forEach((cat) => {
    // Load desktop icon
    const img = new Image();
    img.crossOrigin = 'anonymous'; // Enable CORS if needed
    img.src = cat.iconPath;
    iconImagesMap[cat.iconPath] = img;

    // Load mobile icon
    const imgMobile = new Image();
    imgMobile.crossOrigin = 'anonymous'; // Enable CORS if needed
    imgMobile.src = cat.iconPathMobile;
    iconImagesMap[cat.iconPathMobile] = imgMobile;
  });

  let chartInstance = null;
  let loadedIcons = 0;
  const totalIcons = Object.keys(iconImagesMap).length;

  // Track which specific segment is clicked (only relevant for mobile)
  let clickedSegment = null; // { datasetIndex, dataIndex }

  const checkAllIconsLoaded = () => {
    loadedIcons++;
    if (loadedIcons === totalIcons && chartInstance) {
      chartInstance.draw();
    }
  };

  // Add both onload and onerror handlers to prevent blocking
  Object.entries(iconImagesMap).forEach(([path, img]) => {
    img.onload = () => {
      if (img.naturalWidth === 0 || img.naturalHeight === 0) {
        console.error('Icon loaded but has zero dimensions:', path);
      }
      checkAllIconsLoaded();
    };
    img.onerror = (error) => {
      console.error('Failed to load icon:', path, error);
      checkAllIconsLoaded(); // Still increment to prevent blocking
    };
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
          // On desktop, always show icons
          if (!isMobile) {
            const categoryInfo = dataset.categoryInfo[barIndex];
            if (!categoryInfo) return;

            const icon = iconImagesMap[categoryInfo.iconPath];
            // Check if icon is loaded and valid
            if (
              !icon ||
              !icon.complete ||
              icon.naturalWidth === 0 ||
              icon.naturalHeight === 0
            ) {
              return;
            }

            // Position near the end of the bar segment
            const pos = barElement.tooltipPosition();
            const iconSize = 30;

            try {
              ctx.drawImage(
                icon,
                pos.x + iconSize + 6,
                pos.y - iconSize * 1.4,
                iconSize,
                iconSize,
              );
            } catch (error) {
              console.error(
                'Failed to draw icon:',
                categoryInfo.iconPath,
                error,
              );
            }
            return;
          }

          // On mobile, only show icon for clicked segment
          if (
            !clickedSegment ||
            clickedSegment.datasetIndex !== datasetIndex ||
            clickedSegment.dataIndex !== barIndex
          ) {
            return;
          }

          const categoryInfo = dataset.categoryInfo[barIndex];
          if (!categoryInfo) return;

          const icon = iconImagesMap[categoryInfo.iconPathMobile];
          // Check if icon is loaded and valid
          if (
            !icon ||
            !icon.complete ||
            icon.naturalWidth === 0 ||
            icon.naturalHeight === 0
          ) {
            return;
          }

          // Position icon inside/near the label on mobile
          const pos = barElement.tooltipPosition();
          const iconSize = 16;

          try {
            const isLastBar = barIndex === chart.data.labels.length - 1;
            const iconX = isLastBar
              ? pos.x + iconSize - 6
              : pos.x + iconSize + 44;

            // Draw icon to the right of the label text (or left for last bar)
            ctx.drawImage(
              icon,
              iconX,
              pos.y - iconSize / 2,
              iconSize,
              iconSize,
            );
          } catch (error) {
            console.error(
              'Failed to draw mobile icon:',
              categoryInfo.iconPathMobile,
              error,
            );
          }
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
          display: (context) => {
            // On desktop, always show labels
            if (!isMobile) return true;

            // On mobile, only show label for clicked specific segment
            if (!clickedSegment) return false;
            return (
              context.datasetIndex === clickedSegment.datasetIndex &&
              context.dataIndex === clickedSegment.dataIndex
            );
          },
          color: (context) => {
            return isMobile ? '#003459' : '#FFFFFF';
          },
          backgroundColor: (context) => {
            if (!isMobile) return null;
            // const color = context.dataset.backgroundColor[context.dataIndex];
            const color = '#F3F4F5';
            return color;
          },
          borderRadius: 0,
          padding: {
            top: 4,
            bottom: 4,
            left: 4,
            right: 24,
          },
          font: {
            size: 14,
            weight: 400,
          },
          formatter: (value) => {
            return `${value.toLocaleString()}`;
          },
          anchor: 'end',
          align: 'left',
          textAlign: 'left',
          offset: (context) => {
            // On mobile, for the last (rightmost) bar, adjust offset for right alignment
            if (isMobile && context.dataIndex === data.labels.length - 1) {
              return -20;
            }
            return -70;
          },
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
            display: true,
            color: '#FFFFFF',
            font: {
              size: 24,
              weight: 500,
            },
            padding: 16,
          },
          border: {
            display: false,
          },
        },
        y: {
          beginAtZero: true,
          max: getMaxYBarHeight(originalData, STEP_SIZE) || 20000,
          min: 0,
          stacked: true,
          grace: 0,
          ticks: {
            STEP_SIZE,
            color: '#FFFFFF',
            font: {
              size: 18,
              weight: 500,
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
              // if (context.tick.value === 0) return 'transparent';
              return '#F2F4F5';
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
        intersect: true,
        mode: 'point',
      },
      onClick: (event, activeElements) => {
        if (!isMobile) return; // Only handle clicks on mobile

        if (activeElements && activeElements.length > 0) {
          const element = activeElements[0];
          const clickedDatasetIndex = element.datasetIndex;
          const clickedDataIndex = element.index;

          // Toggle: if clicking the same segment, hide label; otherwise show clicked segment's label
          if (
            clickedSegment &&
            clickedSegment.datasetIndex === clickedDatasetIndex &&
            clickedSegment.dataIndex === clickedDataIndex
          ) {
            clickedSegment = null;
          } else {
            clickedSegment = {
              datasetIndex: clickedDatasetIndex,
              dataIndex: clickedDataIndex,
            };
          }

          // Update the chart to reflect the change
          chartInstance.update();
        } else {
          // Clicked outside bars, hide all labels
          clickedSegment = null;
          chartInstance.update();
        }
      },
    },
    plugins: [iconLabelsPlugin],
  });
  // Keep instance to redraw after icon load
  chartInstance = Chart.getChart(ctx);
}
