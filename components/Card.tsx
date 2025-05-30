export default function Card({
  children,
  className = ""
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`
        p-6 
        bg-gray-900 bg-opacity-50 backdrop-blur-sm 
        border border-gray-700 rounded-lg 
        transition hover:border-cyvexPurple hover:shadow-[0_0_20px_rgba(168,85,247,0.5)]
        mb-8
        ${className}       /* <-- now we merge in any extra classes */
      `}
    >
      {children}
    </div>
  );
}