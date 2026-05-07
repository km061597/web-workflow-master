---
name: frontend-patterns
description: |
  Frontend development patterns for React, Next.js, state management, performance optimization, forms, accessibility, and animation. Covers component composition, custom hooks, Context+Reducer, memoization, code splitting, virtualization, error boundaries, and Framer Motion. Use when building React components, managing state, fetching data, optimizing performance, or handling forms. Stack: React 19 / Next.js 16 / Tailwind 4 / shadcn.
triggers:
  - "react"
  - "next.js"
  - "component"
  - "state management"
  - "performance"
  - "form"
  - "hook"
  - "memoization"
  - "virtualization"
  - "error boundary"
---

# Frontend Development Patterns

Modern frontend patterns for React, Next.js, and performant user interfaces.

## When to Activate

- Building React components (composition, props, rendering)
- Managing state (useState, useReducer, Zustand, Context)
- Implementing data fetching (SWR, React Query, server components)
- Optimizing performance (memoization, virtualization, code splitting)
- Working with forms (validation, controlled inputs, Zod schemas)
- Handling client-side routing and navigation
- Building accessible, responsive UI patterns

## Component Patterns

### Composition Over Inheritance

```typescript
interface CardProps {
  children: React.ReactNode
  variant?: 'default' | 'outlined'
}

export function Card({ children, variant = 'default' }: CardProps) {
  return <div className={`card card-${variant}`}>{children}</div>
}

export function CardHeader({ children }: { children: React.ReactNode }) {
  return <div className="card-header">{children}</div>
}

// Usage
<Card>
  <CardHeader>Title</CardHeader>
  <CardBody>Content</CardBody>
</Card>
```

### Compound Components

Use a Context to share state between related sub-components:

```typescript
const TabsContext = createContext<{ activeTab: string; setActiveTab: (tab: string) => void } | undefined>(undefined)

export function Tabs({ children, defaultTab }: { children: React.ReactNode; defaultTab: string }) {
  const [activeTab, setActiveTab] = useState(defaultTab)
  return <TabsContext.Provider value={{ activeTab, setActiveTab }}>{children}</TabsContext.Provider>
}

export function Tab({ id, children }: { id: string; children: React.ReactNode }) {
  const ctx = useContext(TabsContext)
  if (!ctx) throw new Error('Tab must be used within Tabs')
  return <button className={ctx.activeTab === id ? 'active' : ''} onClick={() => ctx.setActiveTab(id)}>{children}</button>
}
```

## Custom Hooks

### useToggle

```typescript
export function useToggle(initialValue = false): [boolean, () => void] {
  const [value, setValue] = useState(initialValue)
  const toggle = useCallback(() => setValue(v => !v), [])
  return [value, toggle]
}
```

### useDebounce

```typescript
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay)
    return () => clearTimeout(handler)
  }, [value, delay])
  return debouncedValue
}
```

### useQuery (async data fetching)

```typescript
export function useQuery<T>(key: string, fetcher: () => Promise<T>, options?: { enabled?: boolean }) {
  const [data, setData] = useState<T | null>(null)
  const [error, setError] = useState<Error | null>(null)
  const [loading, setLoading] = useState(false)

  const refetch = useCallback(async () => {
    setLoading(true); setError(null)
    try { const result = await fetcher(); setData(result) }
    catch (err) { setError(err as Error) }
    finally { setLoading(false) }
  }, [fetcher])

  useEffect(() => { if (options?.enabled !== false) refetch() }, [key, refetch])
  return { data, error, loading, refetch }
}
```

## State Management

### Context + Reducer Pattern

Best for medium-complexity shared state. For simple state, use useState. For complex global state, use Zustand or Redux.

```typescript
interface State { items: Item[]; selected: Item | null; loading: boolean }
type Action =
  | { type: 'SET_ITEMS'; payload: Item[] }
  | { type: 'SELECT'; payload: Item }

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SET_ITEMS': return { ...state, items: action.payload }
    case 'SELECT': return { ...state, selected: action.payload }
    default: return state
  }
}

const StoreContext = createContext<{ state: State; dispatch: Dispatch<Action> } | undefined>(undefined)
```

## Performance Optimization

### Memoization

```typescript
// useMemo for expensive computations
const sorted = useMemo(() => items.sort((a, b) => b.score - a.score), [items])

// useCallback for functions passed to children
const handleSearch = useCallback((query: string) => setSearchQuery(query), [])

// React.memo for pure components
export const ItemCard = React.memo<ItemCardProps>(({ item }) => { ... })
```

### Code Splitting & Lazy Loading

```typescript
import { lazy, Suspense } from 'react'

const HeavyChart = lazy(() => import('./HeavyChart'))

export function Dashboard() {
  return (
    <Suspense fallback={<ChartSkeleton />}>
      <HeavyChart data={data} />
    </Suspense>
  )
}
```

### Virtualization for Long Lists

```typescript
import { useVirtualizer } from '@tanstack/react-virtual'

export function VirtualList({ items }: { items: Item[] }) {
  const parentRef = useRef<HTMLDivElement>(null)
  const virtualizer = useVirtualizer({
    count: items.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 100,
    overscan: 5
  })

  return (
    <div ref={parentRef} style={{ height: '600px', overflow: 'auto' }}>
      <div style={{ height: `${virtualizer.getTotalSize()}px`, position: 'relative' }}>
        {virtualizer.getVirtualItems().map(virtualRow => (
          <div key={virtualRow.index} style={{ position: 'absolute', top: 0, left: 0, width: '100%', transform: `translateY(${virtualRow.start}px)` }}>
            <ItemCard item={items[virtualRow.index]} />
          </div>
        ))}
      </div>
    </div>
  )
}
```

## Form Handling

### Controlled Form with Validation

```typescript
interface FormData { name: string; email: string }
interface FormErrors { name?: string; email?: string }

export function ContactForm() {
  const [form, setForm] = useState<FormData>({ name: '', email: '' })
  const [errors, setErrors] = useState<FormErrors>({})

  const validate = (): boolean => {
    const e: FormErrors = {}
    if (!form.name.trim()) e.name = 'Name is required'
    if (!form.email.includes('@')) e.email = 'Valid email required'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    await submitForm(form)
  }

  return (
    <form onSubmit={handleSubmit}>
      <input value={form.name} onChange={e => setForm(prev => ({ ...prev, name: e.target.value }))} />
      {errors.name && <span className="error">{errors.name}</span>}
      <button type="submit">Submit</button>
    </form>
  )
}
```

## Error Boundary

```typescript
export class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean; error: Error | null }> {
  state = { hasError: false, error: null }
  static getDerivedStateFromError(error: Error) { return { hasError: true, error } }
  componentDidCatch(error: Error, info: React.ErrorInfo) { console.error(error, info) }
  render() {
    if (this.state.hasError) {
      return <div className="error-fallback"><h2>Something went wrong</h2><p>{this.state.error?.message}</p></div>
    }
    return this.props.children
  }
}
```

## Animation with Framer Motion

```typescript
import { motion, AnimatePresence } from 'framer-motion'

// List animations
export function AnimatedList({ items }: { items: Item[] }) {
  return (
    <AnimatePresence>
      {items.map(item => (
        <motion.div key={item.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
          <ItemCard item={item} />
        </motion.div>
      ))}
    </AnimatePresence>
  )
}

// Modal animations
export function Modal({ isOpen, onClose, children }: ModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div className="modal-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} />
          <motion.div className="modal-content" initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }}>
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
```

## Accessibility Patterns

### Keyboard Navigation (Dropdown)

```typescript
export function Dropdown({ options, onSelect }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)

  const handleKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowDown': e.preventDefault(); setActiveIndex(i => Math.min(i + 1, options.length - 1)); break
      case 'ArrowUp': e.preventDefault(); setActiveIndex(i => Math.max(i - 1, 0)); break
      case 'Enter': e.preventDefault(); onSelect(options[activeIndex]); setIsOpen(false); break
      case 'Escape': setIsOpen(false); break
    }
  }

  return <div role="combobox" aria-expanded={isOpen} aria-haspopup="listbox" onKeyDown={handleKeyDown}>...</div>
}
```

### Focus Management (Modal)

```typescript
export function Modal({ isOpen, onClose, children }: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)
  const previousFocusRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (isOpen) {
      previousFocusRef.current = document.activeElement as HTMLElement
      modalRef.current?.focus()
    } else {
      previousFocusRef.current?.focus()
    }
  }, [isOpen])

  return isOpen ? <div ref={modalRef} role="dialog" aria-modal="true" tabIndex={-1} onKeyDown={e => e.key === 'Escape' && onClose()}>{children}</div> : null
}
```

## Stack Base

- **React 19** — composition model, hooks, concurrent features
- **Next.js 16** — App Router, Server Components, streaming
- **Tailwind 4** — utility-first CSS, CSS variables
- **shadcn/ui** — accessible component primitives
