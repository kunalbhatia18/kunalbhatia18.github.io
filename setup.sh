#!/bin/bash

echo "🚀 Setting up Kunal's Portfolio Website..."
echo "📦 Installing dependencies..."

# Install dependencies
npm install

echo "✅ Dependencies installed!"
echo ""
echo "🎨 Creating placeholder images..."

# Create placeholder images directory if it doesn't exist
mkdir -p public

# Create a simple placeholder image script
cat > create_placeholders.js << 'EOF'
import fs from 'fs';

const createSVGPlaceholder = (width, height, text, filename) => {
  const svg = `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#667eea;stop-opacity:1" />
        <stop offset="100%" style="stop-color:#764ba2;stop-opacity:1" />
      </linearGradient>
    </defs>
    <rect width="100%" height="100%" fill="url(#grad)"/>
    <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="white" font-family="Arial, sans-serif" font-size="16">${text}</text>
  </svg>`;
  
  fs.writeFileSync(`public/${filename}`, svg);
};

// Create placeholder images
createSVGPlaceholder(400, 400, 'Profile Photo', 'profile.jpg');
createSVGPlaceholder(300, 200, 'Running', 'run.jpg');
createSVGPlaceholder(300, 200, 'Music', 'stage.jpg');
createSVGPlaceholder(300, 200, 'Cooking', 'cook.jpg');
createSVGPlaceholder(300, 200, 'Travel', 'travel.jpg');

for (let i = 1; i <= 5; i++) {
  createSVGPlaceholder(400, 300, \`Project \${i}\`, \`proj\${i}.jpg\`);
}

for (let i = 1; i <= 4; i++) {
  createSVGPlaceholder(400, 250, \`Blog Post \${i}\`, \`blog\${i}.jpg\`);
}

console.log('✅ Placeholder images created!');
EOF

# Run the placeholder creation script
node create_placeholders.js

# Clean up
rm create_placeholders.js

echo "✅ Placeholder images created!"
echo ""
echo "🎉 Setup complete!"
echo ""
echo "To start developing:"
echo "  npm run dev"
echo ""
echo "To build for production:"
echo "  npm run build"
echo ""
echo "📝 Don't forget to:"
echo "  - Replace placeholder images with your own"
echo "  - Update personal information in the components"
echo "  - Customize the content to match your profile"
