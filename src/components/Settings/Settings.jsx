import dark from "../../assets/images/moonimage.png";
import light from "../../assets/images/lightimage.png";
function Selection(props) {
  const { isLightMode, toggleMode } = props;

  return (
    <div
      className={` text-white h-screen flex flex-col justify-center items-center bg-transparent`}
    >
      <div className="flex-1 flex flex-col justify-center items-center space-y-4">
        <button
          className="bg-red-500 text-white px-4 py-2 rounded-lg w-32 flex flex-col items-center space-y-2"
          onClick={props.toNextPage}
        >
          <span className="text-center">Back</span>
        </button>
        <div className="my-2"></div> {/* Add space between buttons */}
        <button
          className={`${
            isLightMode ? "bg-gray-700 text-white" : "bg-white text-black"
          }  px-4 py-2 rounded-lg w-48 flex flex-col items-center space-y-2`}
          onClick={props.toggleDisplayMode}
        >
          <span className="text-center">{isLightMode ? "Dark" : "Light"}</span>
          {isLightMode ? (
            <img src={dark} alt="Icon" className="w-8 h-8" />
          ) : (
            <img src={light} alt="Icon" className="w-8 h-8" />
          )}
        </button>
      </div>
    </div>
  );
}

export default Selection;
