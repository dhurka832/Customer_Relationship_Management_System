# CRM Management System

A simple Customer Relationship Management (CRM) application built with Django and PostgreSQL.

This project was developed to manage customers, sales leads, and follow-ups in one place. It provides a dashboard for tracking business activities and helps sales teams monitor lead progress from initial contact to successful conversion.

---

## Project Overview

This CRM system provides a centralized platform to:

- Store customer information
- Track sales leads
- Schedule follow-ups
- Monitor lead conversion status
- View business statistics through a dashboard

The project also includes REST APIs built with Django REST Framework and JWT Authentication.

---

## Features

### Authentication

- User Registration
- User Login & Logout
- Role-Based Access (Admin and Sales Executive)

### Customer Management

- Add Customer
- View Customer List
- Update Customer Information
- Delete Customer
- Search Customers
- Pagination

### Lead Management

- Create Leads
- Assign Leads to Sales Executives
- Update Lead Status
- Track Lead Progress
- Delete Leads

Lead statuses include:

- New
- Contacted
- Qualified
- Proposal Sent
- Won
- Lost

### Follow-Up Management

- Create Follow-Ups
- Track Pending Follow-Ups
- Mark Follow-Ups as Completed

### Dashboard

The dashboard provides quick insights such as:

- Total Customers
- Total Leads
- Won Leads
- Lost Leads
- Active Follow-Ups
- Potential Revenue

---

## Technology Stack

### Backend

- Python
- Django
- Django REST Framework

### Database

- PostgreSQL

### Frontend

- HTML
- CSS
- Bootstrap 5

### Authentication

- Django Authentication
- JWT Authentication

---

## API Endpoints

### Customer APIs

```http
GET     /api/customers/
POST    /api/customers/
PUT     /api/customers/<id>/
DELETE  /api/customers/<id>/
```

### Lead APIs

```http
GET     /api/leads/
POST    /api/leads/
PUT     /api/leads/<id>/
DELETE  /api/leads/<id>/
```

### JWT Authentication

```http
POST /api/token/
POST /api/token/refresh/
```

---

## Installation

### Clone the Repository

```bash
git clone https://github.com/yourusername/crm-management-system.git
```

### Navigate to Project Folder

```bash
cd crm-management-system
```

### Create Virtual Environment

```bash
python -m venv venv
```

### Activate Virtual Environment

Windows:

```bash
venv\Scripts\activate
```

Linux/macOS:

```bash
source venv/bin/activate
```

### Install Dependencies

```bash
pip install -r requirements.txt
```

---

## Configure PostgreSQL

Update the database settings inside `settings.py`.

```python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'crm_db',
        'USER': 'postgres',
        'PASSWORD': 'your_password',
        'HOST': 'localhost',
        'PORT': '5432',
    }
}
```

---

## Run Migrations

```bash
python manage.py makemigrations
python manage.py migrate
```

---

## Create Admin User

```bash
python manage.py createsuperuser
```

---

## Start Development Server

```bash
python manage.py runserver
```

Open:

```text
http://127.0.0.1:8000/
```

---

## Sample Dashboard Data

```text
Total Customers: 20
Total Leads: 20
Won Leads: 3
Lost Leads: 3
Active Follow-Ups: 14
Potential Revenue: ₹19,95,000
```

---

## What I Learned

Through this project, I gained hands-on experience with:

- Django Models and ORM
- PostgreSQL Integration
- CRUD Operations
- Authentication and Authorization
- Django REST Framework
- JWT Authentication
- Bootstrap UI Development
- Role-Based Access Control
- API Testing with Postman

---
