# Invoice Management System

This repository contains a demo application designed to showcase a full-stack development setup using Angular and C#. The application allows users to create, update and view invoices, demonstrating modern software development practices and tooling.

Read more:
- [Local Development with AWS Lambda and NestJS: Docker Debugging and Hot Reload](https://medium.com/@venya-brodetskiy/local-development-with-aws-lambda-and-nestjs-docker-debugging-and-hot-reload-e9c75fb0c6c4)
- [AWS Lambda and NestJS: Communication between services](https://medium.com/@venya-brodetskiy/aws-lambda-and-nestjs-communication-between-services-3ea026bc463a)

## Technologies Used

- **Client-Side**: Angular 17, standalone components (without Angular modules)
- **Backend**: .NET 8, ASP.NET Web Api
- **Architecture**: Microservice architecture with Dapr for interservice communication
- **Data Access**: Entity Framework over MS SQL
- **Containerization**: Dockerized components for easy setup and deployment

## Features

### Client-Side
- **CRUD Operations**: Create, read, update invoices.
- **Real-time Updates**: Automatically updates views when invoices are modified.
- **Validation**: Ensures data integrity before submission to the backend.
- **Global State Management**:
  - **Loading Interceptor**: Handles HTTP request loading states.
  - **Toast Service**: Provides feedback on operations with toast notifications.

### Backend
- **Microservice Architecture**: Though typically overkill for a small app, used here to demonstrate the use of microservices.
- **iDesign Methodology**: Incorporates *Managers* to handle requests and *Accessors* for external resource interactions, promoting clean separation of concerns. *Engines* might be added for handling complex logic
- **Dapr for Service Communication**: Utilizes Dapr to simplify interservice communication. [What is Dapr?](https://dapr.io/)
- **Scalability and Responsiveness**: Designed for easy transition to asynchronous operations. Dapr ensures it's easy to add message queuing and real-time updates via SignalR once needed.
- **Entity Framework**: Manages database operations, backed by a SQL database with a provided initialization script.
- **Dockerization**: Each component, including services and database, is containerized to simplify development and deployment.

## Running the Application

### Prerequisites
- Docker
- .NET 8 SDK
- Angular CLI

### Steps to Run
1. **Backend Services**:
   - Navigate to the `backend` directory.
   - Run `docker-compose up` to start all services including the database.

2. **Frontend**:
   - Navigate to the `frontend` directory.
   - Run `npm install` to install dependencies.
   - Run `npm start` to start the Angular application.


## Additional Information

This application is intended as a demonstration of modern development practices and a practical implementation of microservice architecture using Dapr. It showcases how these technologies can be integrated into a cohesive system.
