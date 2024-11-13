import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
});
// 플러그인에 tailwindcss()을 내용을 추가해줍니다
