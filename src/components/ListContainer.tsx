import { ReactNode } from "react";

interface ListContainerProps {
  children: ReactNode;
}
export default function ListContainer({ children }: ListContainerProps) {
  return (
    <div className="flex w-[41.125rem] h-[44rem] backdrop-blut-sm bg-white/30 rounded-[1.875rem] ">{children}</div>
  );
}
