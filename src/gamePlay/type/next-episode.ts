import { NextPassage } from './next-passage';
import { NextStory } from './next-story';
import { NextOption } from './next.option';

export interface NextEpisode {
  nextStory: NextStory,
  nextPassages: NextPassage[],
  nextOptions: NextOption[][],
}