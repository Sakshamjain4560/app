import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

export function PhotoVerification() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Photo Verification</h2>
      <div className="flex space-x-4">
        <Card className="flex-1">
          <CardContent className="p-4">
            <h3 className="text-lg font-semibold mb-2">Uploaded Photo</h3>
            <div className="relative w-full h-64">
              <Image
                src="/vercel.svg"
                alt="Uploaded user photo"
                layout="fill"
                objectFit="cover"
                className="rounded"
              />
            </div>
          </CardContent>
        </Card>
        <Card className="flex-1">
          <CardContent className="p-4">
            <h3 className="text-lg font-semibold mb-2">Live Camera Feed</h3>
            <div className="relative w-full h-64">
              <Image
                src="/vercel.svg"
                alt="Live camera feed"
                layout="fill"
                objectFit="cover"
                className="rounded"
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
