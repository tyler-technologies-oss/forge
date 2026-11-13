import { barY, defineChart } from '@tanstack/charts';
import { scaleBand } from '@tanstack/charts/scales/band';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { tooltip } from '@tanstack/charts/tooltip';

export const downloads = [
  { month: 'Jan', downloads: 1200, package: 'Query' },
  { month: 'Feb', downloads: 1480, package: 'Query' },
  { month: 'Mar', downloads: 1710, package: 'Query' },
  { month: 'Apr', downloads: 1650, package: 'Query' },
  { month: 'May', downloads: 1920, package: 'Query' },
  { month: 'Jan', downloads: 420, package: 'Router' },
  { month: 'Feb', downloads: 510, package: 'Router' },
  { month: 'Mar', downloads: 640, package: 'Router' },
  { month: 'Apr', downloads: 760, package: 'Router' },
  { month: 'May', downloads: 910, package: 'Router' }
];

export const signups = [
  { channel: 'Search', value: 84 },
  { channel: 'Direct', value: 63 },
  { channel: 'Referral', value: 47 },
  { channel: 'Social', value: 31 }
];

export const activeUsers = Array.from({ length: 30 }, (_, index) => ({
  day: index + 1,
  users: Math.round(400 + index * 12 + Math.sin(index / 2) * 60)
}));

export const measurements = Array.from({ length: 40 }, (_, index) => {
  const height = 150 + ((index * 37) % 45);
  return { height, weight: Math.round(height * 0.55 - 28 + Math.sin(index) * 7), group: index % 2 ? 'B' : 'A' };
});

export const customBarChart = defineChart(
  {
    marks: [barY(signups, { x: 'channel', y: 'value', inset: 2 })],
    scales: {
      x: {
        scale: () =>
          scaleBand<string>()
            .domain(signups.map(row => row.channel))
            .padding(0.16)
      },
      y: { scale: scaleLinear, nice: true, grid: true, axis: { label: 'Weekly signups' } }
    }
  },
  { tooltip }
);
