import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

export const recommendCourses = async (userId: string) => {
    try {
        const { data, error } = await supabase
            .from('courses')
            .select('*')
            .eq('recommended_for', userId);

        if (error) {
            throw new Error(error.message);
        }

        return data;
    } catch (error) {
        console.error('Error recommending courses:', error);
        throw error;
    }
};

export default async (req: any, res: any) => {
    const { userId } = req.body;

    if (!userId) {
        return res.status(400).json({ error: 'User ID is required' });
    }

    try {
        const courses = await recommendCourses(userId);
        return res.status(200).json(courses);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};