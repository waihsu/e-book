"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React, { useState } from "react";

const subscribePlans = [
  {
    id: 1,
    name: "Basic",
    price: "5000ks/year",
  },
  {
    id: 2,
    name: "Special",
    price: "10000ks/year",
  },
];

export default function Subscribe() {
  const [plan, setPlan] = useState<string>("Basic");

  return (
    <div>
      <Card className="">
        <CardHeader>
          <CardTitle>This Page Is Not Available</CardTitle>
        </CardHeader>
      </Card>
    </div>
  );
}
