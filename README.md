# CRM Management System

> A modern, full-featured Customer Relationship Management (CRM) application built with Django and PostgreSQL. Manage customers, leads, and follow-ups efficiently with role-based access control and real-time dashboards.

A complete CRM solution designed to help sales teams manage customer relationships, track leads through the sales pipeline, and monitor business performance from initial contact to successful conversion.

---

## 🎯 Features

### 🔐 Authentication & Authorization
- User registration and login with secure authentication
- Role-based access control (Admin and Sales Executive)
- JWT token-based API authentication
- Modern, responsive login/register pages

### 👥 Customer Management
- Add, view, update, and delete customer records
- Detailed customer profiles with contact information
- Customer status tracking (Active/Inactive)
- Search customers by name, email, or phone
- Comprehensive customer history and linked activities

### 📊 Lead Management
- Create and manage sales leads linked to customers
- Assign leads to team members
- Track lead progress through sales pipeline
- Lead statuses: New, Contacted, Qualified, Proposal Sent, Won, Lost
- Expected value tracking for revenue forecasting
- Real-time lead status updates

### ✅ Follow-Up Management
- Schedule follow-up tasks for leads
- Add detailed notes to follow-ups
- Mark follow-ups as completed
- Track pending follow-ups for accountability

### 📈 Dashboard & Analytics
- Real-time business metrics dashboard
- Admin dashboard: system-wide overview
- User dashboard: personal performance tracking
- Metrics include:
  - Total customers and leads count
  - Won/lost lead analytics
  - Active follow-ups tracking
  - Potential revenue calculation

### 🌙 Modern UI/UX
- Responsive design for desktop and mobile
- Dark mode support for comfortable viewing
- Bootstrap 5 framework for modern styling
- Beautiful, intuitive interface
- Fast, user-friendly navigation

### 🔌 REST API
- Full RESTful API endpoints with authentication
- Customer and lead API resources
- Advanced filtering and searching
- Token-based authentication

---

## 💻 Technology Stack

| Category | Technology |
|----------|-----------|
| **Backend** | Python, Django 4.x |
| **Database** | PostgreSQL |
| **API** | Django REST Framework |
| **Authentication** | JWT (djangorestframework-simplejwt) |
| **Frontend** | HTML, CSS, Bootstrap 5 |
| **Forms** | Django Crispy Forms + Bootstrap 5 |
| **Filtering** | Django Filter |

---

## 🔌 API Endpoints

All API endpoints require JWT authentication.

### Authentication
```http
POST   /api/token/           # Obtain JWT token
POST   /api/token/refresh/   # Refresh JWT token
```

### Customers
```http
GET    /api/customers/            # List all customers (with search/filter)
POST   /api/customers/            # Create a new customer
GET    /api/customers/{id}/       # Get customer details
PUT    /api/customers/{id}/       # Update customer
DELETE /api/customers/{id}/       # Delete customer
```

### Leads
```http
GET    /api/leads/                # List all leads (with search/filter)
POST   /api/leads/                # Create a new lead
GET    /api/leads/{id}/           # Get lead details
PUT    /api/leads/{id}/           # Update lead status
DELETE /api/leads/{id}/           # Delete lead
```

---

## 🚀 Quick Start

### Prerequisites
- Python 3.10 or higher
- PostgreSQL 12+
- pip (Python package manager)

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/dhurka832/crm-management-system.git
   cd crm-management-system
   ```

2. **Create and activate virtual environment**
   ```bash
   # Windows
   python -m venv venv
   venv\Scripts\activate
   
   # Linux/macOS
   python -m venv venv
   source venv/bin/activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Configure PostgreSQL Database**
   
   Update `crm_project/settings.py`:
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

5. **Run database migrations**
   ```bash
   python manage.py makemigrations
   python manage.py migrate
   ```

6. **Create superuser (admin account)**
   ```bash
   python manage.py createsuperuser
   ```

7. **Start development server**
   ```bash
   python manage.py runserver
   ```

8. **Access the application**
   - Open browser and navigate to: `http://127.0.0.1:8000/`
   - Login with your superuser credentials

---

## 📁 Project Structure

```
crm-management-system/
├── crm_app/                          # Main Django app
│   ├── migrations/                   # Database migrations
│   ├── templates/
│   │   ├── customer/                # Customer management templates
│   │   │   ├── customer_list.html
│   │   │   ├── add_customer.html
│   │   │   ├── update_customer.html
│   │   │   ├── customer_profile.html
│   │   │   └── delete_customer.html
│   │   ├── lead/                    # Lead management templates
│   │   │   ├── lead_list.html
│   │   │   ├── add_lead.html
│   │   │   ├── update_lead.html
│   │   │   └── delete_lead.html
│   │   ├── followup/                # Follow-up templates
│   │   │   └── add_followup.html
│   │   ├── dashboard/               # Dashboard templates
│   │   │   └── dashboard.html
│   │   ├── base.html                # Base template
│   │   ├── login.html               # Login page
│   │   └── register.html            # Registration page
│   ├── models.py                    # Database models
│   ├── views.py                     # View logic and API viewsets
│   ├── forms.py                     # Django forms
│   ├── serializers.py               # DRF serializers
│   ├── urls.py                      # App URL routing
│   ├── admin.py                     # Django admin configuration
│   └── apps.py
├── crm_project/                     # Project configuration
│   ├── settings.py                  # Django settings
│   ├── urls.py                      # Main URL routing
│   ├── wsgi.py                      # WSGI configuration
│   └── asgi.py
├── manage.py                        # Django management command
├── requirements.txt                 # Python dependencies
├── README.md                        # This file
└── .gitignore
```

---

## 📊 Database Models

### Customer Model
```python
Fields:
  - name (CharField)
  - email (EmailField, unique)
  - phone (CharField)
  - company (CharField)
  - city (CharField)
  - status (CharField: Active/Inactive)
  - created_at (DateTimeField)
```

### Lead Model
```python
Fields:
  - customer (ForeignKey → Customer)
  - assigned_to (ForeignKey → User)
  - status (CharField: New, Contacted, Qualified, Proposal, Won, Lost)
  - expected_value (DecimalField)
  - created_at (DateTimeField)
```

### FollowUp Model
```python
Fields:
  - lead (ForeignKey → Lead)
  - followup_date (DateField)
  - notes (TextField)
  - completed (BooleanField)
  - created_at (DateTimeField)
```

---

## 👤 User Roles & Permissions

### Admin (Superuser)
- View all customers and leads
- Create, update, and delete any customer
- View system-wide dashboard with all metrics
- Assign leads to team members
- Manage all follow-ups

### Sales Executive (Regular User)
- View only assigned leads
- Create and manage customers
- Update status of assigned leads
- View personal dashboard
- Manage their own follow-ups

---

## 📖 Usage Guide

### Creating a Customer
1. Login to the application
2. Navigate to **Customers** → **Add Customer**
3. Fill in customer details (name, email, phone, company, city)
4. Set status (Active/Inactive)
5. Click **Save**

### Creating a Lead
1. Go to **Leads** → **Add Lead**
2. Select the customer associated with the lead
3. Assign the lead to a team member (admin only)
4. Set initial status (New)
5. Enter expected deal value
6. Click **Save**

### Tracking Lead Progress
1. Go to **Leads** → **Lead List**
2. Click on a lead to view details
3. Update status through the sales pipeline
4. Track all changes and activities

### Scheduling Follow-ups
1. Navigate to **Follow-ups** → **Add Follow-up**
2. Select the lead to follow up
3. Set follow-up date and add detailed notes
4. Click **Save**
5. Mark as completed when done

### Viewing Dashboard
1. Click on **Dashboard** from navigation
2. View personalized metrics (for sales executives)
3. Admin sees system-wide metrics
4. Track key performance indicators

---

## 📚 API Usage Examples

### Get JWT Token
```bash
curl -X POST http://localhost:8000/api/token/ \
  -H "Content-Type: application/json" \
  -d '{"username": "your_username", "password": "your_password"}'
```

### List Customers with Search
```bash
curl -X GET "http://localhost:8000/api/customers/?search=john" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### Create a New Lead
```bash
curl -X POST http://localhost:8000/api/leads/ \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "customer": 1,
    "assigned_to": 2,
    "expected_value": "50000.00",
    "status": "New"
  }'
```

---

## 🧠 What I Learned

Through this project, I gained hands-on experience with:

- **Django Framework**: Models, Views, Templates, ORM
- **Database Design**: PostgreSQL integration and normalization
- **REST APIs**: Building scalable API endpoints
- **Authentication**: Implementing JWT token authentication
- **Authorization**: Role-based access control (RBAC)
- **Frontend Development**: Bootstrap 5, HTML, CSS
- **Django Admin**: Customizing admin interface
- **Testing**: Building robust applications
- **Git Workflow**: Version control best practices

---

## 🤝 Contributing

Contributions are welcome! Here's how to contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is open source and available under the MIT License.

---

## 🙋 Support & Questions

- Create an issue on GitHub for bugs or feature requests
- Check existing issues before creating new ones
- Provide detailed information when reporting bugs

---

## 📈 Future Enhancements

- [ ] Advanced reporting and analytics
- [ ] Email notifications for follow-ups
- [ ] Integration with external CRM tools
- [ ] Mobile app
- [ ] Calendar view for follow-ups
- [ ] Activity history and audit logs
- [ ] Bulk import/export functionality
- [ ] Custom dashboard widgets
- [ ] Real-time notifications
- [ ] Advanced filtering and segmentation

---

