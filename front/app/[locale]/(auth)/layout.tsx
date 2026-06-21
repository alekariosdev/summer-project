export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="mx-auto h-full w-full max-w-[1440px]">{children}</div>
  );
}
