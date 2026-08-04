import Header from "@/components/UI/header";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <div>{children}</div>
      <div className="h-[500vh]"></div>
    </>
  );
}
