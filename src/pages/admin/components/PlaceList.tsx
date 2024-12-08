import { Table, Input } from "antd";
import { supabase } from "../../../shared/supabaseClient";
import { useEffect, useState } from "react";
import AddPlace from "./componetsPlace/AddPlace";
import DeletePlace from "./componetsPlace/DeletePlace";

interface Place {
  id: number;
  title: string;
  location: string;
  created_at: string;
  updated_at: string;
}

function PlaceList() {
  const [inputValue, setInputValue] = useState('');
  const [indata, setIndata] = useState<Place[]>([]);
  const [data, setData] = useState<Place[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await supabase.from("places").select();
      if (data) {
        setData(data as Place[]);
        setIndata(data as Place[]);
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

  console.log(indata[0]);

  const columns = [
    {
      title: "id",
      dataIndex: "id",
    },
    {
      title: "Название",
      dataIndex: "title",
    },
    {
      title: "Координаты",
      dataIndex: "location",
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

  async function a() {
    const { data } = await supabase.rpc('get_places_with_location');
    console.log(data[0].location);
  }

  a();

  return (
    <>
      <AddPlace></AddPlace>
      <DeletePlace></DeletePlace>
      <Input value={inputValue} onChange={handleChange} placeholder="поиск" style={{ marginTop: '10px' }}></Input>
      <Table pagination={false} dataSource={data} columns={columns} />
    </>
  );
}

export default PlaceList;