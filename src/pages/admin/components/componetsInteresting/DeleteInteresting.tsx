import { useState } from "react";
import { Button, Input, Modal } from "antd";
import { supabase } from "../../../../shared/supabaseClient";

function DeleteInteresting() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };
  const handleOk = () => {
    deleteTopic(inputValue);
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  async function deleteTopic(titleint: string) {
    if(titleint){
      await supabase.from('topics').delete().eq('title', titleint)
      window.location.reload();
    }
    else{
      alert('Введите интерес');
    }
  }
  return (
    <>
      <Button style={{marginLeft: '10px'}} type="primary" onClick={showModal}>
        Удалить интерес
      </Button>
      <Modal
        title="Введите название"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Input value={inputValue} onChange={handleChange}></Input>
      </Modal>
    </>
  );
}

export default DeleteInteresting;
