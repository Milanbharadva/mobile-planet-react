import Breadcrumb from "../breadcrumb/Breadcrumb";
import { FaMoneyBillAlt, FaSyncAlt, FaTruck } from "react-icons/fa";
import { BsBriefcaseFill } from "react-icons/bs";
import { useEffect } from "react";
const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  document.title = "Mobile Planet | About";

  return (
    <section>
      <Breadcrumb paragraph="we sale mobiles" heading="About Us" />
      <div className="flex lg:flex-row gap-10 lg:gap-0 flex-col mx-3 md:mx-10">
        <div className="flex flex-col lg:w-[50%] justify-center gap-8">
          <h2 className="text-4xl font-bold">
            Why <span className="text-[#F28123]"> Mobile Planet </span>
          </h2>
          <div className="flex flex-col gap-5 md:gap-12  md:mr-10">
            <div className="flex md:items-center gap-4 md:flex-row flex-col">
              <div className="md:w-[50%] flex space-x-5 items-center">
                <div className="icons inline-flex">
                  <FaTruck className="fill-[#F28123] text-3xl" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold">Home Delivery</h2>
                  <p>
                    We are providing you home delivery so you won't have to
                    worry about your things.
                  </p>
                </div>
              </div>
              <div className="md:w-[50%] flex space-x-5 items-center">
                <div className="icons inline-flex">
                  <FaMoneyBillAlt className="fill-[#F28123] text-3xl" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold">Best Price</h2>
                  <p>
                    We are providing you cheaper price and offer you good
                    quality.
                  </p>
                </div>
              </div>
            </div>
            <div className="flex md:items-center gap-4 md:flex-row flex-col">
              <div className="md:w-[50%] flex space-x-5 items-center">
                <div className="icons inline-flex">
                  <BsBriefcaseFill className="fill-[#F28123] text-3xl" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold">Custom Box</h2>
                  <p>You can tell us to customise box as per your need.</p>
                </div>
              </div>
              <div className="md:w-[50%] flex space-x-5 items-center">
                <div className="icons inline-flex">
                  <FaSyncAlt className="fill-[#F28123] text-3xl" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold">Quick Refund</h2>
                  <p>
                    You can get refund as soon as possible our team is always
                    ready to help you.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="lg:w-[50%]">
          <img src={`${window.location.origin}/assets/about.jpg`} alt="about" />
        </div>
      </div>

      <div className="mt-24">
        <div className="w-[80%] sm:w-[70%] md:w-[60%] lg:w-[40%] mx-auto text-center space-y-10">
          <h2 className="text-3xl">
            Our{" "}
            <span className="text-[#F28123] border-b-2  border-[#F28123]">
              Mission
            </span>
          </h2>
          <p>
            At Mobile planet, our mission is to revolutionize the way you
            discover, purchase, and experience mobile devices. We are committed
            to providing a seamless and user-friendly platform that enables you
            to find the perfect mobile device that meets your needs, all while
            delivering exceptional customer service and support.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
