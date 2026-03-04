const VerticalSectionDisplay = ({title}) => {
  return (
    <div
    className="bg-[#f51919]"
      style={{
        writingMode: "vertical-rl",
        transform: "rotate(180deg)",
        fontFamily: "'Share Tech Mono', monospace",
        fontSize: "0.95rem",
        color: "white",
        letterSpacing: "0.3em",
        userSelect: "none",
        paddingTop: "0.5rem",
      }}
    >
      {title}
    </div>
  );
};

export default VerticalSectionDisplay;
