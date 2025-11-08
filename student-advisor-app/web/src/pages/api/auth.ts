import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '../../lib/supabaseClient';

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req;

    switch (method) {
        case 'POST':
            const { email, password } = req.body;

            if (!email || !password) {
                return res.status(400).json({ error: 'Email and password are required' });
            }

            const { user, error } = await supabase.auth.signUp({
                email,
                password,
            });

            if (error) {
                return res.status(401).json({ error: error.message });
            }

            return res.status(200).json({ user });

        case 'GET':
            const { data: { user: currentUser }, error: sessionError } = await supabase.auth.getUser();

            if (sessionError) {
                return res.status(401).json({ error: sessionError.message });
            }

            return res.status(200).json({ user: currentUser });

        default:
            res.setHeader('Allow', ['POST', 'GET']);
            return res.status(405).end(`Method ${method} Not Allowed`);
    }
}