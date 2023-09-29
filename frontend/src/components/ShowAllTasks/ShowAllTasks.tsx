import { useEffect, useState } from "react";

const ShowAllTasks = () => {
  const [data, setData] = useState([]);

  const getTasks = async () => {
    try {
      const response = await fetch("http://localhost:3000/v1/api/tasks");

      if (response.ok) {
        const result = await response.json();
        setData(result);
      } else {
        console.error("Request failed with status:", response.status);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <section>
      <div>
        Task count: <b>{data?.length === 0 ? "0" : data.length}</b>
        <button onClick={getTasks}>Refresh</button>
      </div>
      {data?.length === 0
        ? "No tasks added!"
        : data.map((task) => (
            <div key={task["_id"]}>
              <b>{task.title}</b>
              <p>{task.description}</p>
            </div>
          ))}
    </section>
  );
};

export default ShowAllTasks;
