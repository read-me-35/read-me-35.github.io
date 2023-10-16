function Selection() {
  return (
    <div className="bg-gray-900 text-white h-screen flex flex-col justify-center items-center">
      <div className="flex-1 flex flex-col justify-center items-center">
        <button className="bg-red-500 text-white px-8 py-4 rounded-lg flex flex-col items-center space-y-2">
          <span>Back</span>
          <img
            src="path-to-your-image.png" // Replace with the actual path to your image
            alt="Icon"
            className="w-6 h-6"
          />
        </button>
        <button className="bg-yellow-500 text-white px-8 py-4 rounded-lg flex flex-col items-center space-y-2">
          <span>Covid</span>
          <img
            src="path-to-your-image.png" // Replace with the actual path to your image
            alt="Icon"
            className="w-6 h-6"
          />
        </button>
        <button className="bg-pink-500 text-white px-8 py-4 rounded-lg flex flex-col items-center space-y-2">
          <span>Pregancy</span>
          <img
            src="path-to-your-image.png" // Replace with the actual path to your image
            alt="Icon"
            className="w-6 h-6"
          />
        </button>
        <button className="bg-blue-500 text-white px-8 py-4 rounded-lg flex flex-col items-center space-y-2">
          <span>PH Level</span>
          <img
            src="path-to-your-image.png" // Replace with the actual path to your image
            alt="Icon"
            className="w-6 h-6"
          />
        </button>
      </div>
    </div>
  );
}

export default Selection;
