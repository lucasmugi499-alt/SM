export function Footer() {
  return (
    <footer className="border-t">
      <div className="container py-6">
        <p className="text-center text-sm text-foreground/60">
          &copy; {new Date().getFullYear()} Spark Mentorship. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
