import { useState } from "react";

const AlertThresholds = () => {
    const [threshold, setThreshold] = useState(35);
  
    const handleSubmit = (e) => {
      e.preventDefault();
      // Save threshold logic
      console.log(threshold);
    };
  
    return (
      <div className="p-6 rounded-lg shadow-lg hover:bg-yellow-200 ">
        <h2 className="text-2xl  font-bold mb-4">Set Alert Thresholds</h2>
        <form onSubmit={handleSubmit}>
          <label className="block mb-2  mt-7">Temperature Threshold (°C)</label>
          <input
            type="number"
            value={threshold}
            onChange={(e) => setThreshold(e.target.value)}
            className="border rounded p-2 w-1/2 mb-4"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white ml-10 py-2 px-6 rounded hover:bg-green-600"
          >
            Save
          </button>
        </form>
      </div>
    );
  };
  export default AlertThresholds;
  