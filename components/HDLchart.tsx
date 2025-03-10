"use client"

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
                backgroundColor: "white",
                border: "1px solid #ccc",
                padding: "8px",
                borderRadius: "5px",
                fontSize: "14px",
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
        <Card>
            <CardHeader>
                <CardTitle>HDL Chart</CardTitle>
                <CardDescription>Recorded HDL levels</CardDescription>
            </CardHeader>
            <CardContent>
                <LineChart
                    width={500}
                    height={300}
                    data={hdlData}
                    margin={{
                        top: 15,
                        right: 30,
                        left: 50,  // Increased left margin for Y-axis label
                        bottom: 20, // Reduced bottom margin since X-axis labels are removed
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    
                    {/* X-Axis WITHOUT labels */}
                    <XAxis dataKey="month" tick={false} />

                    {/* Y-Axis with label */}
                    <YAxis 
                        dataKey="value" 
                        domain={[minHDL, maxHDL]}  // Fixed Y-axis range 20-100
                        ticks={yTicks}  // Labels at 20, 30, 40, ..., 100
                        label={{ 
                            value: "HDL Levels (mg/dL)", 
                            angle: -90, 
                            position: "insideLeft", 
                            dy: 50 
                        }} // Y-axis label
                    />
                    
                    {/* Custom Tooltip shows "Month: Value" */}
                    <Tooltip content={<CustomTooltip />} />

                    {/* Horizontal line at 65 (boundary value) */}
                    <ReferenceLine y={60} stroke="gray" strokeDasharray="5 5" label="Low" />

                     {/* Horizontal line at 65 (boundary value) */}
                    <ReferenceLine y={70} stroke="gray" strokeDasharray="5 5" label="Borderline low" />

                    {/* Line chart for HDL values */}
                    <Line type="monotone" dataKey="value" stroke="blue" strokeWidth={2} />
                </LineChart>
            </CardContent>
        </Card>
    );
}
