import heroSectionImage from "../assets/hero-section.webp";
const Hero = () => {
  return (
    <>
      <div className="flex gap-10 flex-wrap justify-center items-center xl:justify-around lg:p-28 p-10 bg-blue-950 text-white">
        <div className="text-center xl:text-left xl:max-w-[65%]">
          <h1 className="text-4xl font-bold mb-4 text-balance">
            Introducing DriveMate
          </h1>
          <p className="text-xl text-left">
            your go-to destination for peer-to-peer car rentals! As the premier
            platform for shared vehicle experiences, we offer an extensive range
            of cars tailored to suit every adventure, whether It&apos;s
            off-roading or navigating city streets. Discover the ideal car for
            your next journey with DriveMate&apos;s diverse selection!
          </p>
        </div>
        <figure>
          <img
            className="h-[280px] w-[280px] flex-grow-0 flex-shrink-0 rounded-[30%70%70%30%/30%44%56%70%]"
            src={heroSectionImage}
          />
        </figure>
      </div>
    </>
  );
};

export default Hero;
