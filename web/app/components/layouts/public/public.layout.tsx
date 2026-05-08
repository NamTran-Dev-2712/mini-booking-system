import PublicHeader from "./public.header";
import PublicFooter from "./public.footer";

interface PublicLayoutShellProps {
  children: React.ReactNode;
}

const PublicLayoutComponent = ({ children }: PublicLayoutShellProps) => {
  return (
    <div className="flex flex-col min-h-screen">
      <PublicHeader />
      <main className="flex-1">{children}</main>
      <PublicFooter />
    </div>
  );
};

export default PublicLayoutComponent;
