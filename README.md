# EcoKart - Sustainable E-commerce Platform

A MERN stack e-commerce application focused on promoting eco-friendly shopping with rewards and sustainability features.

<!-- Deployment ready - Updated for Vercel -->

## Features

- 🌱 **Eco-friendly Product Alternatives**: Compare regular products with eco-friendly options
- 🎁 **EcoPoints Rewards System**: Earn points for sustainable choices
- 🛒 **Smart Cart Management**: Add both regular and eco-friendly products
- 💳 **Secure Checkout**: JWT-based authentication and secure payment processing
- 📦 **Sustainable Delivery Options**: Eco-friendly packaging and delivery choices
- 📊 **Order History**: Track your sustainable shopping journey
- 🤖 **AI Chatbot**: Get sustainability tips and product recommendations
- 📱 **Responsive Design**: Works on all devices

## Tech Stack

- **Frontend**: React.js, CSS3
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/ecokart.git
   cd ecokart
   ```

2. **Install dependencies**
   ```bash
   # Install frontend dependencies
   npm install
   
   # Install backend dependencies
   cd server
   npm install
   ```

3. **Environment Setup**
   ```bash
   # Create .env file in server directory
   cd server
   touch .env
   ```
   
   Add the following to your `.env` file:
   ```
   MONGODB_URI=mongodb://localhost:27017/ecokart
   JWT_SECRET=your_jwt_secret_here
   PORT=5001
   ```

4. **Start the application**
   ```bash
   # Start backend server (from server directory)
   cd server
   npm start
   
   # Start frontend (from root directory)
   npm start
   ```

5. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5001

## API Endpoints

- `GET /api/products` - Get all products
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/cart` - Get user cart
- `POST /api/cart/add` - Add item to cart
- `POST /api/orders/checkout` - Place order
- `GET /api/orders/my-orders` - Get user orders

## Deployment

This project is configured for deployment on Vercel. See deployment instructions in the project documentation.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Contact

- Email: codeconquerors123@gmail.com
- Address: VIT, Vellore Campus, Tiruvalam Rd, Katpadi, Vellore, Tamil Nadu 632014, India
