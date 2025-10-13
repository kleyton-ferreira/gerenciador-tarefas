import React from 'react'

const DashboardCards = ({ icon, numberText, secundaryText }) => {
  return (
    <>
      <div className="mt-6 flex h-[150px] flex-col items-center justify-center gap-3 overflow-hidden rounded-xl bg-brand-white p-7">
        <div className="flex items-center gap-2">
          <span className="text-brand-primary"> {icon} </span>
          <h2 className="text-2xl text-brand-dark-blue">
            <strong> {numberText} </strong>
          </h2>
        </div>
        <p className="text-sm text-brand-dark-blue"> {secundaryText} </p>
      </div>
    </>
  )
}

export default DashboardCards
