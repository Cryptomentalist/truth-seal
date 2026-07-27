import type * as React from 'npm:react@18.3.1'

import { template as orderShipped } from './order-shipped.tsx'
import { template as orderTracking } from './order-tracking.tsx'
import { template as invoiceIssued } from './invoice-issued.tsx'

// deno-lint-ignore no-explicit-any
export interface TemplateEntry {
  // deno-lint-ignore no-explicit-any
  component: React.ComponentType<any>
  // deno-lint-ignore no-explicit-any
  subject: string | ((data: any) => string)
  displayName?: string
  // deno-lint-ignore no-explicit-any
  previewData?: Record<string, any>
  to?: string
}

export const TEMPLATES: Record<string, TemplateEntry> = {
  'order-shipped': orderShipped,
  'order-tracking': orderTracking,
}
