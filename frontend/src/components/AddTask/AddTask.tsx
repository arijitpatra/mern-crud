import { useState } from "react";

const AddTask = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  const handleInputChange = (event: {
    target: { name: string; value: string };
  }) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    try {
      const response = await fetch("http://localhost:3000/v1/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: formData.title,
          description: formData.description,
        }),
      });

      if (response.ok) {
        setFormData({
          title: "",
          description: "",
        });
      } else {
        console.error("Request failed with status:", response.status);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">Add Task</button>
      </form>
    </section>
  );
};

export default AddTask;
