import Link from "next/link";

export default function About() {
  return (
    <div className="bg-[#0d1421] w-screen min-h-screen flex flex-col justify-center items-center text-white py-10">
      <p className="px-4 text-center max-w-[605px]">
        The idea for this project came from wanting to build a website with a
        graph in React and Next.js. Furthermore, I had recently read a book on
        finance, and with this, I got the idea to build a compound interest
        calculator with a nice looking graph. Other compound interest
        calculators on the internet are pretty dull and I wanted to create one
        with better design and attractive transitions. For this, I used a
        charting library called Recharts and a motion library called Framer
        Motion, both built for React. The website&apos;s design, created by
        myself using Tailwind CSS, is fully responsive and carefully thought out
        because I like to create websites that look good. A lot of thought and
        effort went into designing the form for the calculator, including
        features such as input validation, disabled fields, and text selection
        to enable quick changes to inputs. I have also considered the
        user&apos;s perspective, assuming they may be unfamiliar with these
        concepts, and addressed this by providing clear explanations in the text
        and tried making an intuitive UI design. I also wanted to include some
        playfulness in the project, so I included a quote from Einstein on the
        website which slides in on hover (larger screens) and on click (smaller
        screens). Some say it takes three attempts to build something well, and
        this is the first time I really followed this philosophy for coding, and
        I am pleased with the result (
        <Link href="/v1" className="text-blue-500 hover:underline">
          first version
        </Link>
        ). I also found it fun to study the formula for compound interest, now a
        few years after I completed university where I studied a lot of math.
        Lastly, as the project progressed, though it wasn&apos;t my initial
        idea, I wanted the website to motivate people to start saving more, and
        hopefully leveraging the power of compound interest.
      </p>
      <p className="text-center px-6 mt-4">
        Made by Philip Andersson, with passion for tech and finance.
      </p>
      <p className="text-center px-6 mt-1 italic">
        September 29, 2024. Stockholm, Sweden.
      </p>
      <Link
        href={"https://github.com/CSCphilip/compoundvision"}
        className="mt-5"
      >
        <img
          src="/github-mark-white.png"
          className="size-10 hover:opacity-80 hover:rotate-12 transition-all duration-500"
          alt="GitHub logo"
        />
      </Link>
      <Link className="mt-8 size-10" href="/">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="fill-white hover:fill-gray-400"
        >
          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            <path
              d="M9.66088 8.53078C9.95402 8.23813 9.95442 7.76326 9.66178 7.47012C9.36913 7.17698 8.89426 7.17658 8.60112 7.46922L9.66088 8.53078ZM4.47012 11.5932C4.17698 11.8859 4.17658 12.3607 4.46922 12.6539C4.76187 12.947 5.23674 12.9474 5.52988 12.6548L4.47012 11.5932ZM5.51318 11.5771C5.21111 11.2936 4.73648 11.3088 4.45306 11.6108C4.16964 11.9129 4.18475 12.3875 4.48682 12.6709L5.51318 11.5771ZM8.61782 16.5469C8.91989 16.8304 9.39452 16.8152 9.67794 16.5132C9.96136 16.2111 9.94625 15.7365 9.64418 15.4531L8.61782 16.5469ZM5 11.374C4.58579 11.374 4.25 11.7098 4.25 12.124C4.25 12.5382 4.58579 12.874 5 12.874V11.374ZM15.37 12.124V12.874L15.3723 12.874L15.37 12.124ZM17.9326 13.1766L18.4614 12.6447V12.6447L17.9326 13.1766ZM18.25 15.7351C18.2511 16.1493 18.5879 16.4841 19.0021 16.483C19.4163 16.4819 19.7511 16.1451 19.75 15.7309L18.25 15.7351ZM8.60112 7.46922L4.47012 11.5932L5.52988 12.6548L9.66088 8.53078L8.60112 7.46922ZM4.48682 12.6709L8.61782 16.5469L9.64418 15.4531L5.51318 11.5771L4.48682 12.6709ZM5 12.874H15.37V11.374H5V12.874ZM15.3723 12.874C16.1333 12.8717 16.8641 13.1718 17.4038 13.7084L18.4614 12.6447C17.6395 11.8276 16.5267 11.3705 15.3677 11.374L15.3723 12.874ZM17.4038 13.7084C17.9435 14.245 18.2479 14.974 18.25 15.7351L19.75 15.7309C19.7468 14.572 19.2833 13.4618 18.4614 12.6447L17.4038 13.7084Z"
              // fill="#ffffff"
            ></path>
          </g>
        </svg>
      </Link>
    </div>
  );
}
