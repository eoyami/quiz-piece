import Image from "next/image";
import QuizPieceLogo from "../../public/assets/quizpiece_logo.png";
export default function Home() {
  return (
    <main className="relative flex justify-center">
      <div className="absolute h-screen flex flex-col z-10 w-screen">
        <section id="flex" className="bg-gray-950 p-2">
          <nav className="flex justify-end gap-6">
            <div className="hover:bg-white p-2 hover:text-black">
              Faça login
            </div>
            <div className="hover:bg-white p-2 hover:text-black">
              Registre-se
            </div>
          </nav>
        </section>
        <div className="flex flex-col justify-center h-dvh">
          <div className="flex justify-center">
            <Image src={QuizPieceLogo} alt="Logo Quiz Piece"></Image>
          </div>
          <div className="flex justify-center">
            <p>Faça uma conta para começar a jogar!</p>
          </div>
        </div>
      </div>
      <video
        width={1920}
        height={1080}
        muted
        autoPlay
        className="absolute h-screen w-screen object-cover blur-sm z-0"
      >
        <source src="/assets/backgroundvideo.mp4" />
      </video>
    </main>
  );
}
