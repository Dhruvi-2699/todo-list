/* eslint-disable react/prop-types */
import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import { ButtonComponent } from "./ButtonComponent";
import { Checkbox } from "./Checkbox";

export const TodoComponent = ({
  item,
  handleCheckBox,
  handleEdit,
  handleDelete,
}) => {
  return (
    <div key={item.id} className="todo flex items-center">
      <Checkbox
        toggleAction={handleCheckBox}
        value={item.isCompleted}
        name={item.id}
      />
      <div
        className={`flex-1 text-sm ${
          item.isCompleted ? "line-through" : ""
        } other-classes`}
      >
        {item.todo}
      </div>
      <div className="buttons">
        <ButtonComponent
          icon={<FaEdit />}
          handleAction={() => handleEdit(item.id)}
        />
        <ButtonComponent
          icon={<AiFillDelete />}
          handleAction={() => handleDelete(item.id)}
        />
      </div>
    </div>
  );
};
