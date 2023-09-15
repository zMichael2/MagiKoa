import { IContainerMainProps } from "../../interfaces";

export const ContainerMain: React.FC<IContainerMainProps> = ({ children }) => {
  return (
    <div className="bg-primary w-full h-screen">
      <div className="flex justify-center items-center w-full h-full">
        <div className="w-[1199px] h-[865px] bg-white rounded-md">
          {children}
        </div>
      </div>
    </div>
  );
};
