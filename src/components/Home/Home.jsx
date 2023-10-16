function Home() {
  return (
    <div className="bg-gray-900 text-white h-screen flex flex-col justify-center items-center">
      <div className="flex-1 flex flex-col justify-center items-center">
        <button className="bg-green-500 text-white px-8 py-4 rounded-lg flex flex-col items-center space-y-2">
          <span>Scan</span>
          <img
            src="path-to-your-image.png" // Replace with the actual path to your image
            alt="Icon"
            className="w-6 h-6"
          />
        </button>
        <button className="bg-gray-500 text-white px-8 py-4 rounded-lg flex flex-col items-center space-y-2">
          <span>Settings</span>
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

export default Home;
