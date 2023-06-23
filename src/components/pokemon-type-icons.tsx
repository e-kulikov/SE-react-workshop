import { ReactElement } from 'react';
import {
  BugTwoTone,
  CloudTwoTone,
  CompassTwoTone,
  ExclamationCircleTwoTone,
  ExperimentTwoTone,
  FireTwoTone,
  LikeTwoTone,
  PictureTwoTone,
  SettingTwoTone,
  SlidersTwoTone,
  StarTwoTone,
  ThunderboltTwoTone,
} from '@ant-design/icons';

export const TypeIcon: Record<string, () => ReactElement> = {
  fire: () => <FireTwoTone twoToneColor="orange" />,
  bug: () => <BugTwoTone twoToneColor="green" />,
  flying: () => <CloudTwoTone twoToneColor="lightgray" />,
  grass: () => <PictureTwoTone twoToneColor="lightgreen" />,
  poison: () => <ExperimentTwoTone twoToneColor="violet" />,
  water: () => <SlidersTwoTone twoToneColor="blue" />,
  electric: () => <ThunderboltTwoTone twoToneColor="red" />,
  ground: () => <SettingTwoTone twoToneColor="dark" />,
  normal: () => <CompassTwoTone twoToneColor="lightblue" />,
  fairy: () => <StarTwoTone twoToneColor="pink" />,
  fighting: () => <LikeTwoTone twoToneColor="red" />,
  default: () => <ExclamationCircleTwoTone twoToneColor="gray" />,
};
