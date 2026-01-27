import { Leaf } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <div className="mr-4 flex items-center">
          <Leaf className="mr-2 h-6 w-6 text-primary" />
          <span className="font-bold">Spark Mentorship</span>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-2">
          <nav className="flex items-center">
            <Button asChild variant="ghost">
              <a href="#booking">Book Appointment</a>
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
}
