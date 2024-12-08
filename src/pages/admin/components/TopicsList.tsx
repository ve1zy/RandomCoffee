import { Table, Input } from "antd";
import { supabase } from "../../../shared/supabaseClient";
import { useEffect, useState } from "react";
import AddInteresting from "./componetsInteresting/AddInteresting";
import ChangeInteresting from "./componetsInteresting/ChangeInteresting";
import DeleteInteresting from "./componetsInteresting/DeleteInteresting";

interface Topic {
  id: number;
  title: string;
  created_at: string;
  updated_at: string;
}

function TopicsList() {
  const [data, setData] = useState<Topic[]>([]);
  const [indata, setIndata] = useState<Topic[]>([]);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await supabase.from("topics").select();
      if (data) {
        setData(data as Topic[]);
        setIndata(data as Topic[]);
      }
    };
    fetchData();
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  useEffect(() => {
    const filteredData = indata.filter(item => item.title.startsWith(inputValue));
    setData(filteredData);
  }, [inputValue]);

  const columns = [
    {
      title: "Название",
      dataIndex: "title",
    },
    {
      title: "Время создания",
      dataIndex: "created_at",
    },
    {
      title: "Время последнего изменения",
      dataIndex: "updated_at",
    },
  ];

  return (
    <>
      <AddInteresting></AddInteresting>
      <ChangeInteresting></ChangeInteresting>
      <DeleteInteresting></DeleteInteresting>
      <Input value={inputValue} onChange={handleChange} placeholder="поиск" style={{ marginTop: '10px' }}></Input>
      <Table pagination={false} dataSource={data} columns={columns} />
    </>
  );
}

export default TopicsList;