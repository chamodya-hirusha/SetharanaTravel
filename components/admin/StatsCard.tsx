import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  label: string;
  value: number;
  icon: LucideIcon;
  color: string;
  bgColor: string;
  description?: string;
}

export default function StatsCard({
  label,
  value,
  icon: Icon,
  color,
  bgColor,
  description,
}: StatsCardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 flex flex-col gap-3.5 shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="flex justify-between items-start">
        <div 
          className="w-12 h-12 rounded-xl flex items-center justify-center"
          style={{ background: bgColor }}
        >
          <Icon size={22} color={color} />
        </div>
      </div>
      <div>
        <div className="text-[34px] font-extrabold text-gray-900 leading-none mb-1.5">
          {value}
        </div>
        <div className="text-gray-700 text-sm font-semibold">
          {label}
        </div>
        {description && (
          <div className="text-gray-400 text-xs mt-1">
            {description}
          </div>
        )}
      </div>
    </div>
  );
}
