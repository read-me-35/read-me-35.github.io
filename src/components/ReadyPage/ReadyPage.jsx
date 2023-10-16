function ReadyPage() {
    return (
      <div className="bg-gray-900 text-white h-screen flex flex-col justify-center items-center">
        <div className="flex-1 flex flex-col justify-center items-center space-y-4">
          <button className="bg-red-500 text-white px-8 py-4 rounded-lg flex flex-col items-center space-y-2">
            <span>Back</span>
            <img
              src="path-to-your-image.png" // Replace with the actual path to your image
              alt="Icon"
              className="w-6 h-6"
            />
          </button>
          <div className="text-gray-300 text-center">
            <p>Prepare your camera, and click next when ready to scan</p>
          </div>
          <button className="bg-green-300 text-white px-8 py-4 rounded-lg flex flex-col items-center space-y-2">
            <span>Next</span>
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
  
  export default ReadyPage;
  