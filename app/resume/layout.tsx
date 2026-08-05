// Standalone layout for /resume — no Navbar or Footer inherited here
// because this route is outside the (main) route group.
export default function ResumeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
