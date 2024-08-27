export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex items-start justify-center p-4 xs:p-6 md:p-8 lg:p-12 xl:p-[100px]">
      <section className="w-full max-w-md p-4 xs:p-6 bg-white">
        <div className="flex justify-center items-center mb-6 xs:mb-8 sm:mb-10">
          <img
            src="/logo-wide.svg"
            alt="Logo"
            className="w-40 xs:w-48 sm:w-52 md:w-60 lg:w-64 xl:w-[200px]"
          />
        </div>
        {children}
      </section>
    </main>
  );
}
