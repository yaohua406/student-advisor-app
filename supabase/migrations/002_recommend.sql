-- Create a simple recommendation function that returns up to 5 courses
-- not already enrolled by the given student.
CREATE OR REPLACE FUNCTION recommend_courses(student_id integer)
RETURNS TABLE(id integer, title varchar, description text, advisor_id integer) AS $$
    SELECT c.id, c.title, c.description, c.advisor_id
    FROM courses c
    WHERE NOT EXISTS (
        SELECT 1 FROM enrollments e WHERE e.user_id = student_id AND e.course_id = c.id
    )
    LIMIT 5;
$$ LANGUAGE sql STABLE;
