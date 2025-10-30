export default function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 right-0 w-full bg-green-800 text-white shadow-md p-4 z-10">
      <div className="max-w-7xl mx-auto text-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} My Expense App. All rights reserved.
        </p>

      </div>
    </footer>
  );
}
