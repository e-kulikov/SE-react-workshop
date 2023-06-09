import { Layout as AntdLayout, Space } from 'antd';
import { Outlet } from 'react-router-dom';
import { styled } from 'styled-components';

const Header = styled(AntdLayout.Header)({
  color: '#fff',
  textAlign: 'center'
});

export const Layout = () => (
  <Space direction="vertical" style={{width: '100%'}} size={[0, 48]}>
    <AntdLayout>
      <Header>Header</Header>
      <AntdLayout.Content><Outlet /></AntdLayout.Content>
      <AntdLayout.Footer>&copy; {new Date().getFullYear()} PokeList</AntdLayout.Footer>
    </AntdLayout>
  </Space>
);
