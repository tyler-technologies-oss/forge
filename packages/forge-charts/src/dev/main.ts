import '@tylertech/forge/dist/forge.css';
import './main.scss';

import '@tylertech/forge/scaffold';
import '@tylertech/forge/app-bar';
import '@tylertech/forge/card';
import '@tylertech/forge/toolbar';
import '@tylertech/forge/icon';
import '@tylertech/forge/icon-button';
import '@tylertech/forge/key';
import { IconRegistry } from '@tylertech/forge/icon';
import { tylIconBrightness3, tylIconForgeLogo, tylIconWbSunny } from '@tylertech/tyler-icons';
import '../lib/index.js';
import type { AreaChartComponent, BarChartComponent, ChartComponent, LineChartComponent, PieChartComponent, ScatterChartComponent } from '../lib/index.js';

import { activeUsers, customBarChart, downloads, measurements, signups } from './charts.js';
import { listenThemeChange } from './theme.js';

IconRegistry.define([tylIconForgeLogo, tylIconBrightness3, tylIconWbSunny]);

const query = <T extends Element>(id: string): T => {
  const element = document.querySelector<T>(`#${id}`);
  if (!element) {
    throw new Error(`Missing demo element #${id}`);
  }
  return element;
};

query<LineChartComponent>('line-chart').data = downloads;
query<BarChartComponent>('bar-chart').data = signups;
query<AreaChartComponent>('area-chart').data = activeUsers;
query<ScatterChartComponent>('scatter-chart').data = measurements;
query<PieChartComponent>('pie-chart').data = signups;
query<PieChartComponent>('donut-chart').data = signups;
query<ChartComponent>('custom-chart').definition = customBarChart;

await listenThemeChange();
await Promise.allSettled(['forge-app-bar', 'forge-scaffold', 'forge-card'].map(tag => customElements.whenDefined(tag)));

document.body.classList.add('ready');
