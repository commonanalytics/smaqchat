import { ArrowDown, ArrowUp } from 'lucide-react'
import React from 'react'
import './Metric.css'

interface MetricCardProps {
  title: string
  value: string | number
  subtitle?: string
  change?: {
    value: number
    isPositive: boolean
    label?: string
  }
  icon?: React.ReactNode
  width?: string | number
  height?: string | number
}

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  subtitle,
  change,
  icon,
  width = '100%',
  height = 'auto'
}) => {
  return (
    <div
      className="metric-card"
      style={{
        width,
        height,
        minHeight: '120px'
      }}
    >
      <div className="metric-header">
        <h3 className="metric-title">{title}</h3>
        {icon && <div className="metric-icon">{icon}</div>}
      </div>

      <div className="metric-value-container">
        <div className="metric-value">{value}</div>
        {subtitle && <div className="metric-subtitle">{subtitle}</div>}
      </div>

      {change && (
        <div className="metric-change">
          <span className={`change-value ${change.isPositive ? 'positive' : 'negative'}`}>
            {change.isPositive ? <ArrowUp className="change-arrow" /> : <ArrowDown className="change-arrow" />}
            {Math.abs(change.value)}%
          </span>
          {change.label && <span className="change-label">{change.label}</span>}
        </div>
      )}
    </div>
  )
}

export default MetricCard
