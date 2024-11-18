'use client'
import type { DefaultCellComponentProps } from 'payload'

import { VNDFormat } from '@/lib/currency'
import React from 'react'

export const PriceComponent: React.FC<DefaultCellComponentProps> = (props) => {
  const { cellData } = props

  return <span>{VNDFormat(cellData)}</span>
}
