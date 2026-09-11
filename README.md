# CRM Management System

A modern, full-featured Customer Relationship Management (CRM) application built with Django and PostgreSQL. Manage customers, leads, and follow-ups efficiently with role-based access control, real-time dashboards, and a **Personalised AI Email Generator**.

---

## Features

### Authentication & Authorization
- User registration and login using secure Django Authentication
- Role-based access control (Admin and Sales Executive)
- Modern, responsive login and registration interfaces

### AI-Powered Intelligence
- **Personalised AI Email Generator**:
  - Generate customized follow-up emails for customers and sales leads
  - Custom objectives (e.g. Proposal follow-up, Demo request, Re-engagement, Next steps, Special offer)
  - Multiple tone options (Professional, Friendly, Persuasive, Urgent, Concise)
  - One-click **Copy Subject**, **Copy Body**, and **Open Mail Client (`mailto:`)** actions

### Customer Management
- Add, view, update, and delete customer records
- Detailed customer profiles with contact information
- Customer status tracking (Active / Inactive)
- Search customers by name, email, or phone
- Comprehensive customer history and linked sales activities

### Lead Management
- Create and manage sales leads linked to customers
- Assign leads to team members (Admin feature)
- Track lead progress through sales pipeline stages: *New, Contacted, Qualified, Proposal Sent, Won, Lost*
- Expected deal value tracking for revenue forecasting
- Direct "Generate AI Email" action buttons for every lead

### Follow-Up Management
- Schedule follow-up tasks for leads with due dates
- Add detailed interaction notes
- Mark follow-ups as completed or pending

### Dashboard & Analytics
- Real-time business metrics dashboard
- Admin dashboard: system-wide overview of pipeline value, lead counts, and follow-ups
- Sales Executive dashboard: personal performance and assigned lead tracking
- Live clock, time-based greetings, and animated counters

### REST API
- Full RESTful API endpoints powered by Django REST Framework
- Customer and Lead API resources with search, ordering, and pagination
- Standard Django Authentication (`SessionAuthentication` / `BasicAuthentication`)

---

## Project Structure

```
crm_project/
├── crm_app/                  
│   ├── services/
│   │   └── llm_service.py      
│   ├── static/                
│   │   ├── css/               
│   │   │   ├── style.css
│   │   │   └── theme.css
│   │   └── js/
│   │       ├── app.js         
│   │       ├── auth.js         
│   │       └── dashboard.js    
│   ├── templates/              
│   │   ├── email_generator/
│   │   │   └── email_generator.html 
│   │   ├── customer/
│   │   ├── lead/
│   │   └── followup/
│   └── migrations/
├── crm_project/               
├── staticfiles/                
├── screenshots/                 
├── requirements.txt                    
└── manage.py                 
```

---

## Technology Stack & Architecture

| Category | Technology |
|----------|-----------|
| **Backend** | Python, Django 5.2 |
| **Database** | PostgreSQL |
| **AI / LLM Integration** | Google Gemini API (`google-genai`) |
| **API** | Django REST Framework |
| **Authentication** | Django Native Authentication (`django.contrib.auth`) |
| **Frontend** | HTML5, CSS3, Vanilla JavaScript, Bootstrap 5, Bootstrap Icons |
| **Filtering** | Standard HTML GET Forms & Django ORM (`django-filter`) |
| **Static Files** | WhiteNoise (compressed, hashed static assets) |
| **Deployment** | Render (Gunicorn + `build.sh`) |

---

## Screenshots

<p align="center">
  <img src="screenshots/crm-admin.jpg" alt="Admin Dashboard View" width="400"/>
  <img src="screenshots/customers-list.jpg" alt="Customers List View" width="400"/>
  <img src="screenshots/leads-list.jpg" alt="Leads List View" width="400"/>
  <img src="screenshots/crm-sales.jpg" alt="Sales Dashboard View" width="400"/>
  <img src="screenshots/add-customer.jpg" alt="Add Customer View" width="400"/>
  <img src="screenshots/add-lead.jpg" alt="Add Lead View" width="400"/>
  <img src="screenshots/add-followup.jpg" alt="Add Followup View" width="400"/>
  <img src="screenshots/email_generator.jpg" alt="Email Generator View" width="400"/>
  <img src="screenshots/crm-register.jpg" alt="Register View" width="400"/>
  <img src="screenshots/crm-login.jpg" alt="Login View" width="400"/>
</p>

---

## Getting Started

### Prerequisites
- **Python** 3.10 or higher
- **PostgreSQL** installed and running
- **Git**

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/crm_project.git
   cd crm_project
   ```

2. **Create and activate a virtual environment**
   ```bash
   python -m venv venv
   # On Windows
   venv\Scripts\activate
   # On macOS/Linux
   source venv/bin/activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Set up Environment Variables**
   Create a `.env` file in the root directory (next to `manage.py`):
   ```env
   SECRET_KEY=your_django_secret_key_here
   DEBUG=True
   DATABASE_URL=postgres://your_db_user:your_db_password@localhost:5432/your_db_name
   GEMINI_API_KEY=your_optional_gemini_api_key_here
   ```

5. **Apply Database Migrations**
   ```bash
   python manage.py makemigrations
   python manage.py migrate
   ```

6. **Create a Superuser (Admin Account)**
   ```bash
   python manage.py createsuperuser
   ```

7. **Run the Development Server**
   ```bash
   python manage.py runserver
   ```
   The application will be available at `http://127.0.0.1:8000/`.

---

## API Endpoints

All API endpoints are protected using standard Django authentication (`SessionAuthentication` / `BasicAuthentication`).

### Customers API
```http
GET    /crm/api/customers/            # List all customers (supports search & ordering)
POST   /crm/api/customers/            # Create a new customer
GET    /crm/api/customers/{id}/       # Get customer details
PUT    /crm/api/customers/{id}/       # Update customer
DELETE /crm/api/customers/{id}/       # Delete customer
```

### Leads API
```http
GET    /crm/api/leads/                # List all leads (supports search & ordering)
POST   /crm/api/leads/                # Create a new lead
GET    /crm/api/leads/{id}/           # Get lead details
PUT    /crm/api/leads/{id}/           # Update lead status
DELETE /crm/api/leads/{id}/           # Delete lead
```

### AI Endpoints
```http
POST   /email-generator/api/generate/ # Generate personalized follow-up email
```

---

## User Roles & Permissions

### Admin (Superuser)
- Access to company-wide metrics and management features for all accounts
- Create, update, and delete any customer or lead
- Assign leads to specific sales executives

### Sales Executive (Regular User)
- Access to assigned leads and customer profiles
- Generate personalized follow-up emails for assigned accounts

