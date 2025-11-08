# Student Advisor Application

## Overview
The Student Advisor application is a full-stack web application designed to assist students in managing their academic journey. It provides features for user authentication, course recommendations, and advisor information, leveraging Supabase as the backend service.

## Tech Stack
- **Frontend**: React, TypeScript, Tailwind CSS
- **Backend**: Supabase (PostgreSQL, Auth, Realtime)
- **APIs**:
  - Supabase Auth API for user authentication and management.
  - Supabase Realtime API for real-time updates on course and advisor data.
  - Course Recommendation API for integrating external course recommendations.

## Project Structure
```
student-advisor-app
├── web
│   ├── src
│   │   ├── pages
│   │   │   ├── api
│   │   │   │   └── auth.ts
│   │   │   └── index.tsx
│   │   ├── app
│   │   │   └── dashboard.tsx
│   │   ├── components
│   │   │   ├── Layout.tsx
│   │   │   └── AdvisorCard.tsx
│   │   ├── styles
│   │   │   └── globals.css
│   │   ├── lib
│   │   │   └── supabaseClient.ts
│   │   ├── hooks
│   │   │   └── useCourses.ts
│   │   └── types
│   │       └── index.ts
│   ├── package.json
│   ├── tsconfig.json
│   ├── tailwind.config.js
│   └── postcss.config.js
├── supabase
│   ├── migrations
│   │   └── 001_init.sql
│   ├── functions
│   │   └── recommend-courses
│   │       ├── index.ts
│   │       └── package.json
│   └── seed.sql
├── scripts
│   └── seed.ts
├── .env.example
├── package.json
├── tsconfig.json
└── README.md
```

## Setup Instructions
1. **Clone the Repository**:
   ```bash
   git clone <repository-url>
   cd student-advisor-app
   ```

2. **Install Dependencies**:
   Navigate to the `web` directory and install the necessary packages:
   ```bash
   cd web
   npm install
   ```

3. **Configure Environment Variables**:
   Copy the `.env.example` file to `.env` and fill in the required Supabase credentials.

4. **Initialize Supabase**:
   Run the SQL migrations and seed the database:
   ```bash
   cd supabase
   supabase db push
   supabase db seed
   ```

5. **Run the Application**:
   Start the development server:
   ```bash
   npm run dev
   ```

## Usage
- Access the application in your browser at `http://localhost:3000`.
- Users can sign up, sign in, and view their dashboard with course recommendations and advisor information.

## Recommendations
- Consider using React Query or SWR for efficient data fetching and caching.
- Implement a state management solution like Zustand or Redux for managing global state.
- Ensure to handle errors and loading states to enhance user experience.
- Utilize TypeScript interfaces for better type safety throughout the application.

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License
This project is licensed under the MIT License.