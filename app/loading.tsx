import { Loader2 } from 'lucide-react'

export default function GlobalLoader() {
  return (
    <div className="mt-[400px] inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm"  tabIndex={-1}>
      <Loader2 className="h-12 w-12 animate-spin text-primary" />
    </div>
  )
}