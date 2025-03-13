import Image from "next/image";
import QuizPieceLogo from "../../public/assets/quizpiece_logo.png";
export default function Home() {
  return (
    <div className="relative flex h-dvh w-screen overflow-hidden">
      <div className="flex flex-col justify-center items-center h-screen w-full z-10">
        <div className="">
          <Image src={QuizPieceLogo} alt="Logo Quiz Piece"></Image>
        </div>
        <div className="flex">
          <p>Faça uma conta para começar a jogar!</p>
        </div>
      </div>
      <video
        width={1920}
        height={1080}
        muted
        autoPlay
        className="absolute min-h-screen min-w-screen z-0 object-cover"
      >
        <source src="/assets/backgroundvideo.mp4" />
      </video>
    </div>
  );
}
