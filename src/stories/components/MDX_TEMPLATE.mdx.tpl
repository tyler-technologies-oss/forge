import { Meta, Title, Primary, Canvas, ArgTypes } from '@storybook/blocks';
import * as ComponentStories from './Component.stories';

<Meta of={ComponentStories} />

<Title />

Description goes here.

<Canvas of={ComponentStories.PrimaryStory} />

## Secondary story

Secondary story description goes here.

<Canvas of={ComponentStories.SecondaryStory} />

## API

<ArgTypes />

## Accessibility

Accessibility guidelines go here.
