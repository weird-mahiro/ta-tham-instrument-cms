'use client'
import type { DefaultCellComponentProps } from 'payload'

import { VNDFormat } from '@/utils/currency'
import React from 'react'

export const GrandTotalComponent: React.FC<DefaultCellComponentProps> = (props) => {
  const { cellData } = props

  return <span>{VNDFormat(cellData)}</span>
}