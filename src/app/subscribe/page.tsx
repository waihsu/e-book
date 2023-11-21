'use client'
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import React, { useState } from 'react'

const subscribePlans = [
    {
        id: 1,
        name: "Basic",
        price: "5000ks/year"

    },
    {
        id: 2,
        name: "Special",
        price: "10000ks/year"
    }
]

export default function Subscribe() {
    const [plan, setPlan] = useState<string>("Basic")
    
  return (
    <div>
         <Tabs defaultValue="Basic" className=" max-w-md">
  <TabsList className=" flex flex-col h-full">
  {subscribePlans.map(item => (
          <TabsTrigger   className={plan === item.name ? " w-full m-40" : "w-full m-40 bg-transparent border border-dashed"} value={item.name} onClick={() => setPlan(item.name)} key={item.id} >
            <div>
                <p>{item.name}</p>
                <p>{item.price}</p>
            </div>
          </TabsTrigger>
        ))}
    
   
  </TabsList>
  
</Tabs>
       
    </div>
  )
}
