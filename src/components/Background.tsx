import Main from "../assets/images/bg.png";

export default function Background() {
  return (
    <div
        className="fixed top-0 left-0 w-full h-screen bg-cover"
        style={{ backgroundImage: `url(${Main})` }}
      />
  );
}
