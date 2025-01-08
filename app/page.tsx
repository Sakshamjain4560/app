"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { PanCardVerification } from "@/components/PanCardVerification";
import { PhotoVerification } from "@/components/PhotoVerification";
import { StepIndicator } from "@/components/StepIndicator";
import { Sidebar } from "@/components/Sidebar";

const steps = [
  { id: 1, title: "Photo Verification" },
  { id: 2, title: "PAN Card Verification" },
  { id: 3, title: "Address Proof" },
  { id: 4, title: "Final Review" },
];

export default function KYCVerificationPage() {
  const [currentStep, setCurrentStep] = useState(1);

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 p-6 overflow-auto">
        <Card className="w-full">
          <CardContent className="p-6">
            <StepIndicator
              steps={steps}
              currentStep={currentStep}
              onStepChange={setCurrentStep}
            />
            <div className="mt-6">
              {currentStep === 1 && <PhotoVerification />}
              {currentStep === 2 && <PanCardVerification />}
              {currentStep === 3 && (
                <div>Address Proof Verification (To be implemented)</div>
              )}
              {currentStep === 4 && <div>Final Review (To be implemented)</div>}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
