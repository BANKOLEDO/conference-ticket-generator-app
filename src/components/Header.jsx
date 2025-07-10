const Header = ({ hasTicket }) => {
  return (
    <header className="relative w-full flex flex-col items-center">
      {/* Circle Pattern */}
      <img
        src="/assets/images/pattern-circle.svg"
        alt="pattern-circle"
        className="absolute top-[-1rem] left-0 w-20"
      />

      {/* Squiggly Top Pattern */}
      <img
        src="/assets/images/pattern-squiggly-line-top.svg"
        alt="pattern-s-top"
        className="absolute top-0 right-0 w-24 md:w-48 lg:w-96 z-2"
      />

      {/* Decorative Lines */}
      <div className="absolute top-0 right-0 left-0 overflow-hidden h-[500px] pointer-events-none">
  <img
    src="/assets/images/pattern-lines.svg"
    alt="pattern-lines"
    className="w-full h-full object-cover"
  />
</div>


      {/* Logo and Conditional Text */}
      <div className="relative flex flex-col items-center pt-4">
        <img
          src="/assets/images/logo-full.svg"
          alt="Coding Conf Logo"
          className="py-4 w-48"
        />

        {/* Only visible on form screen */}
        {!hasTicket && (
          <div className="w-96 text-center">
            <h2 className="text-[--neutral-0] text-2xl font-bold px-4">
              Your Journey to Coding Conf 2025 Starts Here!
            </h2>
            <p className="text-[--neutral-500] text-base p-4 px-6">
              Secure your spot at next year's biggest coding conference.
            </p>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
