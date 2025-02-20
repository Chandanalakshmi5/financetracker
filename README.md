Personal Finance Tracker

A simple and responsive web application for tracking personal finances, built with Next.js, React, shadcn/ui, Recharts, and MongoDB.

Features

Stage 1: Basic Transaction Tracking

Add, Edit, and Delete transactions (amount, date, description)

View a list of all transactions

Monthly expenses bar chart

Basic form validation for input fields

Stage 2: Categories

All Stage 1 features +

Predefined categories for transactions (e.g., Food, Rent, Utilities)

Category-wise pie chart visualization

Dashboard with summary cards:

Total expenses

Category breakdown

Most recent transactions

Stage 3: Budgeting

All Stage 2 features +

Set monthly budgets for each category

Budget vs. Actual spending comparison chart

Simple spending insights to track overspending and savings

Tech Stack

Frontend: Next.js, React, shadcn/ui, Recharts

Backend: Next.js API routes

Database: MongoDB (via MongoDB Atlas)

Deployment: Vercel (for live application)

Project Structure

finance-tracker/
├── components/         # Reusable UI components
├── pages/              # Next.js pages (includes API routes)
├── models/             # MongoDB models
├── utils/              # Utility functions
└── public/             # Static assets

Future Improvements

Implement advanced analytics and insights

Add multi-currency support

Enhance UI with advanced animations

