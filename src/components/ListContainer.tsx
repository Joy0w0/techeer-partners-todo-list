import { ReactNode } from "react";

interface ListContainerProps {
  children: ReactNode;
}
export default function ListContainer({ children }: ListContainerProps) {
  return (
    <div className="flex w-[41.125rem] h-[44rem] bg-white rounded-[1.875rem] ">{children}</div>
  );
}
