



echo " Setting up SkillBridge Backend Environment..."
echo ""


if [ -f .env ]; then
    echo " .env file already exists!"
    read -p "Do you want to overwrite it? (y/n): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo " Setup cancelled."
        exit 1
    fi
fi

echo "🔐 Generating secure JWT secret..."
JWT_SECRET=$(node -e "console.log(require('crypto').randomBytes(32).toString('hex'))")


echo ""
echo "📊 MongoDB Atlas Setup:"
echo "   1. Go to https://www.mongodb.com/cloud/atlas"
echo "   2. Create a free cluster (if you haven't already)"
echo "   3. Get your connection string"
echo ""
read -p "Enter your MongoDB connection string (or press Enter to use local MongoDB): " MONGODB_URI

# Use default if empty
if [ -z "$MONGODB_URI" ]; then
    MONGODB_URI="mongodb://localhost:27017/skillbridge"
    echo "ℹ️  Using local MongoDB: $MONGODB_URI"
fi

# Create .env file
cat > .env << EOF
# MongoDB Connection String
MONGODB_URI=$MONGODB_URI

# JWT Secret Key (auto-generated)
JWT_SECRET=$JWT_SECRET

# Server Port
PORT=5000

# Node Environment
NODE_ENV=development
EOF

echo ""
echo "✅ Environment file created successfully!"
echo ""
echo "📝 Your configuration:"
echo "   MongoDB URI: ${MONGODB_URI:0:30}..."
echo "   JWT Secret: ${JWT_SECRET:0:20}... (auto-generated)"
echo "   Port: 5000"
echo "   Environment: development"
echo ""
echo "🚀 You can now run: npm run dev"
