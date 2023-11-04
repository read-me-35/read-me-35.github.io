import covid from "../../assets/images/covidimage.png";
import pregnancy from "../../assets/images/pregnancyimage.webp";
import ph from "../../assets/images/phimage.png";
import defaultImage from "../../assets/images/scanimage.png";

function ReadyPage(props) {
  let img = null;
  let titleText = "";
  switch (props.testType) {
    case "covid":
      img = covid;
      titleText = "Covid Test";
      break;
    case "pregnancy":
      img = pregnancy;
      titleText = "Pregnancy Test";
      break;
    case "ph":
      img = ph;
      titleText = "pH Level Test";
      break;
    default:
      img = defaultImage;
      titleText = "Test";
  }
  return (
    <div className=" text-white h-screen flex flex-col justify-center items-center">
      <div className="flex flex-col justify-center items-center space-y-4">
        <button
          className="bg-red-500 text-white px-6 py-3 rounded-lg w-36 flex flex-col items-center space-y-2"
          onClick={props.toPrevPage}
        >
          <span className="text-center">Back</span>
        </button>
        <div className="bg-gray-700 w-48 rounded-lg flex flex-col justify-center items-center p-4">
          <h2 className="font-bold text-lg">{titleText}</h2>
          <img
            src={img} // Replace with the actual path to your image
            alt="Image"
            className="w-28 h-28 my-4" // Adjust the width and height
          />
          <p className="text-gray-300 text-center mt-2">
            {`Prepare your camera and click "Next" when ready to scan.`}
          </p>
        </div>
        <button
          className="bg-green-500 text-white px-6 py-3 rounded-lg w-36 flex flex-col items-center space-y-2"
          onClick={props.toNextPage}
        >
          <span className="text-center">Next</span>
        </button>
      </div>
    </div>
  );
}

export default ReadyPage;
