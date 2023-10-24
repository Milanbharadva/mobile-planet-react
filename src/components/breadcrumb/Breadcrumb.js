const Breadcrumb = (props) => {
  return (
    <div className="mb-10">
      <div className="flex h-[350px]  bg-[#07212e] bg-opacity-80 flex-col gap-6 items-center justify-center">
        <p className="text-lg tracking-[7px] text-[#F28123]">
          {props.paragraph.toUpperCase()}
        </p>
        <h1 className="text-5xl text-white">{props.heading}</h1>
      </div>
    </div>
  );
};

export default Breadcrumb;
