import Photo from './Photo';

const CoverPhoto = () => {
  return (
    <div className="flex w-[90%] flex-col gap-4 rounded-2xl border border-[#888888] p-6 px-8 py-4">
      <h1>Cover Photo</h1>
      <Photo />
      <div className="text-xs text-basicGray">
        <h1>
          The aspect ratio of 1:2 means the width is twice the height. For
          example, an image with dimensions of 400px by 200px follows this
          ratio.
        </h1>
        <h1> Supported file formats include .jpg and .png.</h1>
      </div>
    </div>
  );
};

export default CoverPhoto;
