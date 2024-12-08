import { Button, Form, Input } from 'antd';
import type { FormProps } from 'antd';
import { supabase } from '../../../shared/supabaseClient';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

type FieldType = {
  email: string;
};

function ResetPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session) {
        navigate('/');
      }
    };
    checkSession();
  }, []);
  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    const {} = await supabase.auth.resetPasswordForEmail(values.email, {
      redirectTo: 'http://localhost:5173/update',
    })
  };

  return (
    <Form
      name="login"
      style={{
        minWidth: 500,
        background: 'white',
        padding: '20px',
        borderRadius: '16px',
      }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
    >
      <Form.Item<FieldType>
        label="Электронная почта"
        name="email"
        rules={[{ required: true, message: 'Введите Email!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            columnGap: '5px',
          }}
        >
          <Button style={{ width: '50%' }} type="primary" htmlType="submit">
            Подтвердить
          </Button>
          <Button onClick={()=>navigate('/')} style={{ width: '50%' }} type="primary" htmlType="submit">
            Назад
          </Button>
        </div>
      </Form.Item>
    </Form>
  );
}

export default ResetPage;
