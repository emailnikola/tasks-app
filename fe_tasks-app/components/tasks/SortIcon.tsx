import { IconChevronDown, IconChevronUp, IconSelector } from '@tabler/icons-react'
import { JSX } from 'react'

export default function SortIcon({
  sorted,
  reversed
}: {
  sorted: boolean
  reversed: boolean
}): JSX.Element {
  if (!sorted) {
    return <IconSelector size={14} style={{ opacity: 0.5 }} />
  }
  return reversed ? <IconChevronUp size={14} /> : <IconChevronDown size={14} />
}
