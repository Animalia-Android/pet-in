export default function BackgroundPattern({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-[#2C9676] h-[300px] w-full absolute top=0 -z-10">
      {children}
    </div>
  );
}
