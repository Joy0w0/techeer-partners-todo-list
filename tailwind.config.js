export default {
  //index.html을 포함한 src경로 내부에 자바스크립트,
  //타입스크립트, jsx를 리턴하는 파일들을 모두 작성 해줍니다.

  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#2bca43",
        },
      },
    },
  },
  plugins: [],
};
