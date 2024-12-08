import { useState } from "react";
import { Button, Input, Modal } from "antd";
import { supabase } from "../../../../shared/supabaseClient";

function DeletePlace() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };
  const handleOk = () => {
    changeTopic(inputValue);
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  async function changeTopic(titleint: string) {
    if (titleint) {
      const {} = await supabase.from("places").delete().eq('id', titleint)
      window.location.reload();
    } else {
      alert("Введите верно");
    }
  }
  return (
    <>
      <Button style={{ marginLeft: "10px" }} type="primary" onClick={showModal}>
        Удалить место
      </Button>
      <Modal
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Input style={{marginTop: '30px'}} placeholder="Айди" value={inputValue} onChange={handleChange}></Input>
      </Modal>
    </>
  );
}

export default DeletePlace;
