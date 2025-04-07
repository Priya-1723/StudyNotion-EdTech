import React, {  useState } from 'react'

import { Chart, registerables } from "chart.js"
import { Pie } from "react-chartjs-2"

Chart.register(...registerables)

const InstructorChart = ({courses}) => {


    const [currChart, setCurrChart] = useState("students")

    if (!courses || courses.length === 0) {
        return <p className="text-center text-xl text-red-500">No data available</p>;
    }
    
    // function to generate random colors for chart
    const getRandomColors = (numColors) => {
        const colors = []
        for(let i=0; i<numColors; i++){
            const color = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`
            colors.push(color)
        }
        return colors;
    }

    const studentData = courses
        .filter((course) => course.studentsEnrolled?.length > 0)
        .map((course) => course.studentsEnrolled.length);
  
    const incomeData = courses
        .filter((course) => course.sales * course.price > 0)
        .map((course) => course.sales * course.price);
    
    const labels = courses
        .filter((course) => course.studentsEnrolled?.length > 0)
        .map((course) => course.courseName);
    
    const chartDataForStudents = {
        labels: labels.length ? labels : ["No Data"],
        datasets: [
        {
            data: studentData.length ? studentData : [1], // Avoid empty dataset
            backgroundColor: getRandomColors(studentData.length || 1),
        },
        ],
    };
    
    const chartDataForIncome = {
        labels: labels.length ? labels : ["No Data"],
        datasets: [
        {
            data: incomeData.length ? incomeData : [1], // Avoid empty dataset
            backgroundColor: getRandomColors(incomeData.length || 1),
        },
        ],
    };
  

  const options = {
        maintainAspectRatio: false,
        responsive: true,
        
    }


  return (
    <div className="flex flex-1 flex-col gap-y-4 rounded-md bg-richblack-800 p-6">
        <p className="text-lg font-bold text-richblack-5">Visualise</p>
        <div className="space-x-4 font-semibold">
            <button
                onClick={() => setCurrChart("students")}
                className={`rounded-sm p-1 px-3 transition-all duration-200 ${
                    currChart === "students"
                      ? "bg-richblack-700 text-yellow-50"
                      : "text-yellow-400"
                  }`}
            >
                Student
            </button>
            <button
                onClick={() => setCurrChart("income")}
                className={`rounded-sm p-1 px-3 transition-all duration-200 ${
                    currChart === "income"
                      ? "bg-richblack-700 text-yellow-50"
                      : "text-yellow-400"
                  }`}
            >
                Income
            </button>
        </div>
        <div className="relative mx-auto aspect-square h-[500px] w-[500px]">
            <Pie 
                data={currChart === "students" 
                    ? chartDataForStudents : chartDataForIncome}
                options={options}
            />
        </div>
        
    </div>
  )
}

export default InstructorChart
