import Link from 'next/link';
import Image from 'next/image';


const Error404 = () => {
    return (


<div className="flex flex-col items-center justify-center min-h-screen px-4 text-center">

<h1 className="text-3xl sm:text-4xl font-bold text-accent my-10">Oops! Nothing Found.</h1>
  <p className="my-2 text-custom-yellow font-bold text-2xl sm:text-3xl md:text-5xl lg:text-7xl">
  It looks like this page is talking a rest day.
          </p>
  <Link href="/" className="bg-accent py-3 px-3 text-white font-bold rounded-lg mt-5">
    Go Back To Home
  </Link>

  <div className="flex flex-col lg:flex-row justify-center items-center lg:px-24 lg:py-5 md:py-20 md:px-44 px-4 py-24 gap-16 md:gap-28">
    <div className="w-full xl:w-1/2 relative pb-12 lg:pb-0 xl:pt-24">
      <div className="relative">
        <div className="absolute">
        </div>
        <div>
          <Image src="https://i.ibb.co/CbHJM6j/Screenshot-2024-06-29-085216.png" alt="Error 404" width={600} height={500} className="w-full h-auto" />
        </div>
      </div>
    </div>
    <div className="w-full max-w-[500px] mx-auto">
      <Image src="https://i.ibb.co/ck1SGFJ/Group.png" alt="Illustration" width={500} height={500} className="w-full h-auto" />
    </div>
  </div>
</div>

    );
};

export default Error404;