import Link from 'next/link';
import Image from 'next/image';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, MapPin, Tag } from 'lucide-react';
import type { Event } from '@/lib/types';

interface EventCardProps {
  event: Event;
}

export function EventCard({ event }: EventCardProps) {
  const { id, name, date, location, image, category, price } = event;
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <Card className="flex flex-col overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="p-0 relative">
        <Link href={`/events/${id}`} aria-label={`View details for ${name}`}>
          <Image
            src={image}
            alt={`Promotional image for ${name}`}
            width={600}
            height={400}
            className="w-full h-48 object-cover"
            data-ai-hint="event concert"
          />
        </Link>
      </CardHeader>
      <CardContent className="flex-grow p-6">
        <CardTitle className="font-headline text-2xl mb-2">
          <Link href={`/events/${id}`} className="hover:text-primary transition-colors">
            {name}
          </Link>
        </CardTitle>
        <div className="flex flex-col gap-2 text-muted-foreground text-sm">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>{formattedDate}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            <span>{location}</span>
          </div>
           <div className="flex items-center gap-2">
            <Tag className="h-4 w-4" />
            <span>{category}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-6 pt-0 flex justify-between items-center">
        <p className="font-headline text-xl font-bold text-primary">৳{price}</p>
        <Button asChild className="bg-accent-gradient text-white hover:opacity-90 transition-opacity">
          <Link href={`/checkout/${id}`}>Buy Ticket</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
