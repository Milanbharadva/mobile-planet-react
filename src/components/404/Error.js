import { useNavigate } from "react-router-dom";

const Error = () => {
  const navigate = useNavigate();
  return (
    <div className="flex mt-5 gap-3 flex-col justify-center items-center">
      <h1 className="text-3xl font-bold text-red-700">Page not found</h1>
      <button
        className="buttons mt-3"
        onClick={() => {
          navigate("/");
        }}
      >
        Go back to homepage
      </button>
    </div>
  );
};

export default Error;
