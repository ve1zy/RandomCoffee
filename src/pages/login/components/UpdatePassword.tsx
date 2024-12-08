import { Button, Form, Input } from 'antd';
import type { FormProps } from 'antd';
import { supabase } from '../../../shared/supabaseClient';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

type FieldType = {
  password: string;
};

function UpdatePage() {
  const navigate = useNavigate();
  function containsDigitAndLetter(str: string) {
    const regex = /\d[a-zA-Z]|[a-zA-Z]\d/;
    return regex.test(str);
  }
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
  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    if(containsDigitAndLetter(values.password)){
        const {}=await supabase.auth.updateUser({password: values.password}
        )
        navigate('/');
    }
    else{
        alert('пароль должен содержать буквы и цифры');
    }
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
        label="Новый пароль"
        name="password"
        rules={[{ required: true, message: 'Введите пароль!' }]}
      >
        <Input.Password/>
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
        </div>
      </Form.Item>
    </Form>
  );
}

export default UpdatePage;
