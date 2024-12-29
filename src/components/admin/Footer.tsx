const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="z-40 flex w-screen flex-col items-center gap-4 bg-[#F7F3ED] pb-6 pt-3">
      <hr className="w-[98%] border-basicGray" />
      <h1>@ KonJeng Create {currentYear}</h1>
    </div>
  );
};

export default Footer;
