"use client";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine, TooltipProps } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/card";
import { cholesterolData } from "../data/cholesterolData";

const hdlData = cholesterolData.HDL;
const minHDL = 20;  // Force Y-axis minimum to be 20
const maxHDL = 100; // Force Y-axis maximum to be 100

// Generate evenly spaced Y-axis labels (every 10 units)
const yTicks = Array.from({ length: (maxHDL - minHDL) / 10 + 1 }, (_, i) => minHDL + i * 10);

// Custom Tooltip to show "Month: Value"
const CustomTooltip: React.FC<TooltipProps<number, string>> = ({ active, payload }) => {
    if (active && payload && payload.length) {
        return (
            <div style={{
                backgroundColor: "black",
                border: "1px solid gray",
                padding: "8px",
                borderRadius: "5px",
                fontSize: "14px",
                color: "white",
                boxShadow: "0px 0px 5px rgba(255,255,255,0.2)"
            }}>
                <strong>{payload[0].payload.month}</strong>: {payload[0].value} mg/dL
            </div>
        );
    }
    return null;
};

export function HDLChart() {
    return (
        <Card className="bg-white text-black border border-gray-700 shadow-md">
            <CardHeader>
                <CardTitle>HDL Chart</CardTitle>
                <CardDescription>Recorded HDL levels</CardDescription>
            </CardHeader>
            <CardContent className="bg-white p-4">
                <LineChart
                    width={500}
                    height={300}
                    data={hdlData}
                    margin={{
                        top: 15,
                        right: 60,
                        left: 50,
                        bottom: 40,
                    }}
                    style={{ backgroundColor: "white", borderRadius: "8px" }} // Chart background
                >
                    {/* Gray Grid Lines */}
                    <CartesianGrid horizontal={true} vertical={false} stroke="#999999" strokeDasharray="10 10" />


                    {/* White Axis Labels */}
                    <XAxis 
                        dataKey="month" 
                        stroke="black"
                        tickFormatter={(value) => value.slice(0, 3)} 
                    />
                    <YAxis 
                        dataKey="value" 
                        domain={[minHDL, maxHDL]}  
                        ticks={yTicks}  
                        stroke="black" 
                        label={{ 
                            value: "HDL Levels (mg/dL)", 
                            angle: -90, 
                            position: "insideLeft", 
                            dy: 50,
                            fill: "black",
                        }} 
                    />

                    {/* Tooltip with Black Background */}
                    <Tooltip content={<CustomTooltip />} />

                    {/* Reference Lines in Gray */}
                    <ReferenceLine y={60} stroke="gray" strokeDasharray="5 5" label={{value: "Low", position: "top", fill: "black"}} />
                    <ReferenceLine y={70} stroke="gray" strokeDasharray="5 5" label={{value: "Borderline Low", position: "top", fill: "black"}} />

                    <Line type="monotone" dataKey="value" stroke="#00BFFF" strokeWidth={2} />
                </LineChart>
            </CardContent>
        </Card>
    );
}
