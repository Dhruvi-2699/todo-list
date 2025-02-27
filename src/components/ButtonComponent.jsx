/* eslint-disable react/prop-types */

export const ButtonComponent = ({ icon, text, handleAction, isDisable }) => {
  return (
    <button
      disabled={isDisable}
      onClick={handleAction}
      className="cursor-pointer disabled:bg-yellow-300 bg-yellow-500 hover:bg-yellow-700 p-3 py-1 text-white rounded-md m-1 ml-2"
    >
      {icon} {text}
    </button>
  );
};
