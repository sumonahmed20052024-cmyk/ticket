import { Event } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./ui/card";
import Image from "next/image";
import { Calendar, MapPin, User, Hash, Phone } from "lucide-react";

interface TicketProps {
  event: Event;
  userName: string;
  userEmail: string;
  phoneNumber: string;
  serialNumber: string;
}

export function Ticket({ event, userName, userEmail, phoneNumber, serialNumber }: TicketProps) {
    const formattedDate = new Date(event.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(serialNumber)}`;

    return (
        <Card className="max-w-md mx-auto bg-card shadow-2xl overflow-hidden w-[400px]">
            <CardHeader className="bg-primary text-primary-foreground p-6">
                <CardTitle className="font-headline text-2xl">{event.name}</CardTitle>
                <CardDescription className="text-primary-foreground/80">ADMIT ONE</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
                <div className="grid grid-cols-3">
                    <div className="col-span-2 p-6">
                        <div className="space-y-3 text-sm">
                            <div className="flex items-center gap-2">
                                <User className="h-4 w-4 text-muted-foreground" />
                                <div>
                                    <p className="text-muted-foreground text-xs">ISSUED TO</p>
                                    <p className="font-bold">{userName}</p>
                                    <p className="text-xs">{userEmail}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <Phone className="h-4 w-4 text-muted-foreground" />
                                <div>
                                    <p className="text-muted-foreground text-xs">PHONE</p>
                                    <p className="font-bold">{phoneNumber}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <Calendar className="h-4 w-4 text-muted-foreground" />
                                <div>
                                    <p className="text-muted-foreground text-xs">DATE</p>
                                    <p className="font-bold">{formattedDate}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <MapPin className="h-4 w-4 text-muted-foreground" />
                                <div>
                                    <p className="text-muted-foreground text-xs">LOCATION</p>
                                    <p className="font-bold">{event.location}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 pt-1">
                                <Hash className="h-4 w-4 text-muted-foreground" />
                                <div>
                                    <p className="text-muted-foreground text-xs">SERIAL NUMBER</p>
                                    <p className="font-mono font-bold text-base text-primary">{serialNumber}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-1 border-l-2 border-dashed flex flex-col items-center justify-center p-4 bg-muted/20 relative">
                         <div className="absolute w-6 h-6 bg-background rounded-full -left-3 top-1/3"></div>
                         <div className="absolute w-6 h-6 bg-background rounded-full -left-3 bottom-1/3"></div>
                        <div className="bg-white p-2 rounded-md shadow-md">
                            <Image src={qrCodeUrl} width={120} height={120} alt="QR Code" data-ai-hint="QR code"/>
                        </div>
                        <p className="text-xs text-muted-foreground mt-3 text-center">Scan at entry</p>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
