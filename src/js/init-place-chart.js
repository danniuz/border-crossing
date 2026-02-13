// Original data structure

const isMobile = window.innerWidth <= 767;

const originalData = {
  labels: ['אפריל', 'מרץ', 'פברואר', 'ינואר'],
  categories: [
    {
      label: 'Trucks',
      data: [122, 570, 250, 1065],
      backgroundColor: '#007EA7',
      borderWidth: 0,
      iconPath: new URL(
        '../assets/icons/chart-truck--mobile.svg',
        import.meta.url,
      ).toString(),
    },
    {
      label: 'Cars',
      data: [507, 365, 105, 680],
      backgroundColor: '#FFFFFF',
      borderWidth: 0,
      iconPath: new URL(
        '../assets/icons/chart-car--mobile.svg',
        import.meta.url,
      ).toString(),
    },
    {
      label: 'People',
      data: [124, 138, 60, 250],
      backgroundColor: '#5CD6FF',
      borderWidth: 0,
      iconPath: new URL(
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

function calculateYAxisConfig(data) {
  const { labels, categories } = data;
  let maxBarHeight = 0;

  // Find the maximum stacked bar height
  for (let i = 0; i < labels.length; i++) {
    const total = categories.reduce((sum, category) => {
      return sum + category.data[i];
    }, 0);
    maxBarHeight = Math.max(maxBarHeight, total);
  }

  // Add 20% to maxBarHeight
  const targetMax = maxBarHeight * 1.2;

  // Determine rounding divisor based on target value
  let divisor;
  if (targetMax <= 10000) {
    divisor = 1000;
  } else {
    divisor = 5000;
  }

  // Round up to nearest divisor
  const maxY = Math.ceil(targetMax / divisor) * divisor;

  // Calculate step size: 4 lines on mobile (4 ticks including 0), 5 lines on desktop (5 ticks including 0)
  const stepSize = isMobile ? maxY / 3 : maxY / 4;

  return {
    maxY,
    stepSize,
  };
}

const data = transformDataForSortedBars(originalData);
const yAxisConfig = calculateYAxisConfig(originalData);

export function initPlaceChart() {
  const ctx = document.getElementById('myChart');

  Chart.register(ChartDataLabels);

  // Load all unique icons
  const iconImagesMap = {};
  originalData.categories.forEach((cat) => {
    const img = new Image();
    img.crossOrigin = 'anonymous'; // Enable CORS if needed
    img.src = cat.iconPath;
    iconImagesMap[cat.iconPath] = img;
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

  const customYAxisLabelsPlugin = {
    id: 'customYAxisLabelsPlugin',
    afterFit(scale) {
      // Force Y-axis width to 0 on both mobile and desktop to start from left edge
      if (scale.id === 'y') {
        scale.width = 0;
        scale.paddingLeft = 0;
        scale.paddingRight = 0;
      }
    },
    afterLayout(chart) {
      // Force chart area to start from left edge on both mobile and desktop
      chart.chartArea.left = 0;
    },
    afterDraw(chart) {
      const { ctx, scales } = chart;
      const yScale = scales.y;
      const xScale = scales.x;

      if (!yScale || !xScale) return;

      ctx.save();

      // Draw custom labels above the grid lines starting from left edge
      yScale.ticks.forEach((tick, index) => {
        if (tick.value === 0) return; // Skip the 0 label as in the original config

        const y = yScale.getPixelForValue(tick.value);

        // Draw the label above the grid line with 10px gap
        ctx.fillStyle = '#FFFFFF';
        ctx.font = isMobile
          ? '400 14px IBM Plex Sans Hebrew'
          : '500 18px IBM Plex Sans Hebrew';
        ctx.textAlign = 'left';
        ctx.textBaseline = 'bottom';

        const labelText = tick.value.toLocaleString();
        ctx.fillText(labelText, 0, y - 10); // 10px gap above the line
      });

      ctx.restore();
    },
  };

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
          // Check if icon is loaded and valid
          if (
            !icon ||
            !icon.complete ||
            icon.naturalWidth === 0 ||
            icon.naturalHeight === 0
          ) {
            return;
          }

          // On desktop, always show icons
          if (!isMobile) {
            // Position near the end of the bar segment
            const pos = barElement.tooltipPosition();
            const iconSize = 30;

            try {
              // Apply filter to make icon white on desktop
              ctx.filter = 'brightness(0) invert(1)';
              ctx.drawImage(
                icon,
                pos.x + iconSize + 6,
                pos.y - iconSize * 1.4,
                iconSize,
                iconSize,
              );
              // Reset filter
              ctx.filter = 'none';
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

          // Position icon inside/near the label on mobile
          const pos = barElement.tooltipPosition();
          const iconSize = 16;

          try {
            const isLastBar = barIndex === chart.data.labels.length - 1;
            const iconX = isLastBar
              ? pos.x + iconSize - 6
              : pos.x + iconSize + 44;

            // Draw icon without filter on mobile (keep original color)
            ctx.drawImage(
              icon,
              iconX,
              pos.y - iconSize / 2,
              iconSize,
              iconSize,
            );
          } catch (error) {
            console.error('Failed to draw icon:', categoryInfo.iconPath, error);
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
          top: 30, // Space for Y-axis labels above grid lines
          bottom: 0,
          left: isMobile ? 50 : 60, // Space between Y-axis labels and first bar
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
          max: yAxisConfig.maxY,
          min: 0,
          stacked: true,
          grace: 0,
          position: 'left',
          ticks: {
            stepSize: yAxisConfig.stepSize,
            color: '#FFFFFF',
            font: {
              size: 18,
              weight: 500,
            },
            padding: 0,
            align: 'end',
            crossAlign: 'far',
            display: false, // Hide default Y-axis labels on both mobile and desktop (using custom plugin)
            callback: () => '', // Return empty string to take up no space
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
            drawTicks: false, // Hide tick marks on both mobile and desktop
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
          barThickness: isMobile ? 'flex' : 16,
          maxBarThickness: isMobile ? 16 : 16,
          barPercentage: isMobile ? 0.8 : 1.0,
          categoryPercentage: isMobile ? 0.9 : 1.0,
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
    plugins: [customYAxisLabelsPlugin, iconLabelsPlugin],
  });
  // Keep instance to redraw after icon load
  chartInstance = Chart.getChart(ctx);
}
