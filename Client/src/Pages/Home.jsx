// ...existing code...
import Hero from "@/Components/Hero";
import React, { useMemo } from "react";
import CourseCard from "@/Components/CourseCard";
import { coursesJson } from "./Courses";
import { useSelector } from 'react-redux'

const Home = () => {
  const courseSlice = useSelector((store) => store.course);

  const courses = useMemo(() => {
    // debug log
    console.log("courseSlice (raw):", courseSlice);
    if (!courseSlice) return [];
    if (Array.isArray(courseSlice)) return courseSlice;
    if (Array.isArray(courseSlice.course)) return courseSlice.course;
    if (Array.isArray(courseSlice.courses)) return courseSlice.courses;
    return [];
  }, [courseSlice]);

  // final safe array
  const safeCourses = Array.isArray(courses) ? courses : [];

  // defensive mapping var to avoid calling slice on null
  const items = (safeCourses ?? []).slice(0, 6);

  return (
    <div>
      <Hero />
      <div className="py-10">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-4">
          Our Courses
        </h1>
        <p className="text-center text-gray-600 max-w-2xl mx-auto mb-10">
          Learnova's courses blend industry-expert instruction...
        </p>
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((c, index) => (
            <CourseCard key={c?._id ?? index} course={c} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
// ...existing code...