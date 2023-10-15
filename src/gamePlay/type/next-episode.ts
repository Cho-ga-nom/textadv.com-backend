import { NextPassage } from './next-passage';
import { NextStory } from './next-story';
import { NextOption } from './next.option';

export interface NextEpisode {
  story: NextStory,
  passages: NextPassage[],
  options: NextOption[][],
}