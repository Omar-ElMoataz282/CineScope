import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <main className="min-h-148 flex items-center justify-center bg-background">
      <Helmet>
        <title>Page Not Found — CineScope</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <section className="text-center">
        <h1 className="font-display text-5xl font-bold mb-3">404</h1>
        <p className="text-lg text-gray-500 mb-5">Oops! Page not found</p>
        <Link to="/" className="text-sm hover:underline underline-offset-6">
          Return to Home
        </Link>
      </section>
    </main>
  );
};

export default NotFound;
