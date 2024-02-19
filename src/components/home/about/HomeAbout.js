import { useNavigate } from "react-router-dom";

const HomeAbout = () => {
  document.title = "Mobile Planet";

  const navigate = useNavigate();
  return (
    <div className="flex gap-10 lg:gap-0 mx-8 sm:mx-12 lg:mx-32 flex-col lg:flex-row mt-24 mb-20">
      <div className="lg:w-[50%]">
        <img src={`${window.location.origin}/assets/about.jpg`} alt="about" />
      </div>
      <div className="flex flex-col space-y-2 lg:ml-14 justify-center lg:w-[50%]">
        <p className="text-lg font-semibold">Since year 2023</p>
        <h2 className="text-4xl font-bold">
          We are <span className="text-[#F28123]">Mobile planet</span>
        </h2>
        <p>We sell mobile at lowest price.</p>
        <p>
          Purchase mobile at genuiue price and we are providing easy home
          delivery option.
        </p>
        <div className="mt-14">
          <button
            onClick={() => {
              navigate("/about");
            }}
            className="buttons mt-3"
          >
            Know More
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomeAbout;
