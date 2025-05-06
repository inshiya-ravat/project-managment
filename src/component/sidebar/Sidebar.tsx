import React from "react";
import { Project } from "../../App";
import Point from "../../assets/point.svg";
import {
  Button,
  Heading,
  ListItem,
  UnorderedList,
} from "../../styles/StyledCompoenents";
import "./Sidebar.css";

export interface SidebarProp {
  toggleAddClicked: (action: string) => void;
  projects: Project[];
  selectProject: (
    e: React.MouseEvent<HTMLButtonElement>,
    title: string,
  ) => void;
}
const Sidebar = ({
  toggleAddClicked,
  projects,
  selectProject,
}: SidebarProp) => {
  return (
    <div className="sidebar-container">
      <Heading>Your Projects</Heading>
      <button onClick={() => toggleAddClicked("add")}>+ Add Projects</button>
      <hr></hr>
      <UnorderedList>
        {projects.map((project) => (
          <ListItem key={project.title}>
            <img style={{ verticalAlign: "middle" }} src={Point} alt="point" />
            <Button
              className="project hide"
              onClick={(e) => selectProject(e, project.title)}
            >
              {project.title}
            </Button>
          </ListItem>
        ))}
      </UnorderedList>
    </div>
  );
};

export default Sidebar;
