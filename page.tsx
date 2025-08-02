"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

export default function AdminLoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    // If user is already logged in, redirect to admin panel
    if (sessionStorage.getItem('isAdmin') === 'true') {
      router.push('/admin');
    }
  }, [router]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, use a proper authentication service.
    if (password === 'admin123') {
      sessionStorage.setItem('isAdmin', 'true');
      toast({
        title: 'Login Successful',
        description: 'Redirecting to admin panel...',
      });
      router.push('/admin');
    } else {
      setError('Incorrect password. Please try again.');
      toast({
        variant: 'destructive',
        title: 'Login Failed',
        description: 'Incorrect password. Please try again.',
      });
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-12 flex items-center justify-center">
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle className="font-headline text-2xl">Admin Login</CardTitle>
            <CardDescription>Enter the password to access the admin panel.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError('');
                  }}
                  required
                />
              </div>
              {error && <p className="text-sm text-destructive">{error}</p>}
              <Button type="submit" className="w-full">
                Login
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}
