1. Project Title
SkillBridge

2. Problem Statement
Finding verified, high-quality global internships is often a fragmented and frustrating process for students, while companies struggle to manage incoming applications efficiently and transparently. Existing platforms often lack robust management tools or verified listings. SkillBridge bridges this gap by connecting talent with global opportunities through a secure, full-stack platform. It enables students to find and apply for internships seamlessly with profile integration, while providing administrators with powerful tools to manage listings and track applications in real-time.

3. System Architecture
Frontend → Backend (API) → Database

Tech Stack
Frontend: React.js + Tailwind CSS + Axios
Backend: Node.js + Express.js
Database: MongoDB Atlas (via Mongoose)
Authentication: JWT-based (JSON Web Tokens)
Deployment
Frontend: Vercel
Backend: Render
Database: MongoDB Atlas

4. Key Features
Category	Features
Authentication	Secure User registration (Student/Admin roles), Login, and JWT session management.
Internship Mgmt	Create, Update, Delete listings (Admin). Detailed views with requirements and perks.
Search & Filter	Advanced filtering by Skill, Country, and Duration. Real-time text search.
Application Sys	One-click Apply with auto-filled profile data. Real-time status tracking (Pending/Reviewed/etc).
Admin Dashboard	Comprehensive panel to manage all internships and review incoming applications.
Profile Mgmt	Professional profile builder (Bio, Education, Skills, Resume link) that integrates with applications.
Advanced UI	Modern Glassmorphism design, Responsive layout, loading skeletons, and interactive animations.

5. CRUD Implementation & API Overview
This project implements full CRUD operations. All protected routes require a valid JWT Token in the Authorization header (Bearer <token>).

Authentication
POST /api/auth/signup: Register new user (Student or Admin).
POST /api/auth/login: Login and receive JWT.
GET /api/auth/me: Get current user details.

Internships CRUD
Create (Post Internship):
Endpoint: POST /api/internships
Access: Admin Only
Payload: { title, company, description, skills, country, duration, ... }
Read (Browse Internships):
Endpoint: GET /api/internships
Logic: Supports filtering (by skill/country) and searching with server-side pagination.
Update (Edit Internship):
Endpoint: PUT /api/internships/:id
Access: Admin Only
Delete (Remove Internship):
Endpoint: DELETE /api/internships/:id
Access: Admin Only

Applications CRUD
Create (Apply):
Endpoint: POST /api/applications
Payload: { internshipId, coverLetter, resume }
Logic: Links student profile (resume) to the application automatically.
Read (View History):
Endpoint: GET /api/applications/my-applications
Logic: Fetches all applications for the logged-in student with populated internship details.
Update (Manage Status):
Endpoint: PUT /api/applications/:id/status
Access: Admin Only
Logic: Admin updates status to 'Reviewed', 'Interview', 'Accepted', or 'Rejected'.

Profile CRUD
Create/Update:
Endpoint: PUT /api/profile
Payload: { bio, education, experience, skills, resume, ... }
Read:
Endpoint: GET /api/profile/me
Delete:
Endpoint: DELETE /api/profile
Logic: Removes user profile data.

6. Advanced Data Handling
The application employs robust techniques for data management and security.

Pagination:
Instead of loading all internships at once, the listing page uses server-side pagination.
Mechanism: The frontend requests specific pages (e.g., ?page=2&limit=6). The backend queries MongoDB using .skip() and .limit(). This ensures optimal performance even with a large database.

Searching & Filtering:
Server-Side Filtering: Query parameters are sent to the backend to filter specific MongoDB fields (e.g., country="Remote", skill="React").
Regex Search: Text search is implemented using MongoDB regex (`$regex`) for flexible keyword matching across titles and company names.

Role-Based Access Control (RBAC):
Custom middleware (`protect`, `adminOnly`) ensures that sensitive operations—like creating internships or changing application statuses—are strictly limited to authorized Admin users, while students have read-only access to listings.

Data Normalization & Population:
Application data is normalized. When fetching applications, the `populate()` method is used to efficiently retrieve related Internship and Student details in a single query, minimizing database trips.

7. How It Works (Flow)
1. Admin posts a new Internship (e.g., "Frontend Dev in London").
2. Student browses listings, using filters to find "United Kingdom" opportunities.
3. Backend queries DB and returns matching results.
4. Student clicks "Apply". The application form auto-fills their Resume from their Profile.
5. Application is saved to DB.
6. Admin sees the new application in the Admin Panel dashboard.
7. Admin reviews the candidate and updates status to "Interview".
8. Student sees their status change to "Interview" in "My Applications" immediately.
