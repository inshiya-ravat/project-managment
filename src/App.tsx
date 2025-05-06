import React, { useState } from "react";
import "./App.css";
import Sidebar from "./component/sidebar/Sidebar";
import styled from "styled-components";
import Content from "./component/content/Content";
import AddProjectForm from "./component/AddProjectForm/AddProjectForm";
import { generateID } from "./utils/idGenerator";

export type Task = {
  id: number;
  task: string;
  completed: boolean;
};
export type Project = {
  id: number;
  title: string;
  desc: string;
  dueDate: string;
  tasks: Task[];
};

const Container = styled.div`
  display: grid;
  grid-template-columns: minmax(auto, 300px) 1fr;
  gap: 50px;
`;

const idGenerator = generateID();
const taskIdGenerator = generateID();
function App() {
  const [isAddClicked, setIsAddClicked] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [currentProject, setCurrentProject] = useState<Project>();
  function handleAddClick(action: string) {
    if (action === "cancel") {
      setIsAddClicked(() => false);
    } else {
      setIsAddClicked(() => true);
    }
  }
  function handleSave(title: string, description: string, dueAt: string) {
    setIsAddClicked(() => false);
    setProjects((prevProjects) => {
      const newProjects = [...prevProjects];
      const newId = idGenerator();
      newProjects.push({
        id: newId,
        title: title,
        desc: description,
        dueDate: dueAt,
        tasks: [],
      });
      return newProjects;
    });
  }
  function selectProject(
    e: React.MouseEvent<HTMLButtonElement>,
    title: string,
  ) {
    if (e.target instanceof HTMLButtonElement) {
      setCurrentProject(
        () => projects.find((project) => project.title === title)!,
      );
    }
    console.log(projects);
  }
  function addTask(taskToBeAdded: string | undefined) {
    if (taskToBeAdded && currentProject) {
      const newTaskId = taskIdGenerator();
      const updatedTasks = [
        ...currentProject.tasks,
        { id: newTaskId, task: taskToBeAdded, completed: false },
      ];

      const updatedProject = { ...currentProject, tasks: updatedTasks };

      setCurrentProject(updatedProject);
      setProjects((prevProjects) =>
        prevProjects.map((p) =>
          p.id === currentProject.id ? updatedProject : p,
        ),
      );
    }
  }
  function deleteTask(id: number) {
    if (currentProject) {
      const updatedTasks = currentProject.tasks.filter(
        (task) => task.id !== id,
      );
      const updatedProject = { ...currentProject, tasks: updatedTasks };

      setCurrentProject(updatedProject);
      setProjects((prevProjects) =>
        prevProjects.map((p) =>
          p.id === currentProject.id ? updatedProject : p,
        ),
      );
    }
  }
  function markAsDone(id: number) {
    if (currentProject) {
      const updatedTasks = currentProject.tasks.map((task) =>
        task.id === id ? { ...task, completed: true } : task,
      );

      const updatedProject = { ...currentProject, tasks: updatedTasks };

      setCurrentProject(updatedProject);
      setProjects((prevProjects) =>
        prevProjects.map((p) =>
          p.id === currentProject.id ? updatedProject : p,
        ),
      );
    }
  }
  return (
    <Container>
      <div>
        <Sidebar
          toggleAddClicked={handleAddClick}
          projects={projects}
          selectProject={selectProject}
        />
      </div>
      <div>
        {isAddClicked ? (
          <AddProjectForm
            handleCancel={handleAddClick}
            handleSave={handleSave}
          />
        ) : (
          <Content
            currentProject={currentProject}
            addTask={addTask}
            deleteTask={deleteTask}
            markAsDone={markAsDone}
          />
        )}
      </div>
    </Container>
  );
}

export default App;

// improvements:
// due date should be a future date only
// each project object has tasks array in it to store all the tasks added for that project.
// on add task, set the projects state, similary do it for delete
// add done property to tasks state and mark it done/not-done based on done propert. remove isDone state.
// delete projects functionality.
// generic styled components. dont make multiple component for less styling (pass props in styled compoennt)
