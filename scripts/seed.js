require('dotenv').config({ quiet: true });
const mongoose = require('mongoose');
const connectDB = require('../config/db');

const UsersModel = require('../app/models/users');
const ProjectsModel = require('../app/models/projects');
const ServicesModel = require('../app/models/services');
const ReferencesModel = require('../app/models/references');

const users = [
  {
    firstname: 'Pedro',
    lastname: 'Bilhalva',
    email: 'pedro@example.com',
    password: 'password123',
    created: new Date('2026-01-10'),
    updated: new Date('2026-01-10'),
  },
];

const projects = [
  {
    name: 'Minha Feira',
    role: 'Frontend',
    completionDate: new Date('2025-11-01'),
    stack: ['React Native', 'Expo', 'NativeWind', 'TypeScript'],
    image: '/projects/minha-feira.png',
    repoUrl:
      'https://gitlab.com/senac-projetos-de-desenvolvimento/2025-debora-pedro-diego/minha-feira-frontend',
    hasEnglishDescription: false,
    description:
      'A mobile app for discovering and managing street markets (feiras), with login, favorites, reviews, an interactive map, and paginated search.',
  },
  {
    name: 'Tormenta 20 Sheet Builder',
    role: 'Frontend',
    completionDate: new Date('2024-01-01'),
    stack: ['React', 'Chakra UI', 'TypeScript', 'Vercel Postgres'],
    image: '/projects/t20-sheet.png',
    repoUrl: 'https://github.com/Bilhalv/T20-Sheet',
    hasEnglishDescription: true,
    description:
      'Interactive character sheet builder for the Brazilian TTRPG Tormenta 20 - assemble stats, skills, and inventory, then export to PDF.',
  },
];

const services = [
  {
    title: 'Web Development',
    description:
      'Responsive, accessible interfaces built with React.js and Next.js, styled with TailwindCSS and backed by well-structured, reusable components.',
    tags: ['React.js', 'Next.js', 'TailwindCSS', 'TypeScript'],
  },
  {
    title: 'Mobile Development',
    description:
      'Cross-platform mobile apps using React Native and Expo, delivering smooth, native-feeling experiences from a single codebase.',
    tags: ['React Native', 'Expo', 'JavaScript', 'TypeScript'],
  },
];

const references = [
  {
    name: 'Ana Vargas',
    testimonial:
      'Pedro consistently delivered thoughtful, well-structured projects and always went the extra mile to polish the user experience.',
    position: 'Girlfriend',
    company: 'Personal Life',
  },
  {
    name: 'Débora Carvalho',
    testimonial:
      'A great colleague, always willing to help and committed to delivering excellent quality work.',
    position: 'Student',
    company: 'Senac',
  },
];

async function upsertMany(Model, items, keyFields, label) {
  let created = 0;
  let updated = 0;

  for (const item of items) {
    const filter = {};
    for (const key of keyFields) filter[key] = item[key];

    const existing = await Model.findOne(filter);
    if (existing) {
      await Model.updateOne({ _id: existing._id }, { $set: item }, { runValidators: true });
      updated += 1;
    } else {
      await Model.create(item);
      created += 1;
    }
  }

  console.log(`${label}: ${created} created, ${updated} updated`);
}

async function seed() {
  try {
    await connectDB();

    await upsertMany(UsersModel, users, ['email'], 'Users');
    await upsertMany(ProjectsModel, projects, ['name'], 'Projects');
    await upsertMany(ServicesModel, services, ['title'], 'Services');
    await upsertMany(ReferencesModel, references, ['name', 'company'], 'References');

    console.log('Seed completed successfully.');
  } catch (error) {
    console.error('Seed failed:', error);
    process.exitCode = 1;
  } finally {
    await mongoose.connection.close();
  }
}

seed();
