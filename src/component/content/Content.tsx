import React, { useRef } from "react";
import { Project } from "../../App";
import Add from "../../assets/add.svg";
import "./Content.css";
import {
  Button,
  Heading,
  Input,
  UnorderedList,
  ListItem,
} from "../../styles/StyledCompoenents";

interface ContentProp {
  currentProject: Project | undefined;
  addTask: (taskToBeAdded: string | undefined) => void;
  markAsDone: (id: number) => void;
  deleteTask: (id: number) => void;
}

const Content = ({
  currentProject,
  addTask,
  deleteTask,
  markAsDone,
}: ContentProp) => {
  const taskRef = useRef<HTMLInputElement>(null);
  return (
    <div>
      <ul>
        {currentProject ? (
          <div>
            <div className="basic-info-container">
              <Heading>{currentProject.title}</Heading>
              <p>{currentProject.desc}</p>
            </div>
            <p className="due-date">Due: {currentProject.dueDate}</p>
            <hr></hr>
            <div>
              <Heading>Tasks</Heading>
              <div className="task-input-container">
                <Input
                  className="task-input"
                  placeholder="Enter task here..."
                  ref={taskRef}
                  type="text"
                />
                <Button
                  className="hide"
                  onClick={() => addTask(taskRef.current?.value)}
                >
                  <img src={Add} alt="add task" />
                </Button>
              </div>
              {currentProject.tasks ? (
                <UnorderedList>
                  {currentProject.tasks.map((task) => (
                    <ListItem className="task-list" key={task.id}>
                      <p>{task.task}</p>
                      {task.completed ? (
                        <Button className="not-done" disabled>
                          Marked as done
                        </Button>
                      ) : (
                        <Button
                          className="done"
                          onClick={() => markAsDone(task.id)}
                        >
                          Mark as done
                        </Button>
                      )}
                      <Button
                        className="cancel"
                        onClick={() => deleteTask(task.id)}
                      >
                        delete
                      </Button>
                    </ListItem>
                  ))}
                </UnorderedList>
              ) : (
                <p>
                  No tasks Added. Try adding some tasks and track your progress!
                </p>
              )}
            </div>
          </div>
        ) : (
          <p>
            No projects selected. Either Select a project or add new Project!
          </p>
        )}
      </ul>
    </div>
  );
};

export default Content;
