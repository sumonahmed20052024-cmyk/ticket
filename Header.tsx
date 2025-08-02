import Link from 'next/link';
import { Ticket, LayoutDashboard, QrCode, MoreVertical } from 'lucide-react';
import { Button } from './ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';

export function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <Ticket className="h-7 w-7 text-primary" />
          <span className="font-headline text-xl font-bold">EventPass BD</span>
        </Link>
        <nav className="hidden md:flex items-center gap-2">
          <Button variant="ghost" asChild>
            <Link href="/admin/login">
              <LayoutDashboard className="mr-2 h-4 w-4" />
              Admin
            </Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/scan">
              <QrCode className="mr-2 h-4 w-4" />
              Scan Ticket
            </Link>
          </Button>
        </nav>
        <div className="md:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link href="/admin/login">
                  <LayoutDashboard className="mr-2 h-4 w-4" />
                  Admin
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/scan">
                  <QrCode className="mr-2 h-4 w-4" />
                  Scan Ticket
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
         <Button className="hidden md:flex bg-primary hover:bg-primary/90" asChild>
          <Link href="/">Browse Events</Link>
        </Button>
      </div>
    </header>
  );
}
