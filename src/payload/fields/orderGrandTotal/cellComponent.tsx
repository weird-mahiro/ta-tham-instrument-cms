'use client'
import type { DefaultCellComponentProps } from 'payload'

import { VNDFormat } from '@/lib/currency-utils'
import React from 'react'

export const GrandTotalComponent: React.FC<DefaultCellComponentProps> = (props) => {
  const { cellData } = props

  return <span>{VNDFormat(cellData)}</span>
}
