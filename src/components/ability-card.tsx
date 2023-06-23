import { AbilityData } from '../api/ability';
import { useAbility } from '../state/hooks/use-ability';
import { Card, Descriptions } from 'antd';

interface AbilityCardProps {
  ability: {
    name: AbilityData['name'];
  };
}

export const AbilityCard = ({ ability: { name } }: AbilityCardProps) => {
  const ability = useAbility(name);
  if (!ability) return <Card loading />;

  return (
    <Card title={name}>
      <Card.Grid style={{ width: '100%' }}>
        <Descriptions>
          <Descriptions.Item label="Effect">
            {ability.effect_entry.effect}
          </Descriptions.Item>
        </Descriptions>
      </Card.Grid>
    </Card>
  );
};
