"use client";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

export function Sidebar() {
  return (
    <div className="w-64 bg-gray-800 text-white p-4">
      <h2 className="text-xl font-bold mb-4">Video Streams</h2>
      <Card className="mb-4 bg-gray-700">
        <CardContent className="p-2">
          <h3 className="text-sm font-semibold mb-2 text-white">User Stream</h3>
          <div className="relative w-full h-40">
            <Image
              src="/vercel.svg"
              alt="User video stream"
              layout="fill"
              objectFit="cover"
              className="rounded"
            />
          </div>
        </CardContent>
      </Card>
      <Card className="bg-gray-700">
        <CardContent className="p-2">
          <h3 className="text-sm font-semibold mb-2 text-white">
            Agent Stream
          </h3>
          <div className="relative w-full h-40">
            <Image
              src="/vercel.svg"
              alt="Agent video stream"
              layout="fill"
              objectFit="cover"
              className="rounded"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
