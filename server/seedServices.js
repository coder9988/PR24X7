import mongoose from 'mongoose'
import Service from './models/Service.js'
import dotenv from 'dotenv'

dotenv.config()

const seedServices = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/pr-agency')
    console.log('Connected to MongoDB')

    // Clear existing services
    await Service.deleteMany({})
    console.log('Cleared existing services')

    const services = [
      {
        title: 'Media Relations',
        slug: 'media-relations',
        description: 'Build and maintain strong relationships with journalists and media outlets to maximize your brand visibility and credibility.',
        icon: '📰',
        features: [
          'Press release distribution',
          'Media kit creation',
          'Journalist outreach',
          'Press conference organization',
          'Media monitoring and analysis'
        ],
        order: 1,
        isActive: true
      },
      {
        title: 'Crisis Management',
        slug: 'crisis-management',
        description: 'Protect your reputation during challenging times with strategic crisis communication and rapid response protocols.',
        icon: '🛡️',
        features: [
          'Crisis communication strategy',
          'Rapid response team',
          'Reputation repair',
          'Stakeholder communication',
          'Post-crisis analysis'
        ],
        order: 2,
        isActive: true
      },
      {
        title: 'Digital PR',
        slug: 'digital-pr',
        description: 'Amplify your online presence through strategic digital campaigns, influencer partnerships, and content marketing.',
        icon: '💻',
        features: [
          'Social media strategy',
          'Influencer partnerships',
          'Content marketing',
          'Online reputation management',
          'SEO and content optimization'
        ],
        order: 3,
        isActive: true
      },
      {
        title: 'Brand Strategy',
        slug: 'brand-strategy',
        description: 'Develop a compelling brand narrative and positioning that resonates with your target audience and stakeholders.',
        icon: '🎯',
        features: [
          'Brand positioning',
          'Messaging framework',
          'Visual identity development',
          'Brand voice guidelines',
          'Competitive analysis'
        ],
        order: 4,
        isActive: true
      },
      {
        title: 'Event Management',
        slug: 'event-management',
        description: 'Create memorable experiences that generate buzz and media coverage through strategic event planning and execution.',
        icon: '🎉',
        features: [
          'Event planning and coordination',
          'Media coverage strategy',
          'Guest management',
          'Press event organization',
          'Virtual and hybrid events'
        ],
        order: 5,
        isActive: true
      },
      {
        title: 'Content Creation',
        slug: 'content-creation',
        description: 'Craft compelling stories and content that engage your audience and drive meaningful conversations around your brand.',
        icon: '✍️',
        features: [
          'Copywriting and editing',
          'Video production',
          'Photography services',
          'Blog and article writing',
          'Annual report creation'
        ],
        order: 6,
        isActive: true
      }
    ]

    await Service.insertMany(services)
    console.log('Services seeded successfully!')
    
    // Verify the seeded services
    const count = await Service.countDocuments()
    console.log(`Total services in database: ${count}`)

    await mongoose.connection.close()
    console.log('Database connection closed')
  } catch (error) {
    console.error('Error seeding services:', error)
    process.exit(1)
  }
}

seedServices()
