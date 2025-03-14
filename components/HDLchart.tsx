"use client";

import { 
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine, TooltipProps
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/card";
import { cholesterolData } from "../data/cholesterolData";

const hdlData = cholesterolData.HDL;
const minHDL = 20;
const maxHDL = 100;

const LOW = 60;
const BORDERLINE_LOW = 70;

// Calculate percentage positions based on actual values


const yTicks = Array.from({ length: (maxHDL - minHDL) / 10 + 1 }, (_, i) => minHDL + i * 10);

const CustomTooltip: React.FC<TooltipProps<number, string>> = ({ active, payload }) => {
    if (active && payload && payload.length) {
        return (
            <div style={{
                backgroundColor: "white",
                border: "2px solid black",
                padding: "8px",
                borderRadius: "5px",
                fontSize: "14px",
                color: "black",
                boxShadow: "0px 0px 5px rgba(0,0,0,0.2)"
            }}>
                <strong>{payload[0].payload.month}</strong>: {payload[0].value} mg/dL
            </div>
        );
    }
    return null;
};

export function HDLChart() {
    return (
        <Card className="bg-white text-black border border-gray-600 shadow-md">
            <CardHeader>
                <CardTitle>HDL Chart</CardTitle>
                <CardDescription>Recorded HDL levels</CardDescription>
            </CardHeader>
            <CardContent className="bg-white p-4">
                <LineChart
                    width={500}
                    height={300}
                    data={hdlData}
                    margin={{ top: 15, right: 60, left: 55, bottom: 40 }}
                    style={{ backgroundColor: "white", borderRadius: "8px" }}
                >
                    <defs>
                        <linearGradient 
                            id="colorAxis" 
                            x1="0" 
                            x2="0" 
                            y1="0" 
                            y2="1"
                            gradientUnits="userSpaceOnUse"
                        >
                            {/* Red (20-60) - Bottom 50% */}
                            <stop offset="0%" stopColor="#ff4444" />
                            <stop offset="50%" stopColor="#ff4444" />
                            
                            {/* Yellow (60-70) - Middle 12.5% */}
                            <stop offset="50%" stopColor="#FFEB3B" />
                            <stop offset="62.5%" stopColor="#FFEB3B" />
                            
                            {/* Green (70-100) - Top 37.5% */}
                            <stop offset="62.5%" stopColor="#4CAF50" />
                            <stop offset="100%" stopColor="#4CAF50" />
                        </linearGradient>
                    </defs>

                    <CartesianGrid 
                        horizontal={true} 
                        vertical={false} 
                        stroke="#999999" 
                        strokeWidth={1.5} 
                        strokeDasharray="3 3" 
                    />

                    <XAxis 
                        dataKey="month" 
                        stroke="black"
                        tickFormatter={(value) => value.slice(0, 3)}
                    />
                    <YAxis 
                        dataKey="value" 
                        domain={[minHDL, maxHDL]}  
                        ticks={yTicks}  
                        axisLine={{ 
                            stroke: "url(#colorAxis)", 
                            strokeWidth: 10,
                            strokeLinecap: "butt" 
                        }}
                        tickLine={{ stroke: "black" }}
                        label={{ 
                            value: "HDL Levels (mg/dL)", 
                            angle: -90, 
                            position: "insideLeft", 
                            dy: 50, 
                            fill: "black",
                            offset: 25
                        }}
                    />

                    <ReferenceLine 
                        y={LOW} 
                        stroke="black" 
                        strokeWidth={2.5} 
                        strokeDasharray="5 5" 
                        label={{ value: "Low", position: "top", fill: "black", dy: -5 }} 
                    />
                    <ReferenceLine 
                        y={BORDERLINE_LOW} 
                        stroke="black" 
                        strokeWidth={2.5} 
                        strokeDasharray="5 5" 
                        label={{ value: "Borderline Low", position: "top", fill: "black", dy: -5 }} 
                    />

                    <Tooltip content={<CustomTooltip />} />

                    <Line 
                        type="monotone" 
                        dataKey="value" 
                        stroke="#007AFF" 
                        strokeWidth={3} 
                    />
                </LineChart>
            </CardContent>
        </Card>
    );
}