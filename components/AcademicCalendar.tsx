'use client'

import { useState } from 'react'
import dayjs, { Dayjs } from 'dayjs'

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

const AcademicCalendar = () => {
  const [currentMonth, setCurrentMonth] = useState<Dayjs>(dayjs())
  const [selectedDate, setSelectedDate] = useState<Dayjs>(dayjs())
  const [tasks, setTasks] = useState<Record<string, string[]>>({})

  const startOfMonth = currentMonth.startOf('month')
  const endOfMonth = currentMonth.endOf('month')
  const startDate = startOfMonth.startOf('week')
  const endDate = endOfMonth.endOf('week')

  const today = dayjs().format('YYYY-MM-DD')

  const generateCalendar = (): Dayjs[][] => {
    let date = startDate.clone()
    const calendar: Dayjs[][] = []

    while (date.isBefore(endDate, 'day')) {
      const week: Dayjs[] = []
      for (let i = 0; i < 7; i++) {
        week.push(date.clone())
        date = date.add(1, 'day')
      }
      calendar.push(week)
    }

    return calendar
  }

  const addTask = (dateStr: string, task: string) => {
    setTasks((prev) => ({
      ...prev,
      [dateStr]: [...(prev[dateStr] || []), task],
    }))
  }

  return (
    <section className="bg-white rounded-xl shadow p-6">
      <h2 className="text-xl font-semibold mb-4">📅 Smart Academic Calendar</h2>

      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={() => setCurrentMonth(currentMonth.subtract(1, 'month'))}
          className="text-xl px-2"
        >
          ←
        </button>
        <h3 className="text-lg font-medium">{currentMonth.format('MMMM YYYY')}</h3>
        <button
          onClick={() => setCurrentMonth(currentMonth.add(1, 'month'))}
          className="text-xl px-2"
        >
          →
        </button>
      </div>

      {/* Weekdays */}
      <div className="grid grid-cols-7 text-center text-sm font-medium text-gray-500 mb-2">
        {daysOfWeek.map((day) => (
          <div key={day}>{day}</div>
        ))}
      </div>

      {/* Calendar Days */}
      <div className="grid grid-cols-7 gap-1 text-sm">
        {generateCalendar().map((week, i) => (
          <div key={i} className="contents">
            {week.map((date) => {
              const dateStr = date.format('YYYY-MM-DD')
              const isToday = dateStr === today
              const hasTasks = tasks[dateStr]?.length > 0
              const isCurrentMonth = date.month() === currentMonth.month()

              return (
                <div
                  key={dateStr}
                  onClick={() => setSelectedDate(date)}
                  className={`p-2 rounded-lg text-center cursor-pointer transition-all duration-150 ${
                    isToday ? 'bg-blue-500 text-white font-bold' : ''
                  } ${!isCurrentMonth ? 'text-gray-400' : ''} ${
                    hasTasks && !isToday ? 'border border-blue-500' : ''
                  } hover:bg-blue-100`}
                >
                  {date.date()}
                </div>
              )
            })}
          </div>
        ))}
      </div>

      {/* Selected Day Tasks */}
      <div className="mt-6">
        <h4 className="font-semibold text-md mb-2">
          Tasks for {selectedDate.format('dddd, MMM D')}
        </h4>
        <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
          {(tasks[selectedDate.format('YYYY-MM-DD')] || []).map((task, i) => (
            <li key={i}>{task}</li>
          ))}
        </ul>

        {/* Add Task Input */}
        <div className="mt-4 flex gap-2">
          <input
            id="newTaskInput"
            type="text"
            placeholder="Add a new task..."
            className="w-full px-3 py-2 border rounded-lg text-sm"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && e.currentTarget.value.trim()) {
                addTask(selectedDate.format('YYYY-MM-DD'), e.currentTarget.value.trim())
                e.currentTarget.value = ''
              }
            }}
          />
          <button
            onClick={() => {
              const input = document.querySelector<HTMLInputElement>('#newTaskInput')
              if (input && input.value.trim()) {
                addTask(selectedDate.format('YYYY-MM-DD'), input.value.trim())
                input.value = ''
              }
            }}
            className="bg-primary text-white px-4 py-2 rounded-lg text-sm"
          >
            Add
          </button>
        </div>
      </div>
    </section>
  )
}

export default AcademicCalendar
