import { BrowserRouter, Route, Routes } from "react-router-dom";
import TodoListPage from "./pages/TodoListPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TodoListPage />} />
      </Routes>
    </BrowserRouter>
  );
}
