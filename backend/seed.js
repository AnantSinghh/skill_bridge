/**
 * Database Seed Script
 * Populates the database with sample data for testing
 * Run with: node seed.js
 */

require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const Internship = require('./models/Internship');
const Application = require('./models/Application');

// Sample internships data - Expanded with focus on India
const sampleInternships = [
    // India-based internships (15 total)
    {
        title: 'Full Stack Developer Intern',
        company: 'Infosys Limited',
        description: 'Join Infosys to work on enterprise-level full-stack applications. Gain experience with MERN stack, microservices architecture, and agile development. Work with global teams and contribute to real client projects.',
        skills: ['React', 'Node.js', 'MongoDB', 'Express', 'TypeScript'],
        country: 'India',
        duration: '6 months',
        stipend: '₹30,000/month',
        applicationDeadline: new Date('2026-03-15')
    },
    {
        title: 'Backend Developer Intern',
        company: 'Wipro Technologies',
        description: 'Work with our backend team to develop scalable APIs and microservices. Learn about database design, API development, and cloud deployment. Great opportunity to work with Node.js, Express, and MongoDB.',
        skills: ['Node.js', 'Express', 'MongoDB', 'REST API', 'Docker'],
        country: 'India',
        duration: '6 months',
        stipend: '₹25,000/month',
        applicationDeadline: new Date('2026-03-20')
    },
    {
        title: 'Frontend Developer Intern',
        company: 'TCS Digital',
        description: 'Build modern web applications using React and Next.js. Work on responsive designs, state management, and API integration. Learn from experienced developers in a collaborative environment.',
        skills: ['React', 'Next.js', 'JavaScript', 'CSS', 'Redux'],
        country: 'India',
        duration: '5 months',
        stipend: '₹28,000/month',
        applicationDeadline: new Date('2026-02-28')
    },
    {
        title: 'Data Science Intern',
        company: 'Flipkart',
        description: 'Work on e-commerce data analytics and machine learning models. Analyze customer behavior, build recommendation systems, and create data visualizations. Hands-on experience with Python, ML libraries, and big data tools.',
        skills: ['Python', 'Machine Learning', 'Pandas', 'TensorFlow', 'SQL'],
        country: 'India',
        duration: '6 months',
        stipend: '₹35,000/month',
        applicationDeadline: new Date('2026-04-15')
    },
    {
        title: 'Mobile App Developer Intern',
        company: 'Paytm',
        description: 'Develop mobile applications for millions of users. Work with React Native and native Android/iOS development. Learn about payment integrations, security, and scalable mobile architecture.',
        skills: ['React Native', 'Android', 'iOS', 'JavaScript', 'Firebase'],
        country: 'India',
        duration: '4 months',
        stipend: '₹32,000/month',
        applicationDeadline: new Date('2026-03-30')
    },
    {
        title: 'DevOps Engineer Intern',
        company: 'Zoho Corporation',
        description: 'Learn DevOps practices including CI/CD, containerization, and cloud infrastructure. Work with Docker, Kubernetes, Jenkins, and AWS. Automate deployment pipelines and monitor production systems.',
        skills: ['Docker', 'Kubernetes', 'Jenkins', 'AWS', 'Linux'],
        country: 'India',
        duration: '5 months',
        stipend: '₹30,000/month',
        applicationDeadline: new Date('2026-03-10')
    },
    {
        title: 'AI/ML Engineer Intern',
        company: 'Fractal Analytics',
        description: 'Work on cutting-edge AI and machine learning projects. Build deep learning models, work with NLP, computer vision, and predictive analytics. Collaborate with data scientists and engineers.',
        skills: ['Python', 'TensorFlow', 'PyTorch', 'Deep Learning', 'NLP'],
        country: 'India',
        duration: '6 months',
        stipend: '₹40,000/month',
        applicationDeadline: new Date('2026-05-01')
    },
    {
        title: 'Cloud Engineer Intern',
        company: 'Tech Mahindra',
        description: 'Gain expertise in cloud technologies including AWS, Azure, and GCP. Work on cloud migration projects, serverless architecture, and infrastructure as code. Learn cloud security and cost optimization.',
        skills: ['AWS', 'Azure', 'Cloud Architecture', 'Terraform', 'Python'],
        country: 'India',
        duration: '5 months',
        stipend: '₹28,000/month',
        applicationDeadline: new Date('2026-04-10')
    },
    {
        title: 'UI/UX Design Intern',
        company: 'Swiggy',
        description: 'Design delightful user experiences for food delivery app. Work on user research, wireframing, prototyping, and usability testing. Use Figma and Adobe XD to create stunning interfaces.',
        skills: ['Figma', 'Adobe XD', 'UI Design', 'UX Research', 'Prototyping'],
        country: 'India',
        duration: '4 months',
        stipend: '₹25,000/month',
        applicationDeadline: new Date('2026-03-25')
    },
    {
        title: 'Cybersecurity Intern',
        company: 'Quick Heal Technologies',
        description: 'Learn cybersecurity fundamentals including penetration testing, vulnerability assessment, and security audits. Work with security tools and frameworks. Gain hands-on experience in ethical hacking.',
        skills: ['Network Security', 'Ethical Hacking', 'Python', 'Linux', 'Kali Linux'],
        country: 'India',
        duration: '6 months',
        stipend: '₹27,000/month',
        applicationDeadline: new Date('2026-04-30')
    },
    {
        title: 'Java Developer Intern',
        company: 'Oracle India',
        description: 'Work on enterprise Java applications using Spring Boot and Hibernate. Learn microservices architecture, RESTful APIs, and database design. Contribute to large-scale enterprise projects.',
        skills: ['Java', 'Spring Boot', 'Hibernate', 'MySQL', 'REST API'],
        country: 'India',
        duration: '6 months',
        stipend: '₹32,000/month',
        applicationDeadline: new Date('2026-04-25')
    },
    {
        title: 'Python Developer Intern',
        company: 'Freshworks',
        description: 'Develop backend services using Python and Django. Work on API development, database optimization, and cloud deployment. Learn best practices in Python development and testing.',
        skills: ['Python', 'Django', 'PostgreSQL', 'REST API', 'AWS'],
        country: 'India',
        duration: '5 months',
        stipend: '₹29,000/month',
        applicationDeadline: new Date('2026-03-18')
    },
    {
        title: 'Quality Assurance Intern',
        company: 'Mindtree',
        description: 'Learn software testing methodologies including manual and automation testing. Work with Selenium, JUnit, and test management tools. Ensure quality in software delivery.',
        skills: ['Selenium', 'Java', 'Testing', 'JUnit', 'Automation'],
        country: 'India',
        duration: '4 months',
        stipend: '₹22,000/month',
        applicationDeadline: new Date('2026-03-05')
    },
    {
        title: 'Blockchain Developer Intern',
        company: 'Polygon Technology',
        description: 'Work on blockchain and Web3 technologies. Develop smart contracts using Solidity, build dApps, and learn about DeFi protocols. Exciting opportunity in the blockchain space.',
        skills: ['Solidity', 'Ethereum', 'Web3.js', 'Smart Contracts', 'JavaScript'],
        country: 'India',
        duration: '5 months',
        stipend: '₹35,000/month',
        applicationDeadline: new Date('2026-05-15')
    },
    {
        title: 'React Native Developer Intern',
        company: 'Ola Cabs',
        description: 'Build cross-platform mobile applications for ride-sharing platform. Work with React Native, Redux, and native modules. Learn about real-time features and location-based services.',
        skills: ['React Native', 'Redux', 'JavaScript', 'Firebase', 'Maps API'],
        country: 'India',
        duration: '5 months',
        stipend: '₹30,000/month',
        applicationDeadline: new Date('2026-04-05')
    },

    // International internships (20 total)
    {
        title: 'Frontend Developer Intern',
        company: 'TechCorp Solutions',
        description: 'Join our dynamic team to build cutting-edge web applications using React.js. Work on real-world projects and collaborate with senior developers.',
        skills: ['React', 'JavaScript', 'HTML', 'CSS', 'Git'],
        country: 'USA',
        duration: '3 months',
        stipend: '$1500/month',
        applicationDeadline: new Date('2026-06-30')
    },
    {
        title: 'Full Stack Developer Intern',
        company: 'Digital Innovations Ltd',
        description: 'Work on enterprise applications with both frontend and backend technologies. Participate in code reviews and contribute to production code.',
        skills: ['React', 'Node.js', 'PostgreSQL', 'TypeScript', 'AWS'],
        country: 'UK',
        duration: '4 months',
        stipend: '£1200/month',
        applicationDeadline: new Date('2026-06-15')
    },
    {
        title: 'Mobile App Developer Intern',
        company: 'AppMasters Inc',
        description: 'Create innovative iOS and Android applications. Learn React Native and mobile UI/UX best practices.',
        skills: ['React Native', 'JavaScript', 'Mobile Development', 'Redux', 'Firebase'],
        country: 'Canada',
        duration: '3 months',
        stipend: 'CAD 2000/month',
        applicationDeadline: new Date('2026-02-15')
    },
    {
        title: 'Data Analyst Intern',
        company: 'Analytics Pro',
        description: 'Work on data analysis and visualization projects. Build dashboards and generate insights from large datasets.',
        skills: ['Python', 'SQL', 'Tableau', 'Excel', 'Statistics'],
        country: 'Germany',
        duration: '5 months',
        stipend: '€1000/month',
        applicationDeadline: new Date('2026-06-20')
    },
    {
        title: 'Cloud Solutions Intern',
        company: 'CloudTech Systems',
        description: 'Learn cloud infrastructure and DevOps practices. Work with AWS, Docker, and Kubernetes.',
        skills: ['AWS', 'Docker', 'Kubernetes', 'Jenkins', 'Linux'],
        country: 'Singapore',
        duration: '4 months',
        stipend: 'SGD 2500/month',
        applicationDeadline: new Date('2026-01-31')
    },
    {
        title: 'Product Design Intern',
        company: 'Creative Designs Studio',
        description: 'Design beautiful user interfaces and experiences. Work with Figma and conduct user research.',
        skills: ['Figma', 'Adobe XD', 'UI Design', 'UX Research', 'Prototyping'],
        country: 'Australia',
        duration: '3 months',
        stipend: 'AUD 1800/month',
        applicationDeadline: new Date('2026-07-15')
    },
    {
        title: 'Security Analyst Intern',
        company: 'SecureNet Solutions',
        description: 'Work on cybersecurity projects including penetration testing and security audits.',
        skills: ['Network Security', 'Ethical Hacking', 'Python', 'Linux', 'Security Tools'],
        country: 'USA',
        duration: '6 months',
        stipend: '$1800/month',
        applicationDeadline: new Date('2026-05-20')
    },
    {
        title: 'Game Developer Intern',
        company: 'GameStudio Pro',
        description: 'Create exciting games using Unity or Unreal Engine. Work on game mechanics and physics.',
        skills: ['Unity', 'C#', 'Game Design', '3D Modeling', 'Physics'],
        country: 'Japan',
        duration: '4 months',
        stipend: '¥150,000/month',
        applicationDeadline: new Date('2026-07-30')
    },
    {
        title: 'Web3 Developer Intern',
        company: 'CryptoTech Innovations',
        description: 'Build decentralized applications and smart contracts. Work with Ethereum and Solidity.',
        skills: ['Solidity', 'Ethereum', 'Web3.js', 'Smart Contracts', 'JavaScript'],
        country: 'Switzerland',
        duration: '5 months',
        stipend: 'CHF 2000/month',
        applicationDeadline: new Date('2026-04-12')
    },
    {
        title: 'iOS Developer Intern',
        company: 'Apple Developer Academy',
        description: 'Learn iOS app development using Swift and SwiftUI. Build apps for iPhone and iPad.',
        skills: ['Swift', 'SwiftUI', 'iOS', 'Xcode', 'UIKit'],
        country: 'USA',
        duration: '4 months',
        stipend: '$2000/month',
        applicationDeadline: new Date('2026-02-10')
    },
    {
        title: 'Android Developer Intern',
        company: 'Google Developer Program',
        description: 'Develop Android applications using Kotlin and Jetpack Compose. Learn Material Design.',
        skills: ['Kotlin', 'Android', 'Jetpack Compose', 'Firebase', 'Material Design'],
        country: 'USA',
        duration: '5 months',
        stipend: '$2200/month',
        applicationDeadline: new Date('2026-03-22')
    },
    {
        title: 'Machine Learning Intern',
        company: 'AI Research Lab',
        description: 'Work on ML research projects. Build and train neural networks for various applications.',
        skills: ['Python', 'TensorFlow', 'PyTorch', 'Deep Learning', 'Research'],
        country: 'UK',
        duration: '6 months',
        stipend: '£1400/month',
        applicationDeadline: new Date('2026-05-30')
    },
    {
        title: 'Database Administrator Intern',
        company: 'DataSystems Corp',
        description: 'Learn database management, optimization, and administration. Work with SQL and NoSQL databases.',
        skills: ['SQL', 'MongoDB', 'Database Design', 'Performance Tuning', 'Backup'],
        country: 'Canada',
        duration: '4 months',
        stipend: 'CAD 1800/month',
        applicationDeadline: new Date('2026-04-18')
    },
    {
        title: 'Network Engineer Intern',
        company: 'NetSolutions Inc',
        description: 'Work on network infrastructure and security. Learn routing, switching, and network protocols.',
        skills: ['Networking', 'Cisco', 'Security', 'TCP/IP', 'Firewalls'],
        country: 'Germany',
        duration: '5 months',
        stipend: '€1100/month',
        applicationDeadline: new Date('2026-05-10')
    },
    {
        title: 'Content Writer Intern',
        company: 'Tech Media Group',
        description: 'Write technical blogs, documentation, and marketing content. Learn SEO and content strategy.',
        skills: ['Writing', 'SEO', 'Content Strategy', 'Research', 'Editing'],
        country: 'UK',
        duration: '3 months',
        stipend: '£900/month',
        applicationDeadline: new Date('2026-02-20')
    },
    {
        title: 'Digital Marketing Intern',
        company: 'Marketing Pros',
        description: 'Learn digital marketing including social media, email campaigns, and analytics.',
        skills: ['Social Media', 'Google Analytics', 'SEO', 'Email Marketing', 'Content'],
        country: 'Australia',
        duration: '4 months',
        stipend: 'AUD 1500/month',
        applicationDeadline: new Date('2026-03-12')
    },
    {
        title: 'Business Analyst Intern',
        company: 'Consulting Firm',
        description: 'Analyze business processes and requirements. Create documentation and presentations.',
        skills: ['Analysis', 'Excel', 'SQL', 'Documentation', 'Communication'],
        country: 'Singapore',
        duration: '5 months',
        stipend: 'SGD 2200/month',
        applicationDeadline: new Date('2026-06-05')
    },
    {
        title: 'Graphic Designer Intern',
        company: 'Design Studio',
        description: 'Create visual designs for web and print. Work with Adobe Creative Suite.',
        skills: ['Photoshop', 'Illustrator', 'InDesign', 'Graphic Design', 'Branding'],
        country: 'USA',
        duration: '3 months',
        stipend: '$1400/month',
        applicationDeadline: new Date('2026-01-25')
    },
    {
        title: 'Video Editor Intern',
        company: 'Media Production House',
        description: 'Edit videos for social media and marketing. Learn motion graphics and color grading.',
        skills: ['Premiere Pro', 'After Effects', 'Video Editing', 'Motion Graphics', 'Color Grading'],
        country: 'Canada',
        duration: '4 months',
        stipend: 'CAD 1600/month',
        applicationDeadline: new Date('2026-04-20')
    },
    {
        title: 'Sales Development Intern',
        company: 'SaaS Startup',
        description: 'Learn B2B sales and lead generation. Work with CRM tools and sales strategies.',
        skills: ['Sales', 'CRM', 'Communication', 'Lead Generation', 'Negotiation'],
        country: 'UK',
        duration: '3 months',
        stipend: '£1000/month',
        applicationDeadline: new Date('2026-08-15')
    }
];

// Connect to MongoDB and seed data
const seedDatabase = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('✅ Connected to MongoDB');

        // Clear existing data
        console.log('🗑️  Clearing existing data...');
        await User.deleteMany({});
        await Internship.deleteMany({});
        await Application.deleteMany({});
        console.log('✅ Existing data cleared');

        // Create admin user
        console.log('👤 Creating admin user...');
        const admin = await User.create({
            name: 'Admin User',
            email: 'admin@skillbridge.com',
            password: 'admin123',
            role: 'admin'
        });
        console.log('✅ Admin user created');
        console.log('   Email: admin@skillbridge.com');
        console.log('   Password: admin123');

        // Create student user
        console.log('👤 Creating student user...');
        const student = await User.create({
            name: 'John Doe',
            email: 'student@skillbridge.com',
            password: 'student123',
            role: 'student'
        });
        console.log('✅ Student user created');
        console.log('   Email: student@skillbridge.com');
        console.log('   Password: student123');

        // Create internships
        console.log('💼 Creating sample internships...');
        const internships = await Internship.create(
            sampleInternships.map(internship => ({
                ...internship,
                createdBy: admin._id
            }))
        );
        console.log(`✅ Created ${internships.length} internships`);

        // Create a sample application
        console.log('📝 Creating sample application...');
        await Application.create({
            internship: internships[0]._id,
            student: student._id,
            studentName: student.name,
            studentEmail: student.email,
            coverLetter: 'I am very interested in this Frontend Developer position. I have been learning React for the past 6 months and have built several projects. I am eager to apply my skills in a real-world environment and learn from experienced developers.',
            resume: 'https://example.com/resume.pdf',
            status: 'pending'
        });
        console.log('✅ Sample application created');

        console.log('\n🎉 Database seeded successfully!');
        console.log('\n📊 Summary:');
        console.log(`   - Users: 2 (1 admin, 1 student)`);
        console.log(`   - Internships: ${internships.length} (15 in India, 20 international)`);
        console.log(`   - Applications: 1`);
        console.log('\n🔐 Login Credentials:');
        console.log('   Admin: admin@skillbridge.com / admin123');
        console.log('   Student: student@skillbridge.com / student123');
        console.log('\n🚀 You can now login and browse internships!');
        console.log('   💡 Filter by country "India" to see 15 India-based internships');

        // Disconnect
        await mongoose.disconnect();
        console.log('\n✅ Disconnected from MongoDB');
        process.exit(0);

    } catch (error) {
        console.error('❌ Error seeding database:', error);
        process.exit(1);
    }
};

// Run the seed function
seedDatabase();
