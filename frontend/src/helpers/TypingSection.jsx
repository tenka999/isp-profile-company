import { useTypingOnView } from "./useTypingOnView";

export default function TypingSection() {
  const fullText = `Internet isn't just about speed. It's about reliability.
  With Fiberix, connectivity becomes part of your daily life
  supporting your work, entertainment, and communication,
  while staying aligned with how you live and grow.
  Fiberix. Internet that moves with you.`;

  const { ref, displayText, isVisible, done } = useTypingOnView(fullText, 5);

  return (
    <section ref={ref} className="typing-section">
      <p className="typing-text">
        {fullText.split("").map((char, index) => {
          const isTyped = index < displayText.length;
          const isLastTyped = index === displayText.length - 1;

          return (
            <span key={index} className="char-wrapper">
              <span
                className={`char ${isTyped ? "typed" : "untyped"}`}
                style={isTyped ? { animationDelay: `${index * 0.02}s` } : {}}
              >
                {char}
              </span>
            </span>
          );
        })}
      </p>
    </section>
  );
}
