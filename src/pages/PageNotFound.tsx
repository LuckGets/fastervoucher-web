import { useNavigate } from 'react-router-dom';

const PageNotFound = () => {
  const navigate = useNavigate();

  const hdlOnClick = () => {
    navigate('/');
  };

  return (
    <div>
      <section className="">
        <div className="mx-auto flex max-w-screen-xl flex-col items-center text-[#22A094]">
          <div className="m-5 flex flex-col text-center">
            <div>
              <img
                className="w-[39rem]"
                src="https://i.imgur.com/9lN31En.png"
              />
            </div>
            <div className="my-auto flex flex-col items-center">
              <p className="mb-4 text-3xl font-bold tracking-tight text-[#DB5252] md:text-4xl">
                Something&apos;s missing.
              </p>
              <p className="mb-4 text-end text-lg text-gray-500">
                Sorry, we can&apos;t find that page.
                <br /> You&apos;ll find lots to explore on the home page.{' '}
              </p>
              <button
                onClick={hdlOnClick}
                className="w-[50%] rounded-md bg-[#22A094] p-2 text-[#F3F7EC]"
              >
                Back to home page
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PageNotFound;
