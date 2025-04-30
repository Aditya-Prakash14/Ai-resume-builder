'use client'

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ArrowDownAZ, ArrowUpAZ, Calendar } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"


  directionParam?;
  currentSort?;
  currentDirection?;
}

export function ResumeSortControls({ 
  sortParam = 'sort',
  directionParam = 'direction',
  currentSort,
  currentDirection= useRouter()
  const searchParams = useSearchParams()
  
  const currentSort = propCurrentSort || (searchParams.get(sortParam)'createdAt'
  const direction = propCurrentDirection || (searchParams.get(directionParam)'desc'

  function handleSortChange(sort) {
    const params = new URLSearchParams(searchParams)
    params.set(sortParam, sort)
    if (sort !== currentSort) {
      params.set(directionParam, 'asc')
    }
    router.push(`?${params.toString()}`)
  }

  function toggleDirection() {
    const params = new URLSearchParams(searchParams)
    params.set(directionParam, direction === 'asc' ? 'desc' : 'asc')
    router.push(`?${params.toString()}`)
  }

  return (
    
      
        
          
            Sort by {sortOptions.find(opt => opt.value === currentSort)?.label}
          
        
        
          {sortOptions.map((option) => (
             handleSortChange(option.value.label}
            
          ))}
        
      
      
      
        {direction === 'asc' ?  : }
      
    
  )
} 