import React from "react";
import {
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from "recharts";
import { compactInr } from "@/lib/finance";

export default function GrowthAreaChart({ data, dataKeys = [], xKey = "year" }) {
  return (
    <div className="w-full h-72 md:h-80" data-testid="growth-area-chart">
      <ResponsiveContainer>
        <AreaChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
          <defs>
            <linearGradient id="g-value" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0056b3" stopOpacity={0.45} />
              <stop offset="100%" stopColor="#0056b3" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="g-invested" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0A2540" stopOpacity={0.35} />
              <stop offset="100%" stopColor="#0A2540" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="#E5E7EB" strokeDasharray="2 4" vertical={false} />
          <XAxis dataKey={xKey} tick={{ fill: "#6B7280", fontSize: 12 }} tickLine={false} axisLine={{ stroke: "#E5E7EB" }} />
          <YAxis
            tick={{ fill: "#6B7280", fontSize: 12 }}
            tickLine={false}
            axisLine={{ stroke: "#E5E7EB" }}
            tickFormatter={(v) => compactInr(v)}
            width={70}
          />
          <Tooltip
            contentStyle={{ borderRadius: 8, border: "1px solid #E5E7EB", fontSize: 12 }}
            formatter={(v, name) => [compactInr(v), name]}
            labelFormatter={(l) => `${xKey === "year" ? "Year" : ""} ${l}`}
          />
          <Legend wrapperStyle={{ fontSize: 12 }} />
          {dataKeys.includes("invested") && (
            <Area type="monotone" dataKey="invested" name="Invested" stroke="#0A2540" strokeWidth={2} fill="url(#g-invested)" />
          )}
          {dataKeys.includes("value") && (
            <Area type="monotone" dataKey="value" name="Future Value" stroke="#0056b3" strokeWidth={2.5} fill="url(#g-value)" />
          )}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
