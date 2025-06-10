export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-content">
        <h1 className="footer-title">WE WANT WASTE</h1>
        <p className="text-lg font-medium">
          Skip Hire <span className="font-semibold">With A Difference.</span>
        </p>
        <hr className="my-4 border-white/20" />
        <p className="copyright">
          &copy; {year} We want waste. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
