import { useState } from "react";
import { Button, Input, Modal } from "antd";
import { supabase } from "../../../../shared/supabaseClient";

function ChangeInteresting() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [inputValue1, setInputValue1] = useState("");
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };
  const handleChange1 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue1(event.target.value);
  };
  const handleOk = () => {
    changeTopic(inputValue, inputValue1);
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  async function changeTopic(titleint: string, titleint1: string) {
    if (titleint && titleint1) {
      const {} = await supabase.from("topics").update({ title: titleint1 }).eq("title", titleint);
      window.location.reload();
    } else {
      alert("Введите интерес");
    }
  }
  return (
    <>
      <Button style={{ marginLeft: "10px" }} type="primary" onClick={showModal}>
        Изменить интерес
      </Button>
      <Modal
        title="Введите название"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Input placeholder="название, того что надо изменить" value={inputValue} onChange={handleChange}></Input>
        <Input placeholder="название, на которые надо изменить" style={{marginTop: '10px'}} value={inputValue1} onChange={handleChange1}></Input>
      </Modal>
    </>
  );
}

export default ChangeInteresting;
