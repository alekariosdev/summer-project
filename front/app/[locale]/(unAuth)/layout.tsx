export default function UnAuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-dvh bg-[#0A2240]">
      {children}
    </div>
  );
}
