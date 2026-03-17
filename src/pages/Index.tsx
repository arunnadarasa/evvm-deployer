import { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const inkCurve = [0.2, 0, 0, 1] as const;

const Index = () => {
  const [lines, setLines] = useState<string[]>([""]);
  const [activeLine, setActiveLine] = useState(0);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const wordCount = lines.join(" ").split(/\s+/).filter(Boolean).length;

  useEffect(() => {
    textareaRef.current?.focus();
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        setLines((prev) => {
          const next = [...prev, ""];
          setActiveLine(next.length - 1);
          return next;
        });
      }
    },
    []
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const value = e.target.value;
      setLines((prev) => {
        const next = [...prev];
        next[activeLine] = value;
        return next;
      });
    },
    [activeLine]
  );

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
      textareaRef.current.focus();
    }
  }, [activeLine, lines]);

  const handleLineClick = (index: number) => {
    setActiveLine(index);
  };

  return (
    <div
      ref={containerRef}
      className="paper-grain scrollbar-none min-h-svh overflow-y-auto"
      style={{
        display: "grid",
        gridTemplateColumns: "1fr min(65ch, calc(100% - 3rem)) 1fr",
      }}
    >
      <div
        className="col-start-2"
        style={{
          paddingTop: "15vh",
          paddingBottom: "25vh",
          fontFamily: "'Newsreader', serif",
          fontSize: "clamp(1.125rem, 1vw + 1rem, 1.375rem)",
          lineHeight: 1.7,
          letterSpacing: "-0.01em",
        }}
      >
        <AnimatePresence mode="sync">
          {lines.map((line, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0.6 }}
              animate={{
                opacity: i === activeLine ? 1 : 0.6,
              }}
              transition={{ duration: 0.4, ease: inkCurve as any }}
              className="relative cursor-text"
              onClick={() => handleLineClick(i)}
              style={{ textWrap: "pretty" as any }}
            >
              {i === activeLine ? (
                <textarea
                  ref={textareaRef}
                  value={line}
                  onChange={handleChange}
                  onKeyDown={handleKeyDown}
                  className="w-full bg-transparent resize-none outline-none text-foreground scrollbar-none"
                  style={{
                    fontFamily: "inherit",
                    fontSize: "inherit",
                    lineHeight: "inherit",
                    letterSpacing: "inherit",
                    caretColor: "hsl(220 15% 12%)",
                    minHeight: "1.7em",
                    overflow: "hidden",
                  }}
                  rows={1}
                  placeholder={i === 0 && lines.length === 1 ? "Begin." : undefined}
                  spellCheck={false}
                  autoComplete="off"
                />
              ) : (
                <p className="min-h-[1.7em] whitespace-pre-wrap break-words py-0">
                  {line || "\u00A0"}
                </p>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Word count */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.2 }}
        className="fixed bottom-6 right-6 text-foreground"
        style={{
          fontSize: "10px",
          textTransform: "uppercase",
          letterSpacing: "0.1em",
          fontVariantNumeric: "tabular-nums",
          fontFamily: "'Newsreader', serif",
        }}
      >
        {wordCount} {wordCount === 1 ? "word" : "words"}
      </motion.div>
    </div>
  );
};

export default Index;
