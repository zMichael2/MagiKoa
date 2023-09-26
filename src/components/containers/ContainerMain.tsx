import { IContainerMainProps } from "../../interfaces";

export const ContainerMain: React.FC<IContainerMainProps> = ({
  children,
  isPadding = false,
}) => {
  return (
    <div className="bg-primary w-full h-screen">
      <div className="flex justify-center items-center w-auto md:w-full h-full p-4">
        <div
          className={`${
            isPadding ? "p-8" : ""
          } w-auto h-[600px] md:w-3/4  lg:w-[1199px] 2xl:h-[865px] overflow-y-auto bg-white rounded-md`}
        >
          {children}
        </div>
      </div>
    </div>
  );
};
