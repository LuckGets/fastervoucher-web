const LoginGoogle = () => {
  return (
    <div className="m-auto mt-2 flex w-full justify-center rounded-lg p-4">
      <button className="flex w-72 justify-center gap-5 rounded-full border border-white px-6 py-2 text-lg transition-colors hover:bg-[rgba(197,197,197,0.66)]">
        <img
          src="https://www.svgrepo.com/show/303108/google-icon-logo.svg"
          alt="Google icon"
          className="h-6 w-6"
        />
        <span>Login with Google</span>
      </button>
    </div>
  );
};

export default LoginGoogle;
