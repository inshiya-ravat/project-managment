import React, { useRef } from "react";
import { Input, Button, Form, Label } from "../../styles/StyledCompoenents";
import "./AddProjectForm.css";

interface AddProjectFormProp {
  handleSave: (title: string, description: string, dueAt: string) => void;
  handleCancel: (action: string) => void;
}

const AddProjectForm = ({ handleCancel, handleSave }: AddProjectFormProp) => {
  const titleRef = useRef<HTMLInputElement>(null);
  const descRef = useRef<HTMLInputElement>(null);
  const dueDateRef = useRef<HTMLInputElement>(null);
  return (
    <Form onSubmit={(e) => e.preventDefault()}>
      <div>
        <Label>TITLE</Label>
        <Input ref={titleRef} name="title" type="text" />
      </div>
      <div>
        <Label>DESCRIPTION</Label>
        <Input ref={descRef} name="desc" type="text" />
      </div>
      <div>
        <Label>DUE DATE</Label>
        <Input ref={dueDateRef} name="due" type="date" />
      </div>
      <div>
        <Button className="cancel" onClick={() => handleCancel("cancel")}>
          Cancel
        </Button>
        <Button
          className="save"
          onClick={() =>
            handleSave(
              titleRef.current!.value,
              descRef.current!.value,
              dueDateRef.current!.value,
            )
          }
        >
          Save
        </Button>
      </div>
    </Form>
  );
};

export default AddProjectForm;
