import { cn } from "@/lib/utils";

const Header = ({ className }: { className?: string }) => {
  return (
    <header className="flex w-full border-b border-white/[0.2]">
      <div
        className={cn(
          className,
          "mx-auto flex h-14 w-full max-w-screen-2xl flex-row items-center justify-center text-xl text-gray-200",
        )}
      >
        <p className="ml-3">AI-ChatBot</p>
        <div className="flex-grow" />
      </div>
    </header>
  );
};
export default Header;
