import { createClient } from '@supabase/supabase-js';
import { supabaseUrl, supabaseAnonKey } from '../.env.example';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function seedDatabase() {
    const { data, error } = await supabase
        .from('courses')
        .insert([
            { title: 'Introduction to Programming', description: 'Learn the basics of programming using JavaScript.', credits: 3 },
            { title: 'Data Structures and Algorithms', description: 'Understand the fundamental data structures and algorithms.', credits: 4 },
            { title: 'Web Development', description: 'Build modern web applications using React and Tailwind CSS.', credits: 3 },
        ]);

    if (error) {
        console.error('Error seeding courses:', error);
    } else {
        console.log('Courses seeded:', data);
    }

    const { data: advisorsData, error: advisorsError } = await supabase
        .from('advisors')
        .insert([
            { name: 'Dr. Smith', expertise: 'Computer Science', contact: 'smith@example.com' },
            { name: 'Prof. Johnson', expertise: 'Mathematics', contact: 'johnson@example.com' },
        ]);

    if (advisorsError) {
        console.error('Error seeding advisors:', advisorsError);
    } else {
        console.log('Advisors seeded:', advisorsData);
    }
}

seedDatabase();