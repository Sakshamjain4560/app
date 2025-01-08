import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

export function PanCardVerification() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">PAN Card Verification</h2>
      <div className="flex space-x-4">
        <Card className="flex-1">
          <CardContent className="p-4">
            <h3 className="text-lg font-semibold mb-2">
              Live PAN Card Snapshot
            </h3>
            <div className="relative w-full h-64">
              <Image
                src="/vercel.svg"
                alt="Live PAN card snapshot"
                layout="fill"
                objectFit="cover"
                className="rounded"
              />
            </div>
          </CardContent>
        </Card>
        <Card className="flex-1">
          <CardContent className="p-4">
            <h3 className="text-lg font-semibold mb-2">PAN Card Details</h3>
            <div className="space-y-2">
              <p>
                <strong>Name:</strong> John Doe
              </p>
              <p>
                <strong>Father&apos;s Name:</strong> Richard Doe
              </p>
              <p>
                <strong>Date of Birth:</strong> 01/01/1990
              </p>
              <p>
                <strong>PAN Number:</strong> ABCDE1234F
              </p>
              <p>
                <strong>Issue Date:</strong> 01/01/2020
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
