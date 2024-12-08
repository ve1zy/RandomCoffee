import {Collapse, Button, Layout, Menu, theme } from 'antd';
const { Header, Sider, Content } = Layout;
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { supabase } from '../../shared/supabaseClient';
import TopicsList from './components/TopicsList';
import { useState } from 'react';
import PlaceList from './components/PlaceList';
import UserList from './components/UserList';
import { MenuOutlined } from '@ant-design/icons';

interface MenuProps {
  key: string;
}
const { Panel } = Collapse;
function AdminPage() {
  const [current, setCurrent] = useState(() => {
    const savedCurrent = localStorage.getItem('currentMenu');
    return savedCurrent ? savedCurrent : 'interesting';
  });
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };
  const navigate = useNavigate();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        navigate('/login');
      }
    };
    checkSession();
  }, []);

  async function logout() {
    supabase.auth.signOut();
    navigate('/login');
  }
  
    const handleClick = (e: MenuProps) => {
      setCurrent(e.key);
      localStorage.setItem('currentMenu', e.key);
    };
    const selectedItem = current;
  useEffect(() => {
      localStorage.setItem('currentMenu', current);
    }, [current]);
  return (
    <Layout style={{ height: '100vh' }}>
      <Sider style={{ background: colorBgContainer }}>
        <Button type="primary" onClick={toggleCollapse}><MenuOutlined /></Button>
        <Collapse ghost defaultActiveKey={['1']} activeKey={collapsed ? ['0'] : [1]}>
        <Panel header="Menu" key="1">
        <Menu
      defaultSelectedKeys={['interesting']}
      selectedKeys={[current]}
      onClick={handleClick}
      mode="inline"
    >
      <Menu.Item key="interesting">Интересы</Menu.Item>
      <Menu.Item key="places">Места</Menu.Item>
      <Menu.Item key="users">Пользователи</Menu.Item>
    </Menu>
        </Panel>
        </Collapse>
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'end',
              alignItems: 'center',
              width: '100%',
              height: '100%',
              padding: '15px',
              columnGap: '15px',
            }}
          >
            <img src="ПМиФИ.svg" style={{marginRight: '50px' ,width: '50px', height: '50px'}} />
            <img src="Effective.svg" style={{marginRight: '50px' ,width: '100px', height: '100px'}} />
            <img src="https://notion-emojis.s3-us-west-2.amazonaws.com/prod/svg-twitter/2615.svg" alt="☕" style={{marginRight: '50px' ,width: '30px', height: '30px'}} />
            <Button type="primary" color="danger" onClick={() => navigate('/update')}>
              Смена пароля
            </Button>
            <Button type="primary" color="danger" onClick={() => logout()}>
              Выйти
            </Button>
          </div>
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          {selectedItem=='interesting' ? <TopicsList/>: (selectedItem=='places' ? <PlaceList/> : <UserList/>)}
        </Content>
      </Layout>
    </Layout>
  );
}

export default AdminPage;
