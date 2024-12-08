import {Table } from "antd";
import { supabase } from "../../../shared/supabaseClient";
import { useEffect, useState } from "react";

function UserList() {
  const [data, setData] = useState(new Array<Object>());
  useEffect(() => {
    const fetchData = async () => {
      const { data: users, error: usersError } = await supabase
    .from('users')
    .select('*');

  if (usersError) {
    console.error('Error fetching users:', usersError);
    return;
  }

  // Запрос всех записей users_to_topics
  const { data: usersToTopics, error: usersToTopicsError } = await supabase
    .from('users_to_topics')
    .select('*');

  if (usersToTopicsError) {
    console.error('Error fetching users_to_topics:', usersToTopicsError);
    return;
  }

  // Запрос всех тем
  const { data: topics, error: topicsError } = await supabase
    .from('topics')
    .select('*');

  if (topicsError) {
    console.error('Error fetching topics:', topicsError);
    return;
  }

  // Запрос всех мест
  const { data: places, error: placesError } = await supabase
    .from('places')
    .select('*');

  if (placesError) {
    console.error('Error fetching places:', placesError);
    return;
  }

  // Запрос всех записей users_to_places
  const { data: usersToPlaces, error: usersToPlacesError } = await supabase
    .from('users_to_places')
    .select('*');

  if (usersToPlacesError) {
    console.error('Error fetching users_to_places:', usersToPlacesError);
    return;
  }
console.log(usersToPlaces)
  // Объединение данных
  const combinedData = users.map(user => {
    const userTopics = usersToTopics
      .filter(topicLink => topicLink.id === user.users_id) // Используем users_id для фильтрации
      .map(topicLink => {
        const topic = topics.find(topic => topic.topic_id === topicLink.id); // Используем topic_id для поиска темы
        return topic.title;
      }).join(', ');
    const userPlaces = usersToPlaces
      .filter(placeLink => placeLink.id === user.users_id) // Используем users_id для фильтрации
      .map(placeLink => {
        const place = places.find(place => place.places_id === placeLink.id); // Используем places_id для поиска места
        return `${place.id}: ${place.title}`; // Добавляем идентификатор места в начало строки
      })
      .join(', '); // Объединяем имена мест в одну строку
    return {
      ...user,
      topics: userTopics,
      places: userPlaces
    };
  });

  
  console.log(combinedData);
  setData(combinedData);
    }
    fetchData();
  }, []);
  const columns = [
    {
      title: "Имя",
      dataIndex: "first_name",
    },
    {
      title: "Фамилия",
      dataIndex: "last_name",
    },
    {
      title: "Интересы",
      dataIndex: "topics",
    },
    {
      title: "Места",
      dataIndex: "places",
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
      <Table pagination={false} dataSource={data} columns={columns} />
    </>
  );
}

export default UserList;
