import Background from "../components/Background";
import ListContainer from "../components/ListContainer";
import Wrapper from "../components/Wrapper";
import TodoInput from "../components/TodoInput";

export default function TodoListPage() {
  return (
    <div>
      <Background />
      <div className="relative flex w-screen h-screen justify-center items-center ">
        <ListContainer>
          <Wrapper>
            <title className="flex justify-center font-bold text-4xl pt-[3.5rem] pb-[2rem]">
              TOdo List
            </title>
            <TodoInput />
          </Wrapper>
        </ListContainer>
      </div>
    </div>
  );
}
