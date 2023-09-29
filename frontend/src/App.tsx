import "./App.css";
import AddTask from "./components/AddTask";
import ShowAllTasks from "./components/ShowAllTasks";

function App() {
  return (
    <>
      <div>Create Task</div>
      <div>Read A Task</div>
      <div>Read All Tasks</div>
      <div>Update Task</div>
      <div>Delete Task</div>
      <AddTask />
      <ShowAllTasks />
    </>
  );
}

export default App;
