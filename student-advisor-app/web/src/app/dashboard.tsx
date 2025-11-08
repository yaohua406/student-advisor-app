import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import AdvisorCard from '../components/AdvisorCard';
import { Course, Advisor } from '../types';

const Dashboard: React.FC = () => {
    const [courses, setCourses] = useState<Course[]>([]);
    const [advisors, setAdvisors] = useState<Advisor[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data: coursesData, error: coursesError } = await supabase
                    .from('courses')
                    .select('*');

                if (coursesError) throw coursesError;

                const { data: advisorsData, error: advisorsError } = await supabase
                    .from('advisors')
                    .select('*');

                if (advisorsError) throw advisorsError;

                setCourses(coursesData);
                setAdvisors(advisorsData);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
            <h2 className="text-xl font-semibold mb-2">Course Recommendations</h2>
            <ul className="mb-4">
                {courses.map(course => (
                    <li key={course.id} className="border p-2 mb-2">
                        {course.name}
                    </li>
                ))}
            </ul>
            <h2 className="text-xl font-semibold mb-2">Advisors</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {advisors.map(advisor => (
                    <AdvisorCard key={advisor.id} advisor={advisor} />
                ))}
            </div>
        </div>
    );
};

export default Dashboard;