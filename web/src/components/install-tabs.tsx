'use client';

import * as TabsPrimitive from '@radix-ui/react-tabs';
import type { ReactNode } from 'react';

const OS_TABS = [
  { value: 'linux', label: 'Linux' },
  { value: 'macos', label: 'macOS' },
  { value: 'windows', label: 'Windows (WSL)' },
];

export function InstallTabs({ linux, macos, windows }: { linux: ReactNode; macos: ReactNode; windows: ReactNode }) {
  return (
    <TabsPrimitive.Root defaultValue="linux" className="mt-4">
      <TabsPrimitive.List className="flex gap-1 border-b border-border">
        {OS_TABS.map((tab) => (
          <TabsPrimitive.Trigger
            key={tab.value}
            value={tab.value}
            className="border-b-2 border-transparent px-4 py-2 text-sm text-muted-foreground transition-colors data-[state=active]:border-primary data-[state=active]:font-semibold data-[state=active]:text-foreground"
          >
            {tab.label}
          </TabsPrimitive.Trigger>
        ))}
      </TabsPrimitive.List>
      <TabsPrimitive.Content value="linux" className="pt-6">
        {linux}
      </TabsPrimitive.Content>
      <TabsPrimitive.Content value="macos" className="pt-6">
        {macos}
      </TabsPrimitive.Content>
      <TabsPrimitive.Content value="windows" className="pt-6">
        {windows}
      </TabsPrimitive.Content>
    </TabsPrimitive.Root>
  );
}
