import Modal from "../components/modal/modal";

const BrainCrumbs = () => {
  return (
    <div className="flex h-screen bg-black text-white dark:bg-[#f6fff8] dark:text-black">
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Main Content Area */}
        <div className="flex-1 flex flex-col items-center justify-center px-8">
          <h1 className="text-5xl font-bold mb-4 dark:text-[#6b9080]">
            BrainCrumbs
          </h1>
          <p className="text-gray-400 text-xl mb-12">
            What are you saving today?
          </p>

          {/* Collection Cards */}
          <div className="">
            {/* Tech Card */}
            {/* <div className="border border-[#37474F] rounded-xl p-8 min-w-[200px] hover:bg-gray-800 transition-colors cursor-pointer">
              <h3 className="text-2xl font-semibold mb-2">Tech</h3>
              <p className="text-gray-400">10 saved</p>
            </div> */}

            {/* School Card */}
            {/* <div className="border border-[#37474F] rounded-xl p-8 min-w-[200px] hover:bg-gray-800 transition-colors cursor-pointer">
              <h3 className="text-2xl font-semibold mb-2">School</h3>
              <p className="text-gray-400">10 saved</p>
            </div> */}

            {/* New Tab Card */}
            <Modal />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrainCrumbs;
