import React from "react";

const Logo = ({ size = "md", className = "" }) => {
  const sizes = {
    sm: { dot: "w-3 h-3", text: "text-lg" },
    md: { dot: "w-4 h-4", text: "text-2xl" },
    lg: { dot: "w-5 h-5", text: "text-3xl" },
  };
  const s = sizes[size] || sizes.md;

  return (
    <div className={`flex items-center w-fit gap-3 ${className}`} aria-label="PhinTrackr logo">
      {/* orange dot */}
      <span
        className={`${s.dot} rounded-full bg-orange-500 inline-block shrink-0`}
        aria-hidden="true"
      />
      {/* text logo */}
      <span
        className={`${s.text} font-semibold text-appPurple) tracking-tight`}
      >
        PhinTrackr
      </span>
    </div>
  );
};

export default Logo;
