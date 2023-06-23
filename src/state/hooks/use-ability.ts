import { AbilityData } from '../../api/ability';
import { useStateManager } from '../index';
import { useEffect } from 'react';
import { api } from '../../api';
import { saveAbilityData } from '../actions';

export const useAbility = (name: AbilityData['name']) => {
  const {
    state: { abilityData },
    dispatch,
  } = useStateManager();
  const existed = abilityData[name];

  useEffect(() => {
    if (existed) return;
    api.ability
      .getOne({ name })
      .then((abilityData) => dispatch(saveAbilityData(abilityData)));
  }, [dispatch, existed, name]);

  return existed;
};
