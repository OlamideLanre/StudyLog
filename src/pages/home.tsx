import { Plus, Sun } from "lucide-react";
import Sidebar from "../components/sidenav";
import Modal from "../components/modal";

const BrainCrumbs = () => {
  return (
    <div className="flex h-screen bg-black text-white">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header with theme toggle */}
        <div className="flex justify-end p-6">
          <button className="text-white hover:text-gray-300 transition-colors">
            <Sun size={24} />
          </button>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col items-center justify-center px-8">
          <h1 className="text-5xl font-bold mb-4">BrainCrumbs</h1>
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
            <div
              onClick={() => document.getElementById("my_modal_3").showModal()}
              className="bg-gray-900 border border-gray-700 rounded-xl p-8 min-w-[150] hover:bg-gray-800 transition-colors cursor-pointer flex items-center justify-center"
            >
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <span className="text-xl font-semibold text-gray-400">
                    New Entry
                  </span>
                  <Plus size={20} className="text-gray-400" />
                </div>
              </div>
            </div>
            <Modal />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrainCrumbs;
