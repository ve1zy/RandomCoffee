import { useState } from "react";
import { Button, Input, Modal } from "antd";
import { supabase } from "../../../../shared/supabaseClient";

function AddInteresting() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };
  const handleOk = () => {
    addTopic(inputValue);
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  async function addTopic(titleint: string) {
    if(titleint){
      await supabase.from("topics").insert({ title: titleint });
      window.location.reload();
    }
    else{
      alert('Введите интерес');
    }
  }
  return (
    <>
      <Button type="primary" onClick={showModal}>
        Добавить интерес
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

export default AddInteresting;
