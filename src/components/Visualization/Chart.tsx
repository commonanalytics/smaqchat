import React, { useEffect, useRef } from 'react'
import Chart from 'chart.js/auto'
import { ChartTypeRegistry } from 'chart.js'
import { useTheme } from 'next-themes'
import './Chart.css'

interface ChartData {
  title: string
  type: keyof ChartTypeRegistry
  xaxis: string[]
  yaxis: string[]
  xlabel: string
  ylabel: string
  data: Record<string, unknown>[]
}

interface ChartVisualizationProps {
  chartData: ChartData
  width?: string | number
  height?: string | number
}

export const ChartVisualization: React.FC<ChartVisualizationProps> = ({ chartData, width = '100%', height = 400 }) => {
  const chartRef = useRef<HTMLCanvasElement | null>(null)
  const chartInstance = useRef<Chart | null>(null)
  const { resolvedTheme } = useTheme()

  useEffect(() => {
    if (!chartRef.current || !chartData) return

    // Clean up any existing chart
    if (chartInstance.current) {
      chartInstance.current.destroy()
    }

    const ctx = chartRef.current.getContext('2d')
    if (!ctx) return

    // Process data based on chart type
    const { datasets, labels } = processChartData(chartData)

    // Create new chart
    chartInstance.current = new Chart(ctx, {
      type: chartData.type,
      data: {
        labels,
        datasets
      },
      options: getChartOptions(chartData)
    }) as Chart<keyof ChartTypeRegistry>

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy()
      }
    }
  }, [chartData])

  const processChartData = (chartData: ChartData) => {
    const { data, xaxis, yaxis, type } = chartData

    // For pie/doughnut charts
    if (type === 'pie' || type === 'doughnut') {
      const labels = data.map((item) => item[xaxis[0]])
      const values = data.map((item) => item[yaxis[0]])

      return {
        labels,
        datasets: [
          {
            data: values,
            backgroundColor: generateColors(values.length),
            borderColor: 'rgba(0, 0, 0, 0.1)',
            borderWidth: 1
          }
        ]
      }
    }

    // For other chart types (bar, line, scatter)
    const labels = data.map((item) => item[xaxis[0]])
    const datasets = yaxis.map((y, index) => {
      const colors = generateColors(yaxis.length)
      return {
        label: y,
        data: data.map((item) => item[y]),
        backgroundColor: type === 'line' ? 'transparent' : colors[index],
        borderColor: colors[index],
        borderWidth: 1,
        fill: type === 'line',
        tension: type === 'line' ? 0.4 : 0,
        pointBackgroundColor: colors[index]
      }
    })

    return { labels, datasets }
  }

  const getChartOptions = (chartData: ChartData) => {
    const textColor = resolvedTheme === 'dark' ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.8)'
    const gridColor = resolvedTheme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'

    return {
      responsive: true,
      maintainAspectRatio: false,
      animation: {
        duration: 0 // Set duration to 0 to disable animations
      },
      plugins: {
        legend: {
          position: 'top' as const,
          labels: {
            color: textColor,
            font: {
              family: "'Inter', 'system-ui', sans-serif"
            }
          }
        },
        title: {
          display: true,
          text: chartData.title,
          color: textColor,
          font: {
            family: "'Inter', 'system-ui', sans-serif",
            size: 16,
            weight: 'bold' as const
          }
        },
        tooltip: {
          backgroundColor: resolvedTheme === 'dark' ? 'rgba(0, 0, 0, 0.8)' : 'rgba(255, 255, 255, 0.8)',
          titleColor: resolvedTheme === 'dark' ? 'white' : 'black',
          bodyColor: resolvedTheme === 'dark' ? 'white' : 'black',
          borderColor: gridColor,
          borderWidth: 1,
          padding: 10,
          cornerRadius: 4,
          displayColors: true
        }
      },
      scales:
        chartData.type !== 'pie' && chartData.type !== 'doughnut'
          ? {
              x: {
                title: {
                  display: !!chartData.xlabel,
                  text: chartData.xlabel,
                  color: textColor
                },
                ticks: { color: textColor },
                grid: { color: gridColor }
              },
              y: {
                title: {
                  display: !!chartData.ylabel,
                  text: chartData.ylabel,
                  color: textColor
                },
                ticks: { color: textColor },
                grid: { color: gridColor },
                beginAtZero: true
              }
            }
          : undefined
    }
  }

  const generateColors = (count: number) => {
    const baseColors = [
      'rgb(59, 130, 246)', // blue-500
      'rgb(168, 85, 247)', // purple-500
      'rgb(239, 68, 68)', // red-500
      'rgb(245, 158, 11)', // amber-500
      'rgb(6, 182, 212)', // cyan-500
      'rgb(34, 197, 94)' // green-500
    ]

    // If we need more colors than available, generate them
    const colors = [...baseColors]
    while (colors.length < count) {
      const r = Math.floor(Math.random() * 255)
      const g = Math.floor(Math.random() * 255)
      const b = Math.floor(Math.random() * 255)
      colors.push(`rgba(${r}, ${g}, ${b}, 0.7)`)
    }

    return colors.slice(0, count)
  }

  if (!chartData) {
    return <div className="unavailable-message">Unavailable</div>
  }

  return (
    <div
      className="chart-container"
      style={{
        width,
        height
      }}
    >
      <canvas ref={chartRef} />
    </div>
  )
}

export default ChartVisualization
