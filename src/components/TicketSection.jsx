const TicketSection = ({ data, onReset }) => {
  const { fullName, email, github, avatar } = data;
  const avatarURL = URL.createObjectURL(avatar);

  return (
    <div className="ticket-content relative z-10 text-center text-white space-y-8 py-8">
      {/* Confirmation Heading */}
      <h2 className="heading-01 text-2xl font-bold">
        Congrats, <span className="highlight text-[--orange-500]">{fullName}</span>! Your ticket is ready.
      </h2>

      {/* Email Notification Message */}
      <p className="paragraph-01 text-[--neutral-500] px-6">
        We've emailed your ticket to <span className="highlight text-[--orange-500]">{email}</span> and will send updates in the run-up to the event.
      </p>

      {/* Ticket Display Card */}
      <div className="ticket relative w-full h-[260px] max-w-full bg-[url('/assets/images/pattern-ticket.svg')] bg-no-repeat bg-center bg-contain rounded-[1.5rem] px-6 py-5 flex flex-col justify-evenly items-start gap-4 text-left">
        {/* Ticket Header: Logo and Event Date */}
        <div className="ticket-header">
          <img
            src="/assets/images/logo-full.svg"
            alt="Coding Conf Logo"
            className="conf-logo w-50 md:w-48 mt-1"
          />
          <p className="event-details text-[--neutral-300] text-sm font-light mt-1 ml-11">
            Jan 31, 2025 / Austin, TX
          </p>
        </div>

        {/* Ticket Details: Avatar, Name, GitHub */}
        <div className="ticket-details flex items-center gap-4 mt-2">
          <div className="avatar-container w-12 h-12 overflow-hidden rounded-md border border-white/20">
            <img src={avatarURL} alt="User Avatar" className="w-full h-full object-cover" />
          </div>

          <div className="user-info">
            <p className="font-bold text-white text-base sm:text-lg">{fullName}</p>
            <div className="gh-icon-username-container flex items-center gap-2 mt-1 text-[--neutral-300] text-base font-medium">
              <img src="/assets/images/icon-github.svg" alt="GitHub Icon" className="w-4 h-4" />
              <p>{github}</p>
            </div>
          </div>
        </div>

        {/* Stylized Ticket ID (rotated) */}
        <p className="ticket-id absolute right-1 top-1/2 -translate-y-1/2 rotate-90 origin-center text-[--neutral-500] text-lg font-semibold opacity-80">
          #01609
        </p>
      </div>

      {/* Reset Button */}
      <button className="btn-primary" onClick={onReset}>
        Create Another Ticket
      </button>
    </div>
  );
};

export default TicketSection;
