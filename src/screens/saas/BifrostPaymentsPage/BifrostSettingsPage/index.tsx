import React from "react";
import { Settings } from "lucide-react";

interface BifrostSettingsPageProps {
  variant: "host" | "saas";
  onBack: () => void;
}

export function BifrostSettingsPage({
  variant,
  onBack,
}: BifrostSettingsPageProps) {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-medium">Settings</h1>
        <button
          onClick={onBack}
          className="text-gray-600 hover:text-gray-900"
        >
          Back to Overview
        </button>
      </div>

      <div className="bg-gray-50 rounded-lg p-8 text-center">
        <Settings className="w-12 h-12 mx-auto mb-4 text-gray-400" />
        <h2 className="text-xl font-medium mb-2">Settings Coming Soon</h2>
        <p className="text-gray-600">
          Additional settings and configuration options will be available in a future update.
        </p>
      </div>
    </div>
  );
} 