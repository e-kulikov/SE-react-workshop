import { ReactElement } from 'react';
import {
  BugTwoTone,
  CloudTwoTone,
  ExclamationCircleTwoTone,
  ExperimentTwoTone,
  FireTwoTone,
  PictureTwoTone,
  SlidersTwoTone,
} from '@ant-design/icons';

export const TypeIcon: Record<string, () => ReactElement> = {
  fire: () => <FireTwoTone twoToneColor="orange" />,
  bug: () => <BugTwoTone twoToneColor="green" />,
  flying: () => <CloudTwoTone twoToneColor="lightgray" />,
  grass: () => <PictureTwoTone twoToneColor="lightgreen" />,
  poison: () => <ExperimentTwoTone twoToneColor="violet" />,
  water: () => <SlidersTwoTone twoToneColor="blue" />,
  default: () => <ExclamationCircleTwoTone twoToneColor="gray" />,
};
