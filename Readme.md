# SimplyMed — Medical Records Management Platform

SimplyMed is a full-stack web application that enables users to upload, manage, and securely share medical records such as prescriptions, test reports, and medical insights. It provides a structured dashboard, cloud-based storage, shareable links, AI features for easy access.

---

## Features

### Authentication

* User authentication using Clerk
* Secure access to personal dashboard

### Upload System

* Upload prescriptions, test reports, and medical insights
* File upload using Multer
* Cloud storage using Cloudinary
* Store metadata and URLs in MongoDB

### Dashboard

* View all uploaded records in an organized layout
* Sections include:
  * Prescriptions
  * Medical Insights
  * Test Reports
* Record deletion functionality
* Image preview support

### Shareable Links

* Generate secure shareable links
* Public access without authentication
* View all records in a single page

### Cloud Storage

* Images stored in Cloudinary
* Scalable and production-ready storage
* Optimized delivery via CDN

---

## Tech Stack

### Frontend

* Next.js (App Router)
* React
* Tailwind CSS
* Axios
* Clerk Authentication

### Backend

* Node.js
* Express.js
* MongoDB with Mongoose
* Multer
* Cloudinary
* Nanoid

---

## API Endpoints

### Upload

* POST /prescriptions/upload
* POST /insights/upload
* POST /tests/upload

### Fetch Data

* GET /prescriptions/user/:userId
* GET /insights/user/:userId
* GET /tests/user/:userId

### Delete

* DELETE /prescriptions/:id
* DELETE /insights/:id
* DELETE /tests/:id

### Share

* POST /share/create
* GET /share/:shareId

---

## Sharing Mechanism

1. User generates a share link
2. Backend creates a unique shareId
3. Link is generated using the shareId
4. Anyone with the link can view the records without authentication

---

## Security

* Authentication required for upload and dashboard access
* Share links use random identifiers instead of user IDs
* Sensitive data is not exposed directly

---




