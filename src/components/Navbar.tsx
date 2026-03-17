import { useState } from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Hexagon, Rocket, PenTool, LayoutDashboard, Menu, X } from 'lucide-react';

const navItems = [
  { to: '/', label: 'Home', icon: Hexagon },
  { to: '/deploy', label: 'Deploy', icon: Rocket },
  { to: '/signatures', label: 'Signatures', icon: PenTool },
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
];

export function Navbar() {
  const location = useLocation();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="container flex h-14 max-w-screen-xl items-center justify-between px-4">
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center gap-2 font-semibold tracking-tight">
            <Hexagon className="h-5 w-5 text-primary" />
            <span className="text-sm">EVVM <span className="text-muted-foreground font-normal">ichiban</span></span>
          </Link>
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  'flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-colors',
                  location.pathname === item.to
                    ? 'bg-accent text-accent-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                )}
              >
                <item.icon className="h-3.5 w-3.5" />
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <ConnectButton
            chainStatus="icon"
            accountStatus="address"
            showBalance={false}
          />
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <nav className="md:hidden border-t border-border bg-background/95 backdrop-blur-xl px-4 py-2 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setOpen(false)}
              className={cn(
                'flex items-center gap-2 rounded-md px-3 py-2.5 text-sm font-medium transition-colors',
                location.pathname === item.to
                  ? 'bg-accent text-accent-foreground'
                  : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
