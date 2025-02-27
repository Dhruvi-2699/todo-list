/* eslint-disable react/prop-types */

export const Checkbox = ({ toggleAction, value, name }) => {
  return (
    <input
      onChange={toggleAction}
      type="checkbox"
      checked={value}
      name={name}
      className="mr-2"
    />
  );
};
