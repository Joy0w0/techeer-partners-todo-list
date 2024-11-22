import { ReactNode } from "react";

interface WrapperProps {
  children: ReactNode;
}

export default function Wrapper({ children }: WrapperProps) {
  return (
    <div className="flex flex-col items-center justify-start w-[100%] h-full pt-[2.5rem] max-w-[34rem] m-[auto] ">
      {children}
    </div>
  );
}
