import { useState } from "react";
import { Button, Input, Modal } from "antd";
import { supabase } from "../../../../shared/supabaseClient";

function AddPlace() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [inputValue1, setInputValue1] = useState("");
  const [inputValue2, setInputValue2] = useState("");
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };
  const handleChange1 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue1(event.target.value);
  };
  const handleChange2 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue2(event.target.value);
  };
  const handleOk = () => {
    changeTopic(inputValue, inputValue1, inputValue2);
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  async function changeTopic(titleint: string, titleint1: string, titleint2: string) {
    if (titleint && titleint1 && titleint2) {
      const {} = await supabase.from("places").insert({ title: titleint, location: `Point(${titleint1} ${titleint2})`});
      window.location.reload();
    } else {
      alert("Введите верно");
    }
  }
  return (
    <>
      <Button style={{ marginLeft: "10px" }} type="primary" onClick={showModal}>
        Добавить место
      </Button>
      <Modal
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Input style={{marginTop: '30px'}} placeholder="Название метса" value={inputValue} onChange={handleChange}></Input>
        <Input placeholder="широта" style={{marginTop: '10px'}} value={inputValue1} onChange={handleChange1}></Input>
        <Input placeholder="долгота" style={{marginTop: '10px'}} value={inputValue2} onChange={handleChange2}></Input>
      </Modal>
    </>
  );
}

export default AddPlace;
