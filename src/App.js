import { ImSpotify } from "react-icons/im";
import Form from "./Form";

function App() {
  return (
    <div>
      <div className="bg-green-600  items-center py-4 flex justify-center gap-2 text-2xl text-white fixed w-full ">
        <ImSpotify />
        {/* Albu display API */}
        <h1 className="text-center font-medium text-2xl">
          Spotify Album Dispaly{" "}
        </h1>
      </div>
      <div>
        <Form />
      </div>
    </div>
  );
}

export default App;
