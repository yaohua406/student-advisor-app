-- Initial data for users
INSERT INTO users (id, email, password, created_at) VALUES
  (1, 'student1@example.com', 'hashed_password1', NOW()),
  (2, 'student2@example.com', 'hashed_password2', NOW());

-- Initial data for advisors
INSERT INTO advisors (id, name, expertise, contact_info) VALUES
  (1, 'Dr. Jane Smith', 'Computer Science', 'jane.smith@example.com'),
  (2, 'Prof. John Doe', 'Mathematics', 'john.doe@example.com');

-- Initial data for courses
INSERT INTO courses (id, title, description, advisor_id) VALUES
  (1, 'Introduction to Programming', 'Learn the basics of programming using Python.', 1),
  (2, 'Calculus I', 'An introduction to differential and integral calculus.', 2);

-- Initial data for course enrollments
INSERT INTO course_enrollments (id, user_id, course_id) VALUES
  (1, 1, 1),
  (2, 2, 2);